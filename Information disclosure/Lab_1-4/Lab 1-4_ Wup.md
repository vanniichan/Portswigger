# Information disclosure in error messages
## Target Goal
This lab's verbose error messages reveal that it is using a vulnerable version of a third-party framework. To solve the lab, obtain and submit the version number of this framework.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ bắt nó nhè ra lỗi. Ở đây ta thứ có thể nhìn thấy đầu tiên đó là query để lấy ra id của `productId`

![image](https://github.com/user-attachments/assets/697fa00e-936a-4570-8d69-89a42dd44d19)

Thêm dấu `'` và nó trả luôn về lỗi bao gồm cả ver của framework này. Hoàn thành bài lab

![image](https://github.com/user-attachments/assets/ad27ca7d-305f-4260-a0f6-71b583803362)

## Flag
![image](https://github.com/user-attachments/assets/4b08c766-5c9e-4acb-9dcc-9ef1bd8ddd82)

# Information disclosure on debug page
## Target Goal
This lab contains a debug page that discloses sensitive information about the application. To solve the lab, obtain and submit the `SECRET_KEY` environment variable.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tận dụng tính năng debug đang tồn tại trên con web này để làm lộ `SECRET_KEY`. Sau khi gửi request, ta check `Site-map` thấy có 1 đường dẫn đến phpinfo. Đây là tệp có thể chứa `SECRET_KEY`

![image](https://github.com/user-attachments/assets/7d7011aa-9a56-4aee-8f23-fa56d41c5eff)

Truy cập vào `cgi-bin/phpinfo.php` và `Ctrl + F` ta sẽ thấy được `SECRET_KEY`. Hoàn thành bài lab

![Ảnh chụp màn hình 2024-09-05 014400](https://github.com/user-attachments/assets/e22b4cef-c5fb-4971-8c38-4b4600a560fa)

## Flag
![image](https://github.com/user-attachments/assets/651e47b4-c1e2-4ed6-be24-89e637653df4)

# Source code disclosure via backup files
## Target Goal
This lab leaks its source code via backup files in a hidden directory. To solve the lab, identify and submit the database password, which is hard-coded in the leaked source code.
## Analysis
Vì mục tiêu bài lab là tìm backup file ở thư mục ẩn nên ta sẽ truy cập đuờng dẫn `robots.txt` để dò trước

![image](https://github.com/user-attachments/assets/c55d2a28-388f-4d09-b43e-f3b8fd405a57)

Truy cập vào `/backup`. Ta thấy được 1 file code

![image](https://github.com/user-attachments/assets/83a7a24c-f426-4a4d-9798-f8574082c47a)

File này đã để lộ cả database password, từ đó hoàn thành bài lab

![image](https://github.com/user-attachments/assets/cd36089f-c29a-452e-ab03-22ffc5ec8343)
## Flag
![image](https://github.com/user-attachments/assets/3adadc70-d0f9-4715-ba80-c780102e9222)

# Authentication bypass via information disclosure
## Target Goal
This lab's administration interface has an authentication bypass vulnerability, but it is impractical to exploit without knowledge of a custom HTTP header used by the front-end.

To solve the lab, obtain the header name then use it to bypass the lab's authentication. Access the admin interface and delete the user `carlos`.

You can log in to your own account using the following credentials: `wiener:peter`
## Analysis
Thông qua bruteforce bằng `dirbuster` , mình biết được có tồn tại đường dẫn tới `/admin` nhưng có vẻ đã bị chặn với user bình thường:

![image](https://github.com/user-attachments/assets/a7f2c737-91e4-44cf-bb3c-78e28709c637)

Có vẻ như `TRACE` sẽ cho ta biết các Header mà trang web sử dụng cho xác thực. Ở đây xuất hiện Header đáng ngờ là `X-Custom-IP-Authorization: 27.72.58.160` . Theo như tên gọi thì Header này có lẽ dùng để xác thực dựa trên IP.

Khi truy cập vào `/admin` và bị block, để ý response trả về là "Only available to local users",  Vậy nếu ta đổi `X-Custom-IP-Authorization: 127.0.0.1` thì sao nhỉ. 

Do 127.0.0.1 là địa chỉ IP localhost của chính server, có lẽ lúc này mình sẽ đươc coi là local user.

![image](https://github.com/user-attachments/assets/39ba6ada-587c-41a9-b27e-07cbb27c1cc5)

Thành công ! Xóa delete carlos để hoàn thành bài lab.

![image](https://github.com/user-attachments/assets/0a78e634-b5a2-4299-8efe-3fa4d4cad4ab)

## Flag
![image](https://github.com/user-attachments/assets/e3fcb70a-b661-450a-9ee9-1838687ea6ca)


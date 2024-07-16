# Target Goal: 

This lab controls access to certain admin functionality based on the Referer header. You can familiarize yourself with the admin panel by logging in using the credentials `administrator:admin`.

To solve the lab, log in using the credentials `wiener:peter` and exploit the flawed access controls to promote yourself to become an administrator.

# Analysis : 

Đăng nhập vào `admin`, bắt request upgrade user `carlos`:

![image](https://github.com/user-attachments/assets/9bd51724-993e-4713-ab16-8eef2dc996d1)

Tiếp theo thử đi tới URL /admin-roles?username=carlos&action=upgrade , bằng tài khoản `wiener`:

Referer header trong 1 request sẽ cho biết địa chỉ đã gửi đi request.

Trong request của admin trước đó, có Referer là `/admin` (admin panel mà chỉ admin truy cập được), khi gửi request bằng `wiener` thì referer sẽ là `/my-account`  ->  Referer phải chứa `/admin`.

Sửa lại request của wiener trước đó, thêm Referer tới `/admin` và username=wiener

![image](https://github.com/user-attachments/assets/06dbc5ce-6f17-421a-897d-7bb602c3ab84)

Hoàn thành bài lab

`Thực ra bài lab này có thể hoàn thành bằng cách như lab 11 12 bằng cách thay đổi session của nó mà không cần dùng đến Referer, tuy nhiên đây là bài lab liên quan đến lý thuyết được học nên dùng thôi : )`
# Flag:

![image](https://github.com/user-attachments/assets/c1930918-ff16-4a88-a34b-12bb6d4d4687)

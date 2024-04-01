# Target

This lab's two-factor authentication is vulnerable due to its flawed logic. To solve the lab, access Carlos's account page.

# Recon

Sau khi login vào, ta thấy cookie và session được tạo ra. Tuy nhiên cookie này được xác thực bằng cách dùng chính tài khoản của user

![image](https://github.com/vanniichan/Portswigger/assets/112863484/76540bba-d1a7-482d-9db1-0472be08db18)

Từ trên thử đổi cookie = `carlos`, send request và chắc hơn là xóa cả session thấy được nó không ảnh hưởng đến phiên đăng nhập trước đó và quan trọng nhất là nó vẫn chấp nhận tức là có thể đăng nhập vào user `carlos` mà không cần mật khẩu 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c05e6157-9605-4e7b-a05d-03bc40a97199)

Vậy làm cách nào để không cần vào email của nó để lấy FA code? 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b446c311-197c-4521-bc15-858abf1df6b6)

Quay trở lại, để user wiener có được FA code thì cần gửi gói POST đến server và ta cũng sẽ làm tương tự với `carlos`. Trước đó việc bypass trang login thì user `carlos` đã nhận được FA code qua mail. 

Giờ chỉ cần brute-force để lấy FA code thông qua status 302 ( 302: điều hướng sang trang account) tức là bypass thành công

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f8126a8d-3246-4448-a143-6f9ba455744d)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/038a285a-6510-4b2f-bdcb-3dfc474f18a5)

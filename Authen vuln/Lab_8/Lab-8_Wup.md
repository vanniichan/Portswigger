# Target

This lab's two-factor authentication is vulnerable due to its flawed logic. To solve the lab, access Carlos's account page.

# Recon

Sau khi login vào, ta thấy cookie và session được tạo ra. Tuy nhiên cookie này được xác thực bằng cách dùng chính tài khoản của user

![image](https://github.com/vanniichan/Portswigger/assets/112863484/05e48fb4-a88d-48c9-b05f-55494190219f)

Từ trên thử đổi cookie = `carlos`, send request và chắc hơn là xóa cả session thấy được nó không ảnh hưởng đến phiên đăng nhập trước đó và quan trọng nhất là nó vẫn chấp nhận tức là có thể đăng nhập vào user `carlos` mà không cần mật khẩu 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b6e429f4-7ed7-4e30-838b-4d6d81c4dbf8)

Vậy làm cách nào để không cần vào email của nó để lấy FA code? 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/52e17b11-08ba-45ee-a603-ed4fe4028ccc)

Quay trở lại, để user wiener có được FA code thì cần gửi gói POST đến server và ta cũng sẽ làm tương tự với `carlos`. Trước đó việc bypass trang login thì user `carlos` đã nhận được FA code qua mail. 

Giờ chỉ cần brute-force để lấy FA code thông qua status 302 ( 302: điều hướng sang trang account) tức là bypass thành công

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a2c34266-0dbd-4ac3-a8c2-4c0f1b8769ac)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/83223155-038a-4a1c-9151-82bb51c1b999)

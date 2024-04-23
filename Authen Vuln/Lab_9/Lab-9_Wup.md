# Target

This lab allows users to stay logged in even after they close their browser session. The cookie used to provide this functionality is vulnerable to brute-forcing.
To solve the lab, brute-force Carlos's cookie to gain access to his "My account" page.

# Recon

Sau khi bắt gói tin này, ta có server để lộ cookie lưu đăng nhập

![image](https://github.com/vanniichan/Portswigger/assets/112863484/32fefdc0-e5eb-43eb-979f-57d43f801735)

Đem ra decode thì có base64 và mã md5

![image](https://github.com/vanniichan/Portswigger/assets/112863484/da48589c-4774-4676-a7d6-a9771174fc99)
![image](https://github.com/vanniichan/Portswigger/assets/112863484/ac7f355e-f0d8-453f-80bf-90f89783a194)

Từ đây nghĩ đến brute-force cookie này, tuy nhiên thử lại xem liệu server nhận cookie đặc biệt này và cho login hay không. Và nó nhận :)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/352d341e-0195-4e80-89a1-44222a0570a3)

Giờ thì brute-force bằng [payload](https://github.com/vanniichan/Portswigger/blob/main/Authen%20Vuln/Lab_9/Lab-9_Payload.py) chuyển password sang md5

![image](https://github.com/vanniichan/Portswigger/assets/112863484/7380d03b-4b96-4e0b-af47-cb67e9aea75f)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4d036551-929c-487c-9d4c-843a7a0e0689)

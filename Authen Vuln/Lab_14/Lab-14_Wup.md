# Target

This lab's two-factor authentication is vulnerable to brute-forcing. You have already obtained a valid username and password, but do not have access to the user's 2FA verification code. To solve the lab, brute-force the 2FA code and access Carlos's account page.

# Recon

Bài lab này dựa theo kịch bản bị lộ user và pass tuy nhiên phải cần 2FA mới có thể vào acc, và điều hay ở đây là sau khi nhập sai 2 lần nó sẽ tự động logout. Thêm nữa, việc lặp đi lặp lại này không bị block acc. Do đó càng có thể dễ dàng để brute-force hơn

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9d6ede13-e2d8-4c45-aac8-e62ee03ad8f3)

Như đã nói ở trên, ta có thể lặp đi lặp lại các thao tác để có thể lấy được 2FA. 1 vài setting

![image](https://github.com/vanniichan/Portswigger/assets/112863484/579a7008-2c70-41a7-87ba-674fdc702eb3)

Ta sẽ băt 3 gói tin theo thứ tự:
  1. Gói `GET` đầu nhận thông tin vào trang login
  2. Gói `POST` điền thông tin user vào
  3. Gói `GET` cuối để vào trang nhập 2FA

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e8a4c9fd-0903-4942-aa7c-e4ac8b16ea51)

Cuối cùng là set cho nó chạy từng request 1:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/7182b198-8ebf-4f65-bb2a-eb357abdff2b)

Tiếp theo là ngồi đợi =)), khá lâu


# Flag:


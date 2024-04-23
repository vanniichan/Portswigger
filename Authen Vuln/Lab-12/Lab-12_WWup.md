# Target

This lab's password change functionality makes it vulnerable to brute-force attacks. To solve the lab, use the list of candidate passwords to brute-force Carlos's account and access his "My account" page.
# Recon

Sau khi login vào sẽ ra 1 trang cho phép ta đổi mật khẩu

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ac8f3bcf-d809-4957-bce1-17a45cf52c59)

Thử làm sai mật khẩu hiện tại (Current password) và bị lock acc luôn : )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/34f62dd6-39ff-472d-893a-584ebe1c6f61)

Bây giờ cho Current password đúng và New password sai thì có thông báo 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d52b97df-8c0e-4bf5-8d0b-295f31c7fb9d)

Từ gói tin bắt được ta có thể bypass dựa vào 2 thứ để brute-force:
1 là đổi user cần đổi
2 là thông báo khi nhập pass đúng 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5fb97f33-feb9-4d2c-9496-9c1590b1bc0d)

`carlos:superman`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/31a5648d-387f-485b-bb9f-b29b3ab65d27)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/6a9a3461-ca34-434e-a6f2-b111725246e3)

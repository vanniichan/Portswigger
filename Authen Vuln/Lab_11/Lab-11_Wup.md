# Target

This lab is vulnerable to password reset poisoning. The user carlos will carelessly click on any links in emails that he receives. To solve the lab, log in to Carlos's account. You can log in to your own account using the following credentials: wiener:peter. Any emails sent to this account can be read via the email client on the exploit server.

# Recon

Bài lab này dựa vào `forgot-password` để khai thác

![image](https://github.com/vanniichan/Portswigger/assets/112863484/bb8d3f16-f53f-4c86-90dd-b06e82172b03)

Ở đây có 1 token phía back-end gửi về để xác định ai là người yêu cầu. Do đó chúng ta cần nghĩ cách làm sao để lấy được token này

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5ee562d3-59b0-4d13-b192-a91b1050e460)

Thử sử dụng `X-Forwared-Host` (là 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ec0e4f09-49fd-42d7-af65-549168f36e7b)

Thay username = carlos

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9c3f02f2-b1a0-4c97-a1b0-601f6b7f9697)

Quay về exploit server để bắt được gói tin như bên dưới và lấy được 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f61696ce-69a1-4469-8595-3b607e167157)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e29eef9c-25ac-4313-9c12-7f24bd61f72c)

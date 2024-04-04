# Target

To solve the lab, enumerate a valid username, brute-force this user's password, then access their account page.

# Recon

Random user, password để bắt được gói tin 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e4617df0-ef63-4215-b6e5-3e042e2e8b7e)

Brtue-force user để kiểm tra xem liệu có respone nào khác với còn lại không vì có thể đó là một lỗi để phát hiện được user đúng nhưng password sai 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c05e6157-9605-4e7b-a05d-03bc40a97199)

Trong `Burp` có một chức năng grep các element của trang. Dựa vào đây ta sẽ sử dụng nó để ktra xem có error nào khác không

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ff2ca8e9-0fb4-4bee-b9a4-15a28cc479e6)

Ở đấy có một error khác với respond còn lại (1 dấu chấm :)) )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/491c9bd1-82f0-47ab-896a-0babf791dd4d)

Ok, đó là điều tốt, từ đấy brute-force mật khẩu

![image](https://github.com/vanniichan/Portswigger/assets/112863484/569cf1d8-e808-4d1a-ae58-0f642f95e688)

Done `guest:thomas`

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/638eb894-a096-4e25-aa61-93d4b86a73f6)

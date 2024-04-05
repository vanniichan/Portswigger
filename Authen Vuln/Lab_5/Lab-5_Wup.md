# Target

This lab is vulnerable to username enumeration using its response times. To solve the lab, enumerate a valid username, brute-force this user's password, then access their account page.

# Recon

**Bài này nó cho credentials nhằm mục đích check time-respond của server**

Tuy nhiên 1 vấn đề nữa cần xử lí nữa đó chính là giới hạn nhập password khi nhập sai nhiều lần, từ hint ta có header [X-Forwarded-For](https://book.hacktricks.xyz/pentesting-web/abusing-hop-by-hop-headers#bypassing-security-controls-with-x-forwarded-for) để bypass 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a95f565d-beab-4a1e-b91f-eec53bf4d923)

Bài lab này dính 2 lỗi đó chính là time-respond và tương tự như bài lab trước đó việc trả về khi đúng username. Có thể thấy time-respond càng ngày càng tăng khi độ dài password tăng do server xử lí đúng username và sau đó nó sẽ xử lí xem pass đúng không. Nếu từ ban đầu username sai, nó sẽ respond luôn là sai và không cần tốn nhiều thời gian để xử lí password nữa

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a00bab7f-2fd9-4e58-8a3a-6208edad7bd0) ![image](https://github.com/vanniichan/Portswigger/assets/112863484/8bfcdb24-0d06-4b0c-82e6-f63e74e46e64)

Dựa vào trên ta sẽ đi brute-force xem việc trả về này có đúng hay không bằng phương thức `Pitchfork` 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/fcffc565-e543-4837-a5d9-00687bedf841)

Vậy là username sẽ là `agent` tiếp tục brute-fore để láy được status 302 tức là đúng password

![image](https://github.com/vanniichan/Portswigger/assets/112863484/6b87ccc4-5fea-4e11-b697-316cc2034aab)

Phải sửa thêm `X-Forwarded-For` :)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2f13e786-0f95-4b66-8560-1d23d377eefe)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4aed541c-737b-4433-8fe0-56f674c59df2)

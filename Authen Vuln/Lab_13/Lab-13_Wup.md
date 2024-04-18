# Target

This lab is vulnerable due to a logic flaw in its brute-force protection. To solve the lab, brute-force Carlos's password, then access his account page.

# Recon

Bài này login vào có 1 số điểm cần lưu ý:
- Cách truyền tham số username và password là dạng json
- Login không dựa vào username nữa, sau 3 lần là lock acc
- Thử `X-Forwarded-For` cũng sau 3 lần bị lock : )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/440ddbb5-53bc-47f9-8628-8ebd15c7878d)

Từ lưu ý trên, sẽ ra sao nếu ta nhồi 100 mật khẩu vào ?. Sử dụng [payload](https://github.com/vanniichan/Portswigger/blob/main/Authen%20Vuln/Lab_13/Lab-13_Payload.py) để ốp vào

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e1ed49fe-edb2-45cb-9780-578fafadec8b)

Nhận được respond:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8e902de2-8d19-441b-98ee-f94b4bc8be06)

Mặc dù không biết được password nhưng con web bị lỗi logic khiến cho ta vẫn có thể login vào mà k cần pass

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2b99c3be-0948-4fa0-a283-eef84e163c37)

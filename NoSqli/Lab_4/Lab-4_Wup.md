# Lab 4
- Target Goal:
+ The user lookup functionality for this lab is powered by a MongoDB NoSQL database. It is vulnerable to NoSQL injection.
+ To solve the lab, log in as `carlos`

-Thực hiện

<b>Bài này sẽ vận dụng vào Respond của nó</b>

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cb438572-a9b2-4720-a470-73e1cfac2118)

Mail reset này sẽ lấy ở đâu?

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e9fa70c4-9c56-4c63-92fd-dda27c51135a)

Khi gửi `"$ne":"invalid"` thì Respond báo rằng `Account locked` tức là mật khẩu lúc này không sử dụng được nữa. Từ đấy ta xác định được khi gửi 1 payload vào mà có respond `Account locked` là request thành công

![image](https://github.com/vanniichan/Portswigger/assets/112863484/dc2a4ddd-e8b2-48a8-8ea8-78a811315527)

Bây giờ sử dụng `$where` để kiểm tra xem có trường nào bị ẩn không `"$where":"Object.keys(this)[1].match('^.{§§}`§§.*')"`

```
[1] : để liệt kê ra những trường có trong array ví dụ Array = ["username", "password", "", ...] ở đây dùng 1 để kiểm tra thử xem trường vị trí thứ 1 có phải là username hay không

^.{§§}§§.* : để brute-force ra thứ tự và kí tự của trường có trong array đó

```

![image](https://github.com/vanniichan/Portswigger/assets/112863484/780491aa-d3ed-4734-9ece-a6b0c7968433)

Thử thành công trường `username`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d9fb870d-f340-4387-a64d-efc969951746)

Tiếp tục với trường thứ 3: `resetPwdToken`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f055465a-c99a-4f01-b598-6553c7069a4a)

Bây giờ chỉ cần tìm token nữa là xong

![image](https://github.com/vanniichan/Portswigger/assets/112863484/58bb99ee-550f-4192-a63b-6c10c4b4eef4)

Brute-force tương tự thay vì tìm trường ẩn thì tìm token với parameter là `resetPwdToken`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9e0e9722-e94d-4390-8b79-9c370ff63085)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/463f5fad-ae2e-4ff7-baa6-f01f94049951)



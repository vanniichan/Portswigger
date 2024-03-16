# Lab 1 

Đơn giản chỉ là fuzzing để lấy vuln 

# Lab 2
- Target Goal:
  + Log into the application as the administrator user
  + Credential: wiener:peter

Để login được vào page thì gói tin sẽ có Respond như này:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/933a150b-92be-4725-bab8-406d84f23680)

Việc cần làm bây giờ là test xem có thể inject toán tử Mongo không nếu được sau đó dùng regex để tí đoán được username admin: `"wiener" --> {"$ne":""} --> {"$regex":"wien.*"}`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/eecacfae-9903-4096-a150-c49a06cd979a)

Sau đó kiểm tra xem có tài khoản nào khác nữa không?: `"peter" --> {"$ne":""}`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c5419a98-b941-490f-a6d3-7cc5dea2d90e)

Vậy là thành công! bây giờ đổi user để lấy được chính xác username của admin: `{"$regex":"wien.*"} --> {"$regex":"admin.*"}`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ba3d9ace-453c-48e0-b0a5-0a0e68d6e8bf)

Request browser là xong 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/adcbe130-f822-4c12-ba27-2cbd36f3661e)

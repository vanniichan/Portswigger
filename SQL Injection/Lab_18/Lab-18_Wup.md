# Target Goal: 

This lab contains a SQL injection vulnerability in its stock check feature. The results from the query are returned in the application's response, so you can use a UNION attack to retrieve data from other tables.
The database contains a users table, which contains the usernames and passwords of registered users. To solve the lab, perform a SQL injection attack to retrieve the admin user's credentials, then log in to their account.

# Recon:

Bài có cho Sqli nằm ở phần check stock và table là user chỉ cần lấy được password và user là pass

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5711d018-15b7-4fea-9745-343fcfd01c93)

Nó có 1 xml để check stock. Thử inject vào, nó báo lỗi ngay, điều nay cũng chứng tỏ được việc ta đã inject vào đúng chỗ

![image](https://github.com/vanniichan/Portswigger/assets/112863484/72eebe3c-6b1f-40b3-899a-bcbee5a94d1d)

Một trong những lý do bị lỗi này là do xml đã filter các ký tự rồi render html. Do đó ta cần bypass nó bằng 1 số cách như encode để nó vẫn có thể hiểu được nội dung. Điển hình nhất là `hex_entities`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/85bce58f-2909-4afc-9e2b-2ff2410624f6)

Thành công 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4519ad33-374c-4c33-a4ce-50cbfd634198)

Tiếp theo là cần truy xuất ra 2 bảng để lấy username + password. Tuy nhiên response lại trả về `0 unit` tức là chỉ lấy ra được 1 cột nên phải lấy được cả 2 nội dung từ 1 cột

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0ef0ecec-fe68-44a6-b56e-2858d8c38293)

`UNION SELECT username || ':' || password from users`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/39efa368-9c59-41a7-a820-d44b8d6d933b)

`administrator:jc50e6f28beah398nmz3`

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b3159bc4-3db1-466d-9487-e1e726ab40b7)


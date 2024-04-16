![image](https://github.com/vanniichan/Portswigger/assets/112863484/b567c068-f0cd-4604-a5b2-dce12d5874a5)

# 1. Define:
- SQL hay Structured Query Language là ngôn ngữ được dùng để giao tiếp với database
- Mấu chốt của lỗi SQL Injection: Sự nhầm lẫn của chương trình giữa untrusted data và SQL query. Điều này cũng giải thích cho việc SQL Injection là một loại lỗi bảo mật phổ biến và xác xuất được tìm thấy rất cao

![image](https://github.com/vanniichan/Portswigger/assets/112863484/11e33a14-f8ab-4d8d-bf1f-0c356682aa80)

# 2. Impact:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f7b99e58-3e75-4f02-b6ad-c66ced984fbf)

# 3. Types of SQLi:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/bc3bb96f-2b26-4343-a07e-5f8108287d29)

# 4. How to find vuln:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3fdb6541-c191-4908-be74-f703dfa05225)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d372b360-1d2e-49c8-8069-d62db61aac02)

# 5. How to exploit:

References:

[Portswigger](https://portswigger.net/web-security/sql-injection#what-is-sql-injection-sqli)

[Payload hữu ích](https://book.hacktricks.xyz/pentesting-web/sql-injection)

[THM](https://tryhackme.com/r/room/sqlmap)

# 6. How to prevent

- Có thể ngăn hầu hết các trường hợp chèn SQL bằng cách sử dụng các truy vấn được tham số hóa thay vì nối chuỗi trong truy vấn
- Ngăn không cho dữ liệu đầu vào của người dùng can thiệp vào cấu trúc truy vấn
- Sử dụng whitelist để chỉ cho phép các query cần thiết

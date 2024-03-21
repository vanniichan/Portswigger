# Target Goal: 

The SQL query is executed asynchronously and has no effect on the application's response. However, you can trigger out-of-band interactions with an external domain.

The database contains a different table called users, with columns called username and password. You need to exploit the blind SQL injection vulnerability to find out the password of the administrator user.

To solve the lab, log in as the administrator user.

# Recon:

Bài lab tương tự Lab 13 tuy nhiên lab 14 này chúng ta có thể dựa vào để khai thác được bảng table **users** 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/adb33783-e58c-4367-9a37-30fcad0e74e4)

Password `ifnvsk2j5kw3vcgvcx8a`. BURP-COLLABORATOR-SUBDOMAIN `132nrnuma5r6beouohx5428rdija7z.oastify.com`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/882b3681-468d-4728-b8ae-744548c042d9)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/07069fb2-fa94-4aea-bd41-74d0555db572)

# Reference:

https://portswigger.net/web-security/sql-injection/cheat-sheet

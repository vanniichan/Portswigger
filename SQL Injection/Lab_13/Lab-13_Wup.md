# Target Goal: 

This lab contains a blind SQL injection vulnerability. The application uses a tracking cookie for analytics, and performs a SQL query containing the value of the submitted cookie.

The SQL query is executed asynchronously and has no effect on the application's response. However, you can trigger out-of-band interactions with an external domain.

To solve the lab, exploit the SQL injection vulnerability to cause a DNS lookup to Burp Collaborator.

# Recon:

SQLi gây ra 1 DNS lookup tới Burp Collaborator

Bài này có hint là sử dụng cheatsheet nên thử luôn :)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9fc5aaab-6224-4d86-8532-4de89e8f1154)

Thử lần đầu là Oracle nên được luôn, lưu ý phần bôi xanh

![image](https://github.com/vanniichan/Portswigger/assets/112863484/55afc758-f0b1-4428-b499-429ac85ff035)

Sử dụng `Burp Collaborator` để thế vào



# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/291627d1-1457-47c2-84a7-72a7af4c1ff4)

# Reference:

https://portswigger.net/web-security/sql-injection/cheat-sheet

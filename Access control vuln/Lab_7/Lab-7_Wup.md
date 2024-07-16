# Target Goal: 

This lab contains an access control vulnerability where sensitive information is leaked in the body of a redirect response.

To solve the lab, obtain the API key for the user `carlos` and submit it as the solution.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Bài lab này tuy thay param bằng `carlos` thì bị redirect về trang login nhưng khi dùng `Burp` nó vẫn bị lộ API 

![image](https://github.com/user-attachments/assets/eb8c5eef-9c11-4198-bea5-c341574c9066)

![image](https://github.com/user-attachments/assets/20de1c18-3bf5-4143-aa51-4b89ab97dd37)

# Flag:

![image](https://github.com/user-attachments/assets/0827bb44-ceb6-47c2-92c9-d857846bf903)


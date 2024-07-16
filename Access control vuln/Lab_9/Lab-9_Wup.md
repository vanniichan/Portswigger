# Target Goal: 

This lab stores user chat logs directly on the server's file system, and retrieves them using static URLs.

Solve the lab by finding the password for the user `carlos`, and logging into their account.

# Analysis : 

Từ target của bài lab, ta có thể xác định nó dính IDOR và xảy ra ở các file log được ghi lại trên URLs

![image](https://github.com/user-attachments/assets/dd79d501-0309-47f6-8eea-df7e42d40dd0)

![image](https://github.com/user-attachments/assets/e2fa0fb7-869e-49ec-b06b-f820c86b93f3)

Có 1 điều khá lạ là cuộc chat đầu tiên khi ta download về là `2.txt` chứ không phải là `0.txt` hay `1.txt`. Do đó ta sẽ thử 2 file này xem có bị ẩn gì không

![image](https://github.com/user-attachments/assets/7191e27e-feed-4ef7-a3c7-cd5494932823)

![image](https://github.com/user-attachments/assets/5814f0b1-31b3-4033-a69d-4b679bb2a531)

Login và hoàn thành bài lab

# Flag:

![image](https://github.com/user-attachments/assets/59559e72-4d43-443e-9d22-f6f74ed329c5)




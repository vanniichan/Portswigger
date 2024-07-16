# Target Goal: 

This lab has a horizontal privilege escalation vulnerability on the user account page, but identifies users with GUIDs.

To solve the lab, find the GUID for `carlos`, then submit his API key as the solution.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Theo yêu cầu bài lab sau khi login chúng ta sẽ cố tìm xem có chức năng nào leak GUID của `carlos` không

![image](https://github.com/user-attachments/assets/091788bb-7ef5-4aca-8f39-a15f0392bc61)

Sau khi tìm ra các bài post có người đăng là `carlos` ta sẽ tìm cách xem có chỗ nào để lộ `GUID` không

![image](https://github.com/user-attachments/assets/cd637380-84ca-4a49-9aca-b3f6d9816657)

Thay đổi param và lấy được API key

![image](https://github.com/user-attachments/assets/c5495e5d-6ad6-4b79-8a11-097eda112569)

# Flag:

![image](https://github.com/user-attachments/assets/30be6184-62a8-4563-aa35-22993d74d9df)

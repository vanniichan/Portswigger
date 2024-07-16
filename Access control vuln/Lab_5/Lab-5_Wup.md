# Target Goal: 

This lab has a horizontal privilege escalation vulnerability on the user account page.

To solve the lab, obtain the API key for the user `carlos` and submit it as the solution.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Sau khi login với account `wiener` ta sẽ thấy url `id=wiener`

![image](https://github.com/user-attachments/assets/c3465d20-f59f-4db3-9ae0-3812b1341b73)

Thử thay đổi param thành `carlos` và ta nhận được API key của người dùng này

![image](https://github.com/user-attachments/assets/3f3f8031-e346-4fc3-9b9a-658e8c2e894a)

# Flag:

![image](https://github.com/user-attachments/assets/e86834da-2390-4a80-bd5f-a488bdb2e9e9)


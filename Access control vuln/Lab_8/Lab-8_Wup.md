# Target Goal: 

This lab has user account page that contains the current user's existing password, prefilled in a masked input.

To solve the lab, retrieve the administrator's password, then use it to delete the user `carlos`.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Khi login ta thấy ở trang này có chức năng thay đổi mật khẩu mới, và khi nhìn vào password ẩn kia cũng có thể đoán được đó chính là mật khẩu hiện tại của acc

![image](https://github.com/user-attachments/assets/68039f55-d0f3-4ebe-9db4-16236f571c1d)

Ctrl + U và đúng như dự đoán mật khẩu còn bị leak trong 

![image](https://github.com/user-attachments/assets/b30a0585-d3a3-4386-952f-dc4d7d5ba9d8)

Tương tự ta sẽ được credential của `administrator` và hoàn thành bài lab

![image](https://github.com/user-attachments/assets/07ddda33-1276-4c54-aa6c-2511c65b403a)

# Flag:

![image](https://github.com/user-attachments/assets/f5a158aa-ff08-4974-b53f-4963c49e54cd)



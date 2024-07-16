# Target Goal: 

This lab has an admin panel with a flawed multi-step process for changing a user's role. You can familiarize yourself with the admin panel by logging in using the credentials `administrator:admin`.

To solve the lab, log in using the credentials `wiener:peter` and exploit the flawed access controls to promote yourself to become an administrator.

# Analysis : 

Tương tự với bài lab 11 chúng ta đăng nhập vào tài khoản `admin` , `admin panel` và bắt request upgrade role user `carlos`:

![image](https://github.com/user-attachments/assets/18d8e38f-7ecb-46e0-8d98-45deed555bf5)

Logout và đăng nhập vào tài khoản wiener (normal).

Lấy session cookie của wiener thay vào session trong `/admin-roles`, đổi username muốn upgrade thành `wiener`:

![image](https://github.com/user-attachments/assets/c0886119-ca31-48ab-a7c7-45e512d9494e)

# Flag:

![image](https://github.com/user-attachments/assets/dd4e83b5-4dd3-46c0-af18-7f7d0ef6ed60)

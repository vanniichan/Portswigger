# Target Goal: 

This lab implements access controls based partly on the HTTP method of requests. You can familiarize yourself with the admin panel by logging in using the credentials `administrator:admin`.

To solve the lab, log in using the credentials `wiener:peter` and exploit the flawed access controls to promote yourself to become an administrator.

# Analysis : 

Sau khi login vào tài khoản admin ta thấy có 1 tính năng nâng cấp người 

![image](https://github.com/user-attachments/assets/8596baa9-e5fd-4eb4-a8aa-273ae9b83a30)

Ta chuyển về người dùng bình thường và thấy rằng người thường không có chức nâng cấp lên 

![image](https://github.com/user-attachments/assets/2a69a7f6-07ef-4f8c-8564-c1ff475d4bc2)

Do đó ta thử xem có cách nào tự nâng cấp bản thân lên không -> bằng cách đổi phiên của bản thân( người dùng thường) vào trang đổi quyền của admin

![image](https://github.com/user-attachments/assets/87c2c0f6-18ff-42f4-aac3-825c0d7d57cc)

Tuy nhiên nó báo lỗi không có đủ quyền nên ta sẽ đổi method gửi đi và phát hiện được rằng bảo vệ access control chỉ được thực hiện ở method `POST`. Thay thế bằng `GET` và hoàn thành bài 

![image](https://github.com/user-attachments/assets/0c329702-b4ea-48d2-b1c1-7f58bcf8dd4d)

# Flag:

![image](https://github.com/user-attachments/assets/66aae064-9cd5-4b88-8170-de8d992a0720)

# Define
- Đơn giản hiểu là trang mà victim truy cập không được dẫn sang origin khác không cho phép và victim tương tác vào sẽ excute như mã js và sẽ bị exploit
 - Nằm trong mục ***Mis config*** trong OSWAP TOP 10 
 
![image](https://github.com/vanniichan/Portswigger/assets/112863484/28e3fa32-f732-40e6-9f74-f1b6ca77ae8f)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/65cb1b1d-8c4c-485e-b6fb-369bd7ed9574)


# Sự khác nhau CORS và CSRF
- CORS không cung cấp khả năng bảo vệ chống lại các cuộc tấn công giả mạo yêu cầu chéo trang (CSRF), đây là một quan niệm sai lầm phổ biến.

- CORS là sự nới lỏng có kiểm soát của chính sách cùng nguồn gốc, vì vậy CORS được cấu hình kém thực sự có thể làm tăng khả năng xảy ra các cuộc tấn công CSRF hoặc làm trầm trọng thêm tác động của chúng.

- Có nhiều cách khác nhau để thực hiện các cuộc tấn công CSRF mà không cần sử dụng CORS, bao gồm các biểu mẫu HTML đơn giản và tài nguyên tên miền chéo.

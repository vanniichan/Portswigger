# Target Goal
This lab discloses sensitive information via its version control history. To solve the lab, obtain the password for the `administrator` user then log in and delete the user `carlos`.
# Analysis
Sử dụng `dirbuster` ta sẽ thấy file `/.git`. File này có thể có lịch sử hoặc src code để lộ credential của admin

![image](https://github.com/user-attachments/assets/b45aa68b-0f7c-46fb-bf2c-a0c129793151)

Ta sẽ download toàn bộ folder này về để phân tích. Sử dụng `Git cola` để phân tích kĩ hơn
```
wget -r https://0ab90094038a51af8152fd1b009f00d2.web-security-academy.net/.git/ 
```

 ![image](https://github.com/user-attachments/assets/1ea8a517-d125-4f73-b575-09f63c91767f)

Ngay lúc mở ra đã có 1 file đáng ngờ tên `admin.conf`. Trong đó có chứa giá trị “ADMIN_PASSWORD”. Có lẽ password của admin từng được hardcoded cho việc testing và đã dược đổi lại khi trang web đi vào hoạt động

Nhưng file này được dùng để lưu lịch sử các phiên bản , nên chúng ta hoàn toàn có thể xem sự thay đổi của các repo này.

![image](https://github.com/user-attachments/assets/b1ea49f6-31d5-4209-b6df-5a50fdd59a23)

Click chuột phải vào file `admin.conf` -> `view history`. Quả thực admin password từng được lưu ở đây. Đăng nhập vào tài khoản administrator và hoàn thành bài lab.

![image](https://github.com/user-attachments/assets/efb71ef8-3b9a-47a6-8f8a-975d5ca6d092)
# Flag
![image](https://github.com/user-attachments/assets/e09977f4-9e68-4da5-b280-25d92704417d)



# Target Goal: 

This lab has an admin panel at `/admin`. It's only accessible to logged-in users with a `roleid` of 2.

Solve the lab by accessing the admin panel and using it to delete the user carlos.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Theo đề bài lab ta sẽ tìm nơi có thể thay đổi `roleid` để chuyển thành 2 thì có thể truy cập với quyền. 

Sau khi thao tác với các tính năng có ở web, ở mục `Change email` ta thấy được thứ cần tìm

![image](https://github.com/user-attachments/assets/a53ca069-6ad1-43be-9d49-04cf1589e132)

Bằng cách thêm `roleid` vào Request, ta sẽ thử xem khi gửi gói tin có thể thay đổi được `roleid` không

![image](https://github.com/user-attachments/assets/6ab588cf-bc7b-48b1-9f6d-21e3d65abc95)

Redirect và nó đã xuất hiện `Admin-Panel`

Xóa user và hoàn thành bài lab

# Flag:

![image](https://github.com/user-attachments/assets/554dfb89-9e61-4a2b-9968-86ae6e34d4bc)


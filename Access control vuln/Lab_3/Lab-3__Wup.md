# Target Goal: 

This lab has an admin panel at /admin, which identifies administrators using a forgeable cookie.

Solve the lab by accessing the admin panel and using it to delete the user `carlos`.

You can log in to your own account using the following credentials: `wiener:peter`

# Analysis : 

Sau khi login Ctrl + U vào mục session ta thấy có 1 field `Admin` với value là `false`

![image](https://github.com/user-attachments/assets/318ecc8d-f506-4849-8be4-112c0fb20a31)

Thử thay đổi value = `true` và ta có thể truy cập vào `Admin-Panel` sau  xóa user là xong

![image](https://github.com/user-attachments/assets/88646dbf-59bd-4cfd-9236-fd4d4dc16910)

# Flag:

![image](https://github.com/user-attachments/assets/653c0835-6043-495a-8915-cef6131d96b3)

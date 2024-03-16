# Lab 3
- Target Goal:
  + Log into the application as the administrator user by find the password
  + Credential: wiener:peter
- Thực hiện
Login vào page, bắt được gọi tin tìm user trong db

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8a88a0a0-f788-478b-9b94-eb2431760a83)

Đầu tiên vẫn phải check xem có inject được không

![image](https://github.com/vanniichan/Portswigger/assets/112863484/238dcb35-a6ca-40bb-9643-21d7168daec8)

Tiếp theo kiểm tra bằng `' && this.password[0] == 'p' || 'a'=='b` vì mình đã biết được pass của user này rồi, nếu trả về như lúc được lookup nghĩa là inject thành công

![image](https://github.com/vanniichan/Portswigger/assets/112863484/79f15a34-82eb-409b-94db-8aa85c31e53f)

Tìm theo brute-force user admin

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b5b4923a-0823-4aa7-86dc-d1d045d1e243)

Vậy password là `wguzchyr` 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0f59ec94-ef0f-44ac-88d5-8e0fc3a935f2)

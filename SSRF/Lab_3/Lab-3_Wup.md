# Target Goal: 

This lab has a stock check feature which fetches data from an internal system.

To solve the lab, change the stock check URL to access the admin interface at `http://192.168.0.12:8080/admin` and delete the user `carlos`.

The stock checker has been restricted to only access the local application, so you will need to find an open redirect affecting the application first.

# Analysis : 

Như mô tả, trang web có 1 tính năng check stock. Và nó hoạt động bằng cách sử dụng 1 api gọi về để lấy kết quả mà ta truy vấn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d927feaf-4601-4262-be41-9ef77d32513b)

Từ đây, ta có thể tận dụng SSRF gọi ngược về `localhost` để gọi vào trang admin. Tuy nhiên lần này sử dụng mọi cách thì nó luôn trả về 400 :

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9ac4001a-fd65-4142-91c0-28a2c3e17c08)

Tuy nhiên còn 1 tính năng nữa đó là `Next product` cũng redirect đường dẫn về nên ta sẽ kiểm tra bằng cách `https://www.google.com` xem có điều gì xảy ra không. 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/eb9b4844-cbd9-4a48-935a-f9f0ddd024fe)

Từ trên ta có thể khai thác từ phía `path` của `nextProduct`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/309fb23a-a418-4cae-a6cf-ed947a712819)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3c595331-97e1-4399-a395-8d01f201aa1c)

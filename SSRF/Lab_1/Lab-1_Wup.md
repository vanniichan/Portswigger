# Target Goal: 

This lab has a stock check feature which fetches data from an internal system.

To solve the lab, change the stock check URL to access the admin interface at `http://localhost/admin` and delete the user `carlos`.

# Recon: 

Như mô tả, trang web có 1 tính năng check stock. Và nó hoạt động bằng cách sử dụng 1 api gọi về để lấy kết quả mà ta truy vấn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d46f5b37-872e-4889-9d83-11a56326fd98)

Từ đây, ta có thể tận dụng SSRF gọi ngược về `localhost` để gọi vào trang admin:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/7c46d639-b12a-45b9-b8d7-46c640cc755e)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d8ac883e-45a2-4f68-a431-2dde92afa723)


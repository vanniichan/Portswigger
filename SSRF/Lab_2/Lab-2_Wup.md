# Target Goal: 

This lab has a stock check feature which fetches data from an internal system.

To solve the lab, use the stock check functionality to scan the internal `192.168.0.X` range for an admin interface on port 8080, then use it to delete the user `carlos`.

# Recon: 

Như mô tả, trang web có 1 tính năng check stock. Và nó hoạt động bằng cách sử dụng 1 api gọi về để lấy kết quả mà ta truy vấn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f685afb9-7ac1-4737-b7ed-8da199d077c4)

Từ đây, ta có thể tận dụng SSRF gọi ngược về `localhost` để gọi vào trang admin. Tuy nhiên lần này ta phải truy cập vào ip nội bộ của ứng dụng thay vì vào bằng `localhost`:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/45b092c0-69ef-493c-a07e-985428301796)

Vì đây là mạng nội bộ nên x sẽ nằm trong khoảng 0 -> 255:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3461bb93-deaa-4c29-aadc-36ecb56e5108)

Vậy đường dẫn đúng là `http://192.168.0.162:8080/admin`. Truy cập và xóa tài khoản 

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3d7bf380-d600-4ea7-bba7-011d8b0dc085)

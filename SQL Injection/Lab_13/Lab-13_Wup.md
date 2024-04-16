# Target Goal: 

The database contains a different table called users, with columns called username and password. To solve the lab, find a way to leak the password for the administrator user, then log in to their account.

# Recon:

Bắt gói tin và thử Sqli vào mục có token độc lạ nhất, chính là `TrackingId` và được lỗi trả về luôn :)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/26ee4a58-ccc1-4959-a79b-0d8f1ce79f7a)

`CAST()` là hàm trong SQL cho phép chuyển đổi 1 loại dữ liệu sang int, lý do dùng hàm này là vì dữ liệu ta thường cố inject vào thường là string và ta đang lợi dụng việc db trả ra lỗi để leak được gì đó

`TpoIoOJJhiRNzP91' AND CAST((SELECT 1) AS int)-- `

Lỗi trả về phải kiểu boolean

![image](https://github.com/vanniichan/Portswigger/assets/112863484/387ac705-6b89-4c4c-8385-b6e0e2e4456b)

Từ đây thử xem liệu nó có leak được usernamme và password không, thông thưởng lỗi trả về nó chỉ nên được hiển thị được 1 dòng nên sử dụng `LIMT 1`

`TpoIoOJJhiRNzP91' AND 1=CAST((SELECT username FROM users LIMIT 1) AS int)-- `

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3c707b79-0c30-4f5d-800e-11dd13615b00)

Lỗi này xảy ra khi nó bị vượt quá ký tự, do đó xóa phần `TpoIoOJJhiRNzP91` thử xem

![image](https://github.com/vanniichan/Portswigger/assets/112863484/46174184-089b-4388-85e2-ea9c8f34c998)

Quên chưa sửa lỗi boolean trên :))

![image](https://github.com/vanniichan/Portswigger/assets/112863484/87135dd5-6753-4b4d-b536-77b8cd6ea726)

Từ đây tương tự với việc leak password

`administrator:2rrkl9hvf3wmo4v5fgmu`

# Flag: 
![image](https://github.com/vanniichan/Portswigger/assets/112863484/2ff96e7f-63d1-4951-a939-93ba3c784433)

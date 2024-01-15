# Target Goal: 
- Use your exploit server to host an HTML page that uses a CSRF attack to change the viewer's email address.

# Recon: 
- Vì target liên quan đến change email nên sau khi login ta có endpoint /change-email --> send Repeater
- Dựa vào 3 điều kiện có thể xảy ra CSRF ta có thỏa mãn cả 3:
   + Có function liên quan 
   + Có session dựa vào cookie
   + Có parameter csrf ở Request 

- Đầu tiên ta sẽ thử xóa CSRF token xem nó có chấp nhận không --> Không được

- Nhận thấy csrf token và csrf cookie giống nhau ta thử check xem nếu đổi thành parameter khác thì có được không  --> Được
    
![image](https://github.com/vanniichan/Portswigger/assets/112863484/0826312c-6c4f-4658-a428-5109f2c871cf)

- Tạo URL để fake csrf token 

- Từ đây lấy payload có sẵn của Burp, tạo thẻ ``<img`` để tự động vào trang thay change mail

# Flag: 



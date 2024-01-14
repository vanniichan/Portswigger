# Target Goal: 
- Use your exploit server to host an HTML page that uses a CSRF attack to change the viewer's email address.

# Recon: 
- Vì target liên quan đến change email nên sau khi login ta có endpoint /change-email --> send Repeater
- Dựa vào 3 điều kiện có thể xảy ra CSRF ta có thỏa mãn cả 3:
   + Có function liên quan 
   + Có session dựa vào cookie
   + Có parameter csrf ở Request 

- Đầu tiên ta sẽ thử xóa CSRF token xem nó có chấp nhận không --> Không được

- Đổi method cũng không được
    
- Bây giờ dùng tài khoản khác thực hiện bằng cách lấy CSRF token của tài khảon này gắn vào token của tài khoản kia --> Được

- Từ đây lấy payload có sẵn của Burp, sửa mail, sử dụng token của tài khoản thứ 2 khi chưa đôi mail và gửi vào server exploit để hoàn thành bài lab 
    

# Flag: 

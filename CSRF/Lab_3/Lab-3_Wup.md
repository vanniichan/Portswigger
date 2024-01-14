# Target Goal: 
- Use your exploit server to host an HTML page that uses a CSRF attack to change the viewer's email address.

# Recon: 
- Vì target liên quan đến change email nên sau khi login ta có endpoint /change-email --> send Repeater
- Dựa vào 3 điều kiện có thể xảy ra CSRF ta có thỏa mãn cả 3:
   + Có function liên quan 
   + Có session dựa vào cookie
   + Có parameter csrf ở Request 

- Đầu tiên ta sẽ thử xóa CSRF token xem nó có chấp nhận không

![image](https://github.com/vanniichan/Portswigger/assets/112863484/aacf2001-f061-4f87-9e68-eaaffb8fa9c9)
    
- Send Request và Respond về 302 tức là CSRF token là không bắt buộc

- Từ đây lấy payload có sẵn của Burp, sửa mail và gửi vào server exploit để hoàn thành bài lab 
    
![image](https://github.com/vanniichan/Portswigger/assets/112863484/a500fd6f-ed64-4181-8685-84c8375d460f)


# Flag: 

# Target Goal: 
- Use your exploit server to host an HTML page that uses a CSRF attack to change the viewer's email address.

# Recon: 
- Vì target liên quan đến change email nên sau khi login ta có endpoint /change-email --> send Repeater
- Dựa vào 3 điều kiện có thể xảy ra CSRF ta có thỏa mãn cả 3:
   + Có function liên quan 
   + Có session dựa vào cookie
   + Không có parameter trước request

- Đầu tiên ta sẽ thử với case method `GET`

![image](https://hackmd.io/_uploads/B1hwmzWF6.png)

    
- Send Request và Respond về 302 tức là đã thành công vì nó không ảnh hưởng đến parameter mình sửa

- Từ đây lấy payload có sẵn của Burp, sửa mail và gửi vào server exploit để hoàn thành bài lab 
    
![image](https://hackmd.io/_uploads/SyxPrMWYa.png)


# Flag: 


# Target Goal: 
- Use your exploit server to host an HTML page that uses a CSRF attack to change the viewer's email address.

# Recon: 
- Vì target liên quan đến change email nên sau khi login ta có endpoint /change-email --> send Repeater
- Dựa vào 3 điều kiện có thể xảy ra CSRF ta có thỏa mãn cả 3:
   + Có function liên quan 
   + Có session dựa vào cookie
   + Có parameter csrf ở Request

- Đầu tiên ta sẽ thử với case method `GET`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/367b2ec6-c25b-4531-b791-3f6008252d72)
    
- Send Request và Respond về 302 tức là đã thành công vì nó không ảnh hưởng đến parameter mình sửa

- Từ đây lấy payload có sẵn của Burp, sửa mail và gửi vào server exploit để hoàn thành bài lab 
    
![image](https://github.com/vanniichan/Portswigger/assets/112863484/a500fd6f-ed64-4181-8685-84c8375d460f)



# Flag: 


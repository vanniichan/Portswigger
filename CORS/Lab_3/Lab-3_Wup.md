
# Target Goal: 
- The lab is solved when you successfully submit the administrator's API key

# Recon: 
- Sau khi login ta có endpoint /accountDetails --> send Repeater --> send Request 
- Ta thấy Response có ```Access-Control-Allow-Credentials``` tức là ta có thể nghĩ tới CORS    
- Từ đó thử thêm ```Origin: http://jasndjk.com``` (random site)    

- Respond không trả về gì cả, tiếp tục thử ```Origin: nulll``` và vẫn không trả về gì cả

- Tiếp tục thử sub-domain xem nó có ra gì không, cái này thử cả 2 trường hợp vào đuôi hoặc phần đầu: 
  + case1: ```https://0adb0006030167a6812339aa00f8007c.web-security-academy.net.random.net```
  + case2: ```https://random.0adb0006030167a6812339aa00f8007c.web-security-academy.net```

- case 2 thì được, tức là nó cho phép quyền truy cập tất cả các sub-domain, do đó ta kiểm tra xem site có sử dụng được sub-domain nào không

- Check có 1 sub-domain đó là ```stock``` có, bây giờ còn 1 cách để nó hiển thị khi victim access vào đó là sử dụng lỗi XSS 
 ```<script>alert(1)</script>```
 ![image](https://hackmd.io/_uploads/BJBbkMyFT.png)

 - Chạy được, từ đó ốp payload lợi dụng lỗ hổng này


# Flag: 
Check log lấy được key API '
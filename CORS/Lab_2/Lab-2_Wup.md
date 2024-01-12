
# Target Goal: 
- The lab is solved when you successfully submit the administrator's API key

# Recon: 
- Sau khi login ta có endpoint /accountDetails --> send Repeater --> send Request 
- Ta thấy Response có ```Access-Control-Allow-Credentials``` tức là ta có thể nghĩ tới CORS    
- Từ đó thử thêm ```Origin: http://jasndjk.com``` (random site)    

- Respond không trả về gì cả, tiếp tục thử ```Origin: nulll``` và resopnd đã trả về ```null``` 

* Từ đây biết được nó  thuộc định dạng ```null```
    
- Sử dụng payload vào Exploit-sever

# Note
Payload chúng ta sẽ sử dụng  a sandboxed ```iframe``` bởi vì nó gửi ra 1 request mang giá trị null

# Flag: 
Check log lấy được key API '
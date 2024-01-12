
# Target Goal: 
- The lab is solved when you successfully submit the administrator's API key

# Recon: 
- Sau khi login ta có endpoint /accountDetails --> send Repeater --> send Request 
- Ta thấy Response có Access-Control-Allow-Credentials tức là ta có thể nghĩ tới CORS
    
- Từ đó thử thêm Origin: http://jasndjk.com (random site)
    
- Respond trả về  Access-Control-Allow-Origin: http://jasndjk.com :
    + Tức là nó thông qua tất cả các site mà mình nhập vào
    
- Sử dụng payload vào Exploit-sever

# Flag: 
Check log lấy được key API '

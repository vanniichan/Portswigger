# Target Goal: 

This lab uses a serialization-based session mechanism and is vulnerable to privilege escalation as a result. To solve the lab, edit the serialized object in the session cookie to exploit this vulnerability and gain administrative privileges. Then, delete the user `carlos`.

Credentials: `wiener:peter`

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/70a6e871-d2d9-483e-9c70-300c7f3072fe)

Thử đem đi dcode sang b64 và nhận được như sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/bb8ddce3-761b-4ede-8e48-1459edd13eda)

Như phân tích trên việc có `b` đại diện cho boolean true false của quyền admin, từ đây thử `b:1` để xem ta có leo quyền được không:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/66fce44d-65d9-42fb-ab57-75fec8f2ff8a)

Thay value mà ta ecode được vào web ta được: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2f49d7d0-2054-45ef-af41-725a368a43ec)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ef9af697-91de-4e37-9739-b54b266448ab)

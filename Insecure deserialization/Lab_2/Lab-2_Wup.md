# Target Goal: 

This lab uses a serialization-based session mechanism and is vulnerable to authentication bypass as a result. To solve the lab, edit the serialized object in the session cookie to access the administrator account. Then, delete the user `carlos`.

Credentials: `wiener:peter`

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/70a6e871-d2d9-483e-9c70-300c7f3072fe)

Thử đem đi dcode sang b64 và nhận được như sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/327ef1b4-1a1d-4093-a10d-2f076cf867d5)

Một trong những kỹ thuật tấn công đó là `Modifying data types` ở đây tức là khi compare 1 chuỗi với một số nguyên, code sẽ luôn cố gắng chuyển chuỗi đó về số nguyên để compare.

Việc chèn payload là `0` bởi vì khi thêm vào tất cả các chuỗi sẽ coi nó là số nguyên 0 để compare. **Tuy nhiên việc này chỉ có thể áp dụng khi password lưu trữ không bắt đầu bằng số** nguyên nhân tự hiểu : )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/238b89a7-9e51-4ecb-8b38-b49483e003b0)

Thay value mà ta ecode được vào web ta được: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/1dc5537b-6f22-4ca7-9867-e83d5763c885)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/723ea92c-a12d-4704-ac67-4cdda0eadfb2)

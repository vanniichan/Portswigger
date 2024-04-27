# Target Goal: 

This lab contains a reflected cross-site scripting vulnerability in the search query tracking functionality where angle brackets are encoded. The reflection occurs inside a JavaScript string. To solve this lab, perform a cross-site scripting attack that breaks out of the JavaScript string and calls the alert function.

# Recon: 

Như cái tên tiêu đề, nó đã bị encode `< >` 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9a633ea0-4dac-4252-b4b1-20aecb0e98fe)

Giờ phải tìm cách chạy `<` mà không dùng `<` :))))

![image](https://github.com/vanniichan/Portswigger/assets/112863484/dabfcb59-e3f1-4c82-a696-f131ac923861)

Có ngay trick lỏ của 1 [blog](https://freedium.cfd/https://bayefran.medium.com/xss-reflected-xss-into-a-javascript-string-with-angle-brackets-html-encoded-379d0e8a75e6)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/567ec2e2-6a63-48d7-a5b0-d6e6671b772d)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/192e2688-ce19-493c-ae47-9e300d1963c5)

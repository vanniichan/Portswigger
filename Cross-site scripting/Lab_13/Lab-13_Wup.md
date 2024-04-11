# Target Goal: 

This lab demonstrates a stored DOM vulnerability in the blog comment functionality. To solve this lab, exploit this vulnerability to call the alert() function.

# Recon: 

Chèn thử payload và thấy phần đuôi đóng tag h1 đã mất

![image](https://github.com/vanniichan/Portswigger/assets/112863484/82f54dd8-502f-4815-9aa0-3390d217a896)

Lý do là vì 1 hàm đã encode `<>` và nó chỉ xử lí được 1 lần

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9c31b6c7-f67f-47cc-bb81-671aca466094)

Từ đó thử `<h1><img src=x onerror=alert(0)>`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/539e1b70-9626-49c3-8fce-92640a8b5d15)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/01d5c8e1-375a-40cc-bf02-3a9536ced893)

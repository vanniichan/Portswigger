# Target Goal: 

This lab contains a reflected cross-site scripting vulnerability in the search query tracking functionality where angle brackets and double are HTML encoded and single quotes are escaped.

To solve this lab, perform a cross-site scripting attack that breaks out of the JavaScript string and calls the alert function.

# Recon: 

Payload: `/'-alert()//`

Lý do dùng - thay vì + bởi vì + thường bị filter và cả bọn này đều trả về kết quả giống nhau

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e15b683d-b762-43e4-aee9-fefa2edf590c)

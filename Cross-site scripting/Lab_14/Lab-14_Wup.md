# Target Goal: 

This lab contains a reflected XSS vulnerability in the search functionality but uses a web application firewall (WAF) to protect against common XSS vectors.

To solve the lab, perform a cross-site scripting attack that bypasses the WAF and calls the print() function.

# Recon: 

Bài lab này bị gọi là filter khá nhiều do đó ta có thể brute-force để tìm xem tag nào và attribute có thể được sử dụng 

`tag`:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9d06629b-143a-4263-a39c-a1e742ff235f)

`attribute`: lý do lấy onresize vì bởi vì trong yêu cầu bài lab không được làm cho victim tương tác 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/da5d5776-e92b-41f0-8e1c-021a3b4c4744)

Tuy nhiên khi up payload vào thì không chạy được:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/50f2491c-598b-4001-9f7a-d4b3797739f2)

Tuy nhiên vẫn cần phải có server riêng để gửi cho victim 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2003bda4-613a-49c6-8060-c0e7cf4f7e26)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/33400307-dae8-4231-b5ad-6f2cf7b3d689)

# Target Goal: 

This lab reflects user input in a canonical link tag and escapes angle brackets.

To solve the lab, perform a cross-site scripting attack on the home page that injects an attribute that calls the alert function.

To assist with your exploit, you can assume that the simulated user will press the following key combinations:

# Recon: 

Bài lab này khá là khó hiểu và cũng ít khi xảy ra, một số trường hợp phải phụ thuộc vào trình duyệt và hệ điều hành để tiến hành khai thác được lỗ hổng này như bài lab này phải chạy bằng Chrome

Payload sẽ như sau: `href='https://0ad000cd04d99a1a84e141660087007d.web-security-academy.net/?randome=test'	onclick='alert(1)'	accesskey='x'/%3e'/>`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4d7b9e0a-595a-49bb-a20c-b0b375f8c4d2)

Khi sử dụng phím tắt ( T đang dùng chrome ) ` Alt+ Shift+ X ` nó sẽ trigger accesskey và chạy `alert()`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/600aad2f-7ce7-4dac-8428-7a1b109bd4ab)

# Flag: 

Lỗi luôn : ) không báo solved bài lab

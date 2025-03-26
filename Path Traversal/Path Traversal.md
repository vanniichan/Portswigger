# Define 
![image](https://github.com/vanniichan/Portswigger/assets/112863484/c2dc2540-1bb3-48b2-984f-a7908d0ca961)

- Là lỗ hổng dựa vào đường dẫn để đọc được file của 
- Nằm ở mục Inject trong Top 10 OSWAP
- utf-16le dcode `\xff\x2e\xff\x2e` là  `..`

# Finding Vuln
1. Công thức:
``` unstrusted data + unsafe method == vỡ mồm ```
2. Sử dụng 1 số funct:
-readfile()
-file_put_contents()
-include()
...
3. Burp pro có chức năng ở ``Intruder`` để fuzzing Path Traversal
![image](https://github.com/vanniichan/Portswigger/assets/112863484/cfdc5a65-69f8-47bf-ba7a-54c26bceb7d5)

# File path traversal, validation of file extension with null byte bypass
"Null Byte Injection" hoặc "Null Byte Poisoning" là khi attacker thao túng một đầu vào tệp bằng cách thêm một byte null (\x00) vào tên tệp. Byte null này có thể hiệu quả chấm dứt chuỗi tên tệp, làm cho ứng dụng hiểu sai tên tệp.

Ví dụ `malicious.png\x00.php` thực chất là file php nhưng ứng dụng sẽ hiểu đây là file png

# Define 
![image](https://github.com/vanniichan/Portswigger/assets/112863484/c2dc2540-1bb3-48b2-984f-a7908d0ca961)

- Là lỗ hổng dựa vào đường dẫn để đọc được file của 
- Nằm ở mục Inject trong Top 10 OSWAP

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

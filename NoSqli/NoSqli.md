# NoSQL

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8598e40b-6cbc-4d07-bcfc-ca45a904a55a)

- NoSQL, viết tắt của “Not Only SQL”, đề cập đến các loại cơ sở dữ liệu không quan hệ. Các cơ sở dữ liệu này sử dụng mô hình lược đồ linh hoạt để lưu trữ dữ liệu ở định dạng không phải dạng bảng, chẳng hạn như <b>Document stores</b>, <b>Key-value stores</b>, <b>Wide-column stores</b>, <b>Graph databases</b> 

- Nằm ở mục Inject trong Top 10 OSWAP

# Finding Vuln

- Phát hiện các lỗ hổng chèn NoSQL bằng cách cố gắng phá vỡ cú pháp truy vấn, và đặc biệt chúng dễ xuất hiện khi sử dụng hệ cơ sở dữ liệu

![image](https://github.com/vanniichan/Portswigger/assets/112863484/bbd0193b-25e1-4efe-ac14-9d985988b5e4)

- Cơ sở dữ liệu NoSQL thường sử dụng toán tử truy vấn, cung cấp các cách để chỉ định các điều kiện mà dữ liệu phải đáp ứng để được đưa vào kết quả truy vấn. Ví dụ về toán tử truy vấn MongoDB bao gồm:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a9dce7a6-ae3d-4e01-b803-bd76ac6b7485)

# Exploit

- Khai thác syntax để trích xuất dữ liệu 

- Khai thác tính năng chèn toán tử NoSQL để trích xuất dữ liệu

- Sử dụng toán tử $func của thư viện MongoLite (được sử dụng theo mặc định)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/701a35c2-013b-45e0-a71f-059a88cf863a)

- Timing based injection
  
# References

- https://portswigger.net/web-security/nosql-injection/nosql-databases

- https://hacktricks.boitatech.com.br/pentesting-web/nosql-injection#exploit

- https://medium.com/@aswinchandran274/nosql-unveiled-vulnerabilities-injection-d5505e0f1db3

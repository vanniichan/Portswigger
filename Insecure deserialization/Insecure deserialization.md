![image](https://github.com/vanniichan/Portswigger/assets/112863484/82150fa2-c4fd-4321-bf00-b643727ba838)

<h2>1. Định nghĩa:</h2>

- Serialize là quá trình chuyển đổi các cấu trúc dữ liệu phức tạp, chẳng hạn như các đối tượng và trường của chúng thành định dạng có thể được gửi hoặc lưu dưới dạng luồng byte tuần tự.

- Deserialize là sau khi chuỗi dữ liệu đã được Serialize, phải có một cách nào đó để chuyển hóa chuỗi dữ liệu này về thành một trạng thái mà hệ thống có thể hiểu được.

- Insecure deseralize là khi dữ liệu người dùng có thể kiểm soát và deserialize lên web. Điều này cho phép attacker thao túng các đối tượng được serialize để truyền dữ liệu có hại vào ứng dụng. Thậm 
chí có thể thay đổi cả đối tượng và thuộc tính của nó.

-  Đối tượng cần tấn công phải có lớp sử dụng `Magic method`

-  Tìm được POP chain, hay chính là có thể tùy chỉnh được các đoạn code trong quá trình hàm unserialize() được gọi

- Chủng lỗi này thuộc **top 8 OSWAP** và cũng thể hiểu như là **object inject** .

<h2>2. Nguyên nhân và impact:</h2>

- Chưa đủ hiểu biết về độ nguy hiểm cũng như chủ quan về lỗ hổng.

- Dev có thể nghĩ rằng người dùng không thể đọc hoặc thao tác dữ liệu.

- Một trang web có thể triển khai nhiều thư viện khác nhau, mỗi thư viện cũng có phần phụ thuộc riêng và các lỗ hổng. Chính vì thế có thể lợi dụng vào việc này để khai thác lỗ.

--> Cho phép attacker sử dụng lại code hiện có theo những cách có hại, dẫn đến nhiều lỗ hổng khác, thường là RCE. Ngay cả trong trường hợp không thể RCE, việc deserialize không an toàn có thể dẫn đến leo quyền truy cập tệp tùy ý và tấn công DoS.

<h2>3. Khai thác:</h2>

_____ 1 số hình thức khi thác phổ biến: ______

- Các **Magic Method** trong OOP:
  + __construct() :  giúp chúng ta khởi tạo thuộc tính của một đối tượng.
  +  __destruct() : sẽ được tự động được gọi khi đối tượng trong chương trình không còn được tham chiếu đến nữa.
  + writeObject() : serialize sử dụng ở java có thể sửa cả hàm này.
  + readObject() : deserialize sử dụng ở java có thể sửa cả hàm này
  + __toString() : cũng là hàm sẽ được tự động gọi.

   Còn [rất nhiều](https://www.php.net/manual/en/language.oop5.magic.php) magic method khác

- Thực hành qua các bài lab của [Portswigger](https://portswigger.net/web-security/all-labs)

<h2>4. Cách phòng chống:</h2>

- Nên tránh việc có chức năng deserialize đầu vào của người dùng trừ khi thực sự cần thiết.

- Nếu bắt buộc phải deserialize của các untrusted source thì nên kết hợp với 1 số phương pháp như digital signature (hash, file signature header,...).

- Tránh việc thuộc tính của class chính bị gọi đến hay các magic method bị lợi dụng ở các class từ các đối tượng khác nhau.

<h2>5. References:</h2>

[LINK](https://portswigger.net/web-security/deserialization)
[LINK](https://learn.cyberjutsu.io/courses/take/web-pentration-testing-102/pdfs/53380408-tai-li-u-pdf-kem-theo)
[LINK](https://sec.vnpt.vn/2019/08/ky-thuat-khai-thac-lo-hong-phar-deserialization/)

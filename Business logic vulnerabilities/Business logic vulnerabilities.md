# Business logic vulnerabilities
![image](https://hackmd.io/_uploads/ryc3Dd36kg.png)

## What is Business logic vulnerabilities
**Business Logic Vulnerabilities** là những sai sót trong thiết kế và thực hiện một ứng dụng cho phép attacker thao túng hành vi ngoài ý muốn

## How do Business logic vulnerabilities arise?
**Business logic vulnerabilities** xuất hiện khi nhóm dev đưa ra các giả định thiếu sót về cách user sẽ tương tác với ứng dụng. Những giả định này có thể dẫn đến input độc hại từ user. Ví dụ: nếu dev cho rằng user sẽ input thông qua trình duyệt web, ứng dụng có thể hoàn toàn dựa vào các điều khiển phía client-side để xác nhận đầu vào. Chúng dễ dàng bị bypass bởi attacker bằng cách sử dụng intercepting proxy (BurpSuite)

Lỗ hổng logic phổ biến trong các hệ thống phức tạp mà ngay cả dev cũng không hiểu. Để tránh các lỗ hổng logic, dev cần phải hiểu toàn bộ ứng dụng. Điều này bao gồm nhận thức được làm thế nào các chức năng khác nhau có thể được kết hợp theo những cách khác nhau. Nếu dev không ghi lại rõ ràng bất kỳ giả định nào đang được thực hiện, thì dễ dàng cho các loại lỗ hổng này leo vào một ứng dụng.

## How to find vuln
- Nếu có quyền đọc source code, xem xét kỹ code nào chịu trách nhiệm cho từng thành phần của quy trình
- Phân tích từng thành phần:
	+ Xác định luồng nghiệp vụ hợp lệ của từng thành phần.
	+ Xem xét các giả định mà dev có thể đã đưa ra trong quá trình thiết kế.
- Test từng thành phần của quy trình với các trường hợp sử dụng nằm ngoài luồng nghiệp vụ
- Xem liệu có thể bỏ qua bước quan trọng, thay đổi trạng thái hệ thống hoặc khai thác các hành vi không mong muốn do lỗi logic hay không

## Detecting Information disclosure
**Business logic vulnerabilities** khai thác các quy trình làm việc hợp pháp theo cách mà WAF, IDS hay IPS và các biện pháp bảo mật tiêu chuẩn khác có vẻ bình thường. Vì thế các cuộc tấn công này thường không liên quan đến code hoặc hành vi đáng ngờ nên chúng có thể vượt qua các biện pháp phòng thủ mà không kích hoạt cảnh báo, đòi hỏi phân tích sâu để phát hiện:
- Giao dịch với giá trị âm hoặc không hợp lý, như tổng giá nhỏ hơn tổng giá sản phẩm do giảm giá bất thường.
- User thực hiện nhiều giao dịch trong thời gian ngắn
- Voucher "SAVE50" được áp dụng hai lần cho cùng đơn hàng, làm giảm tổng giá trị từ 200 xuống 100. Đây là dấu hiệu rõ ràng của lỗ hổng

### A Detection Example 
Ta có quy trình của một user khi mua hàng như sau (**baseline**) 
```
10:00:00 - User van login.
10:01:00 - User van khởi tạo giỏ hàng.
10:02:00 - User van xác nhận đơn hàng.
10:03:00 - User van thanh toán thành công.
10:04:00 - User van hoàn tất đơn hàng.
```
Quy trình bất thường xảy ra
```
10:00:00 - User lord login.
10:01:00 - User lord khởi tạo giỏ hàng.
10:02:30 - User lord hoàn tất đơn hàng.
```
User lord không có bước "xác nhận đơn hàng" hay "thanh toán thành công" như quy trình mà đã hoàn tất đơn hàng cho thấy đây là một dấu hiệu đáng ngờ

### A Detection Example 2
Trường hợp Ticketmaster hoặc “Wiseguy Tickets” liên quan đến bot tự động đã khai thác hệ thống bán vé của Ticketmaster, bỏ qua giới hạn để mua số lượng lớn vé trong vài giây, sau đó được bán lại với giá cao hơn. Sự kiện này thường được nêu trong các bài viết về các cuộc tấn công **Business logic vulnerabilities**

## How to prevent Business logic vulnerabilities 
- Dev phải hiểu rõ quy trình và logic mà ứng dụng web đang thực hiện
- Xây dựng và cập nhật tài liệu thiết kế hệ thống, bao gồm luồng dữ liệu và quy trình của tất cả các giao dịch thường xuyên
- Trong trường hợp bắt buộc phải có logic phức tạp, cung cấp tài liệu rõ ràng để dev có thể nắm bắt được các giả định và hành vi mong đợi.
- Tránh xem các lỗi logic là lỗi đơn lẻ do sai sót cá nhân mà bỏ qua chúng.

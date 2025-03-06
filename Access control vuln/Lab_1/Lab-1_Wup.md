# Target Goal
Lab này có admin panel không được bảo vệ cẩn thận. Giải quyết lab bằng cách xóa người dùng `Carlos`.

# Analysis
Theo yêu cầu bài lab thì có một admin panel không được bảo vệ cẩn thận nên có thể nó path truy cập vào nó sẽ bị public. Một trong những bước đầu tiên trước khi brute-force là truy cập vào `robots.txt`

> File robots.txt là một tập tin văn bản đơn giản có dạng đuôi mở rộng txt. Tệp này chứa một nhóm các tiêu chuẩn web quy định cách Robot Web (hoặc Robot của các công cụ tìm kiếm) thu thập dữ liệu trên web, truy cập, index nội dung và cung cấp nội dung đó cho người dùng.

Ảnh dưới là ví dụ về tệp `robots.txt` đơn giản, chỉ ra rằng  người dùng có tên `Mallorybot` không được phép thu thập bất kỳ trang nào của trang web và các user khác không thể thu thập nhiều hơn một trang sau mỗi 20 giây và không được phép thu thập thư mục `/secret`

![image](https://hackmd.io/_uploads/BJGECtIoJe.png)

Quay lại bài lab, truy cập vào `/administrator-panel` và hoàn thành bài lab 

![image](https://hackmd.io/_uploads/rJlWpt8jJl.png)

# Flag:

![image](https://github.com/user-attachments/assets/20989891-468a-4fff-b19e-532ce6ddff6c)

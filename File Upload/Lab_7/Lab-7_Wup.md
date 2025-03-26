# Target Goal
Bài lab có lỗ hổng ở chức năng upload ảnh. Mặc dù nó thực hiện xác thực trên bất kỳ tệp nào được tải lên, nhưng có thể bỏ qua xác thực này hoàn toàn bằng cách lỗ hổng race condition.

Để giải bài lab, upload một con webshell bằng php để đọc nội dung file tại `/home/carlos/secret`

Credential: `wiener:peter`

# Analysis and exploit
Đăng nhập vào tài khoản wiener và thử đăng file `exploit.php` với payload như những bài lab trước

Đã bị chặn. Việc thêm magic bytes của png/jpg và null bytes để bypass cũng không đem lại kết quả gì.

Theo tên của bài lab, ta sẽ lợi dụng lỗ hổng Race condition để khai thác, tức là ta sẽ gửi đồng thời 2 request:

- Upload file 
- Xem nội dung file

Giải thích cho mục đích cho việc ở trên, file vẫn được tải lên + lưu trên web root sau đó mới thực hiện cơ chế validate sau một khoảng thời gian nhất định (vài mili giây)

Ta sẽ tiến hành theo giả thuyết trên. Đầu tiên là bắt request POST (cho việc upload file)

![image](https://hackmd.io/_uploads/B1cqqU-6kx.png)

Tiếp theo là bắt request GET (Xem nội dung file). Kiểm tra path lưu file

![image](https://hackmd.io/_uploads/Sk77oIbaJl.png)

![image](https://hackmd.io/_uploads/r1bIs8Zpke.png)

Kết hợp lại group vào

![image](https://hackmd.io/_uploads/SJt_jLb6yl.png)

Send --> `Send parallel`

![image](https://hackmd.io/_uploads/SkgmTsUZpkx.png)

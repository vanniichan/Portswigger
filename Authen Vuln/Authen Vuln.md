**Authentication vulnerabilities**
# What are Authentication vulnerabilities
**Authentication** là quá trình xác minh danh tính của người dùng. Điều này làm cho các cơ chế xác thực mạnh mẽ không thể thiếu để bảo mật web hiệu quả.

Có ba loại xác thực chính:
- Một cái gì đó bạn **biết**, chẳng hạn như mật khẩu hoặc câu trả lời cho một câu hỏi bảo mật.
- Một cái gì đó bạn **có**, đây là một đối tượng vật lý như điện thoại di động hoặc mã thông báo bảo mật.
- Một cái gì đó **là bạn hoặc làm gì đó**. Ví dụ, sinh trắc học hoặc mô hình hành vi của bạn. 

# What is the difference between authentication and authorization?
Authentication là quá trình xác định đó có phải là bạn không. Authorization là quá trình xác nhận bạn có quyền làm được những gì với tài khoản của bạn.

# How do authentication vulnerabilities arise?
Hầu hết các lỗ hổng trong các cơ chế xác thực xảy ra theo một trong hai cách:

- Các cơ chế xác thực yếu để chống lại brute-force
- Lỗ hổng logic hoặc mã hóa kém trong việc thực hiện cho phép các cơ chế xác thực được bỏ qua hoàn toàn bởi kẻ tấn công. Điều này đôi khi được gọi là **broken authentication**.

# How to secure your authentication
Bất cứ nơi nào có thể, hãy thực hiện xác thực đa yếu tố.
- Thay đổi thông tin xác thực mặc định
- Sử dụng giao thức HTTPS 
- Chỉ các request POST nên được sử dụng để truyền thông tin đăng nhập đến máy chủ. 
- Thông tin được lưu trữ nên được mã hóa hash hoặc thuật toán bảo mật mật mã.
- Sử dụng thông báo lỗi, giống hệt nhau trên biểu mẫu đăng nhập khi người dùng nhập thông tin đăng nhập không chính xác

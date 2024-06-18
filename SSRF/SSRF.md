# Define

![image](https://github.com/vanniichan/Portswigger/assets/112863484/45a647f8-2ed7-4ec0-8901-faed7e075cc5)

- **SSRF** là một lỗ hổng bảo mật web cho phép attacker khiến ứng dụng phía server thực hiện các yêu cầu đến một vị trí ngoài ý muốn.

- Trong một cuộc tấn công **SSRF** điển hình, attackerg có thể khiến server tạo kết nối với các dịch vụ chỉ dành cho nội bộ trong cơ sở hạ tầng của tổ chức. Trong các trường hợp khác, họ có thể buộc server kết nối với các hệ thống bên ngoài tùy ý. Điều này có thể làm rò rỉ dữ liệu nhạy cảm.

# Impact

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4a0a4b7f-79d9-433f-b548-1a2a18f11b59)

- Top 10 trong top 10 OSWAP

# Find and exploit 

- Đa phần lỗi SSRF đến từ request của URL nên ta sẽ tập trung khai thác chúng

- Có 2 dạng chính để khai thác của loại lỗ hổng này: **Regular SSRF** và **Blind SSRF**

- 1 số dạng của `127.0.0.1`:
  + 127.1
  + 2130706433 (dec)
  + 017700000001 (octal)

- [Video](https://www.youtube.com/watch?v=R9pJ2YCXoJQ)
  
# Prevent

- Input của người dùng phải được validate
  
- Không để server gửi raw respond về phía client
  
- Sử dụng allow list (white list)
  
- Chặn tất cả các truy cập nội bộ
  
# References:

[Link](https://portswigger.net/web-security/ssrf#what-is-ssrf)

[Link](https://www.youtube.com/watch?v=R9pJ2YCXoJQ)

[Link](https://whitehat.vn/threads/khai-thac-ssrf-den-rce.15755/)

[Link](https://www.google.com/search?q=SSRF&sca_esv=0cfaba640abdb7cd&sxsrf=ADLYWIKIBBW3m4fxlJGeWTDfyu_ENG_QUA%3A1718725935553&ei=L61xZoK2IZHb2roPvdiiuAE&ved=0ahUKEwjCieuGweWGAxWRrVYBHT2sCBcQ4dUDCBA&uact=5&oq=SSRF&gs_lp=Egxnd3Mtd2l6LXNlcnAiBFNTUkYyBxAjGLADGCcyBxAjGLADGCcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEcyChAAGLADGNYEGEdIiwZQAFgAcAF4AZABAJgBAKABAKoBALgBA8gBAJgCAaACBpgDAIgGAZAGCpIHATGgBwA&sclient=gws-wiz-serp)

# File Upload Vuln 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/93a79341-cab0-4c8f-88b9-5845524201c2)

- Lỗ hổng tải tệp lên tồn tại khi máy chủ web cho phép người dùng tải tệp lên hệ thống tệp mà không xác thực đầy đủ rằng tệp đó không độc hại.

- Nằm trong mục **Insecure Design** top 10 OSWAP 

# Finding Vuln

- Upload 1 shell đơn giản như chứa funct `phpinfo()` để xem nó có được thực thi không

- Kiểm tra 1 số loại như:
   + Content-type
   + Đuôi file: phtml, php2, php3, ...
   + Giả mạo file nếu được filter (ảnh,...)
   + null file

- Có quyền thay đổi `.htaccess`
  
- `untrusted data + unsafe method == hacked`

  # References

 -  https://portswigger.net/web-security/file-upload#what-are-file-upload-vulnerabilities
 -  https://book.hacktricks.xyz/pentesting-web/file-upload
 -  https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

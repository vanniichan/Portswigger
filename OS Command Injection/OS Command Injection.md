# Theory
## Ways of injecting OS commands
Các trình phân tách lệnh sau hoạt động trên cả hệ thống dựa trên **Windows** và **Unix**:
- `&`
- `&&`
- `|`
- `||`

Only on Unix-based:
- ;
- Newline (`0x0a` or `\n`)

## Prevent
Cách hiệu quả nhất để ngăn chặn các lỗ hổng OS command là không bao giờ gọi các OS command từ application-layer. Trong hầu hết các trường hợp, có nhiều cách khác nhau để triển khai chức năng được yêu cầu bằng cách sử dụng **API**.

Một số ví dụ về validate hiệu quả bao gồm: 
- Xác thực dựa trên whitelist các giá trị được phép. 
- Xác thực rằng đầu vào là số (number). 
- Xác thực rằng đầu vào chỉ chứa các ký tự chữ và số, không có cú pháp hoặc khoảng trắng nào khác. 

Đừng bao giờ cố gắng validate đầu vào bằng cách thoát khỏi siêu ký tự shell (**Metacharacters shell**) (Metacharacters are: pipe ( | ), ampersand ( & ), semicolon ( ; ), less-than sign ( < ), greater-than sign ( > ), left parenthesis ( ( ), right parenthesis ( ) ), dollar sign ( $ ), backquote ( ` ), backslash ( \ ), right quote ( ' ), double quotation marks ( " ), newline character, space character, and tab character.). Trong thực tế, điều này rất dễ xảy ra lỗi và dễ bị kẻ tấn công lành nghề vượt qua.

## References:
https://portswigger.net/burp/vulnerability-scanner

https://portswigger.net/research/hunting-asynchronous-vulnerabilities


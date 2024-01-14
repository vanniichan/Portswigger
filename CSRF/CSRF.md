# Define
![image](https://hackmd.io/_uploads/ryzM59yK6.png)
![image](https://hackmd.io/_uploads/HkNcT9yFT.png)

# XSS vs CSRF

- Cross-site scripting (or XSS) allows an attacker to execute arbitrary JavaScript within the browser of a victim user.

- Cross-site request forgery (or CSRF) allows an attacker to induce a victim user to perform actions that they do not intend to.

# Prevent and Bypass

## 1. CSRF token
  - Là 1 mã duy nhất tạo ra từ phía máy chủ được gửi cho khách hàng để trả lại cho máy chủ. Tức là không thể đoán được và khi trả lại không đúng sẽ bị từ chối request
  - Các dấu hiệu nhận biết
    + Validate input thường chỉ đúng với method ```POST``` nhưng lại quên validate method ```GET```
    + 
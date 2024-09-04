# Exploiting XInclude to retrieve files
## Target Goal
This lab has a "Check stock" feature that embeds the user input inside a server-side XML document that is subsequently parsed.

Because you don't control the entire XML document you can't define a DTD to launch a classic XXE attack.

To solve the lab, inject an `XInclude` statement to retrieve the contents of the `/etc/passwd` file.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/f63ce02b-4f10-4499-b3e2-a52cbd7bd379)

Sử dụng Burp để xem nội dung gói tin. Chức năng `checkstock` lần này chỉ có `productID` và `storeID` thay vì nội dung XML. Nhưng theo thông tin bài lab thì server vẫn sẽ sử dụng thông tin từ đây để truyền vào trước khi xử lí.

![image](https://github.com/user-attachments/assets/9a457395-1738-44c5-8a9a-9b865a010742)

Để exploit được thì trước tiên chúng ta cần phải khai báo và tham chiếu tới `XInclude` kèm theo đường dẫn tới file nhạy cảm như sau:
```
<foo xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include parse="text" href="file:///etc/passwd"/></foo>
```

Chèn vào `productID` -> Send request

![image](https://github.com/user-attachments/assets/63d21e0d-b42d-4451-a73e-8160562adb43)

## Flag
![image](https://github.com/user-attachments/assets/f13d9b13-4a73-4a88-88cc-06800bb0c58d)

# Exploiting XXE via image file upload
## Target Goal
This lab lets users attach avatars to comments and uses the Apache Batik library to process avatar image files.

To solve the lab, upload an image that displays the contents of the `/etc/hostname` file after processing. Then use the "Submit solution" button to submit the value of the server hostname.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng  upload file ảnh 

![image](https://github.com/user-attachments/assets/6de514ce-2200-4901-a0f7-966841a36e2d)

Trước tiên mình download 1 file svg bất kì và sử dụng hình ảnh đó làm avatar để đăng comment và bắt request POST comment để xem chi tiết hơn về SVG format.

![image](https://github.com/user-attachments/assets/c3693105-cb4b-4b6a-95c6-66b786159fbf)

Từ requets gửi đi có thể thấy SVG là 1 file hình ảnh dưới dạng XML với các giá trị vector tạo nên hình ảnh đó. Nếu là dữ liệu XML thì chúng ta hoàn toàn có thể 1 định nghĩa Entity trỏ tới` etc/hostname` để lấy được thông tin mong muốn.

Sử dụng request trước đó (Send to Repeater) nhưng lần này mình sẽ xóa dữ liệu SVG và tạo nên [payload](https://gist.github.com/jakekarnes42/b879f913fd3ae071c11199b9bd7ba3a7?short_path=f3432ae) để đọc thông tin file bằng cách sử dụng:
```
<?xml version="1.0" standalone="yes"?><!DOCTYPE test [ <!ENTITY xxe SYSTEM "file:///etc/hostname" > ]><svg width="128px" height="128px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><text font-size="16" x="0" y="16">&xxe;</text></svg> 
```

Send request và ta sẽ thấy ảnh đã được thêm 

![image](https://github.com/user-attachments/assets/2dbcedec-ac84-43b0-8276-c8e88b0df385)

![image](https://github.com/user-attachments/assets/543bcdd8-f922-49ac-9989-79a07f85a313)

"Open image" ta sẽ tìm được đường dẫn tới ảnh có chứa nội dung file `/etc/hostname` và hoàn thành bài lab:

![image](https://github.com/user-attachments/assets/fd8c96c7-fe8c-4179-90f5-0f17032ca166)

## Flag

![image](https://github.com/user-attachments/assets/3f6b4544-f65b-4dd0-aa11-fdfc69c0c8c4)


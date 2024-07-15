# Target Goal: 

This website has an unauthenticated admin panel at `/admin`, but a front-end system has been configured to block external access to that path. However, the back-end application is built on a framework that supports the `X-Original-URL` header.

To solve the lab, access the admin panel and delete the user `carlos`.

# Analysis : 

Theo đề bài lab web này được dựng trên 1framework rằng hỗ trợ `X-Original-URL` đây là 1 header **rất nguy hiểm**. 

`X-Original-URL` dùng để ghi đè lên URL **ban đầu** và truy cập vào URL đã bị chặn từ backend và bypass access control ở frontend.

![image](https://github.com/user-attachments/assets/cbae7477-c933-4b57-84a7-ff829bba4146)

Sửa theo `href` đã cho để xóa user

![image](https://github.com/user-attachments/assets/f7294f63-0d8f-4838-ad05-c1a60570b083)

Tuy nhiên lại có lỗi lý do là thiếu tham số username, do header kia chỉ lưu URL nên tham số sẽ phải để lên phần URL ban đầu

![image](https://github.com/user-attachments/assets/913635a7-0e6b-4f05-b226-2939f6b3367e)

# Flag:

![image](https://github.com/user-attachments/assets/d68c745a-7ed5-4a38-a38b-809a15d2727c)



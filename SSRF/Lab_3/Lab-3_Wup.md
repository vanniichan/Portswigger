# Target Goal: 

This site uses analytics software which fetches the URL specified in the Referer header when a product page is loaded.

To solve the lab, use this functionality to cause an HTTP request to the public Burp Collaborator server.

# Analysis : 

Ứng dụng lab này sử dụng 1 software khác luôn fetch đến URL tại trường header Referer mỗi khi user truy cập 1 trang sản phẩm bất kì. Như vậy ta có thể OOB SSRF bằng cách đưa vào trường Referer URL mà mình control. Sử dụng Burp Collaborator.

![image](https://github.com/vanniichan/Portswigger/assets/112863484/31f24503-23ac-48d2-bfde-340ff3f96427)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/744c0583-9420-402a-9a45-95acf8552088)


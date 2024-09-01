# Target Goal:
This lab uses the Freemarker template engine. It is vulnerable to server-side template injection due to its poorly implemented sandbox. To solve the lab, break out of the sandbox to read the file `my_password.txt` from Carlos's home directory. Then submit the contents of the file.

You can log in to your own account using the following credentials:
```
content-manager:C0nt3ntM4n4g3r
```
# Analysis:
Sau khi đăng nhập vào tài khoản được cấp, chúng ta có chức năng **Edit template** ở detail ở các sản phẩm

![image](https://github.com/user-attachments/assets/f6b842f8-31fb-4fb9-a2fe-20ddd765b869)

Để thuận tiện cho việc xem xét và điều chỉnh payload , ta sẽ xóa hết template cũ đi và thêm expression `${a}` vào -> `Preview`.

Vì đây là expression sai -> Khi server render xảy ra lỗi. Từ error message biết được temaplte engine là **FreeMaker**.

![image](https://github.com/user-attachments/assets/198c160a-88da-4726-bd8a-a55a378f22ad)

Tiếp theo , giống với file `morale.txt` thì file `my_password.txt` này nằm ở thư mục home của carlos -> File path sẽ là `/home/carlos/my_password.txt`.

Để đọc được nó thì mình cần sử dụng payload có chức năng RCE. Mình sẽ thử payload RCE được hacktrick cung cấp:

![image](https://github.com/user-attachments/assets/d417b19d-4617-4787-babb-055adf09da11)

![image](https://github.com/user-attachments/assets/01119866-ad66-47a2-bbe8-d68bfb0683a7)

Khi preview server sẽ trả về `Not Allowed`. Lí do là server đã ngăn chặn việc thực thi câu lệnh thông qua template engine. Đây chính là sandbox được nhắc đến mà chúng ta cần tìm cách bypass.

Mình có tìm thấy bài research tại DEFCON 2020 về cách Bypass 1 số sandbox phổ biến.

Ở trang 53, tác giả có nhắc đến **FreeMaker** với payload hoàn chỉnh như sau:

```
<#assign classloader=product.class.protectionDomain.classLoader>
<#assign owc=classloader.loadClass("freemarker.template.ObjectWrapper")>
<#assign dwf=owc.getField("DEFAULT_WRAPPER").get(null)>
<#assign ec=classloader.loadClass("freemarker.template.utility.Execute")>
${dwf.newInstance(ec,null)("id")}
```
![image](https://github.com/user-attachments/assets/9973b6fa-ff7b-42c4-b439-1f4011e0b52a)

Tiếp theo đổi sang lệnh cat cùng đường dẫn tuyệt đối `/home/carlos/my_password.txt` -> Lấy được nội dung file -> Submit hoàn thanh bài lab.

![image](https://github.com/user-attachments/assets/1341e969-e0ae-4995-aa74-bc1991d84a5d)

# Flag:

![image](https://github.com/user-attachments/assets/a4de198b-e254-420d-82bf-317d59a03e21)

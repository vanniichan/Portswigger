# File path traversal, simple case
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
`F12` hoặc `Ctrl U` để đọc sourcecode. Ta thấy rằng trang web load ảnh của bài post thông qua param `filename`

![image](https://hackmd.io/_uploads/SkzFuyZpkx.png)

Truy cập vào đường dẫn load ảnh bất kì. Assume rằng ảnh này nằm ở đường dẫn `/var/www/html` (web root directory của Linux server)

![image](https://hackmd.io/_uploads/Hy1Ut1bTyx.png)

Vậy để tới thư mục root, ta phải lùi về trước 3 thư mục -> Thay đổi tham số filename thành `../../../etc/passwd` để traverse về thư mục root và truy cập file `/etc/passwd`. Hoàn thành bài lab.

![image](https://hackmd.io/_uploads/Sk0FFJW61g.png)

# File path traversal, traversal sequences blocked with absolute path bypass
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Ứng dụng chặn các traversal nhưng coi tên tệp được cung cấp là liên quan đến thư mục làm việc mặc định.

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
Trang web load ảnh của các post thông qua param `filename` và ta tiếp tục khai thác lỗ hổng ở param này

![image](https://hackmd.io/_uploads/BJQFqyZTJl.png)

Khi traverse bằng `../../../etc/passwd` thì bị trả về `400 Bad Request`, No such file → Có vẻ như server đã chặn `../`

![image](https://hackmd.io/_uploads/ByPpcy-TJx.png)

Theo như tên bài lab và các đường dẫn các file ảnh. Có thể thấy trang web lần này chỉ chấp nhận đường dẫn tuyệt đối. Nhập `filename =/etc/passwd`, response trả về nội dung file thành công.

![image](https://hackmd.io/_uploads/HJTWjJ-aJe.png)

# File path traversal, traversal sequences stripped non-recursively
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Ứng dụng lấy đường dẫn từ tên tệp do người dùng cung cấp trước khi sử dụng

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
Trang web load ảnh của các post thông qua param `filename` và ta lại khai thác lỗ hổng param này

![image](https://hackmd.io/_uploads/H1obn1WTkg.png)

Khi traverse bằng `../../../etc/passwd` thì bị trả về `No such file` .Bởi trang web đã xóa chuỗi `../` nếu nó xuất hiện trong param `filename`

![image](https://hackmd.io/_uploads/HyqEhJbakg.png)

Tuy nhiên, theo mô tả thì nó làm việc đó không triệt để. Cụ thể, với `....//` thì nó sẽ chỉ xóa `../` ở giữa, mà vẫn còn lại `../` --> có thể lợi dụng để bypass. Dựa vào thông tin trong hacktrick

![image](https://hackmd.io/_uploads/B15L31WTkg.png)

Sử dụng payload `....//....//....//etc/passwd` , sau khi strip thành `../../../etc/password` -> đọc thông tin từ file để hoàn thành bài lab

![image](https://hackmd.io/_uploads/S1ct2yZTkg.png)

# File path traversal, traversal sequences stripped with superfluous URL-decode
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Ứng dụng block input bằng cách encode URL trước khi đưa nó vào đọc file

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
Từ source code của web load ảnh của các post thông qua param `filename` -> Ta có thể khai thác lỗ hổng ở param này

![image](https://hackmd.io/_uploads/S14EpkZp1e.png)

Khi traverse bằng `../../../etc/passwd` thì bị trả về `400 Bad Request` → có lẽ lần này trang web đã chặn hoặc thay đổi chuỗi `../ `bằng cách nào đó

![image](https://hackmd.io/_uploads/Skyd6yWpyx.png)

Theo tên bài lab, có thể hiểu trang web này sẽ thực hiện 1 lần decode URL trước khi gửi đi. Nhưng khi thử URL encode `../` thành `..%2f` vẫn trả về lỗi

![image](https://hackmd.io/_uploads/HJes61Wpkl.png)

Đó là do khi nhập kí tự đặc biệt vào thanh địa chỉ, sẽ có 1 lần URL decode nữa được thực hiện → Để payload hoạt động như mong muống thì mình phải ta double URL encoding:
```
../ -> ..%2f -> ..%252f 
```
Sau gửi request, trang web sẽ decode `..%252f` thành `..%2f`, và trải qua một bước URL decode ở thanh địa chỉ thành `../` →  bypass thành công 

Payload cuối cùng:  `..%252f..%252f..%252fetc%252fpasswd` . Ở đây dùng `..%252f..%252f..%252fetc/passwd` nhưng cả 2 đều có response trả về nội dung file `/etc/passwd`. Hoàn thành bài lab

![image](https://hackmd.io/_uploads/SJ9yCJZTyx.png)

# File path traversal, validation of start of path
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Ứng dụng chuyển đổi file path bằng param request và validates bằng cách cung cấp path bắt đầu với folder mong muốn

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
Theo source thì trang web vẫn load ảnh của các post thông qua param filename với đường dẫn tuyệt đối tại `/var/www/html/<file-name>.jpg`

![image](https://hackmd.io/_uploads/SkZsA1Zayg.png)

Thử truyền vào filename giá trị `/etc/passwd` thì không thành công. Theo mô tả thì server sẽ validate filename phải bắt đầu 1 folder nhất định. Ở đây có lẽ là `/var/www/images/`

![image](https://hackmd.io/_uploads/r1oaRkWTyg.png)

Như vậy chỉ cần bypass bằng cách traverse bắt đầu từ folder `/var/ww/html/` với payload `/var/www/images/../../../etc/passwd`, 

Từ đó sẽ solve được bài lab.

![image](https://hackmd.io/_uploads/rke2ylZTyl.png)

# File path traversal, validation of file extension with null byte bypass
## Target Goal
Bài lab này có lỗ hổng Path Traversal,

Ứng dụng đã validate bằng extension

Để giải bài lab, lấy được nội dung của file `/etc/passwd`

## Analysis and exploit
Trang web tiếp tục load ảnh của các post thông qua param `filename`

![image](https://hackmd.io/_uploads/H1MLxgZaJl.png)

Nhưng lần này, để được coi là hợp lệ thì filename phải có extension `.jpg`

![image](https://hackmd.io/_uploads/r1D5geWaJl.png)

Do đó, để đọc được file `/etc/passwd` , sau khi traverse đến file mục tiêu và ta phải tìm cách để bypass điều kiện extension `.jpg` mà vẫn giữ lại payload `../../../etc/passwd`. 

Để làm được như vậy, Null Byte Injection (`%00`) sẽ hỗ trợ ta làm điều này, payload sẽ trở thành: `../../../etc/passwd%00.jpg`

Nếu trang web không xử lí chuỗi Null Byte này thì `%00.jpg` sẽ được bỏ qua vì không chứa thông tin gì nhưng do có extension phù hợp nên đường dẫn trước đó vẫn được xem là hợp lệ.

![image](https://hackmd.io/_uploads/Sk30ggWakx.png)


![image](https://github.com/vanniichan/Portswigger/assets/112863484/20150e6d-8a60-44e0-8191-5ea8f99496f9)

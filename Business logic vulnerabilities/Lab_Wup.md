## Excessive trust in client-side controls
### Target Goal
Bài lab này không xác nhận đầy đủ đầu vào của người dùng nên bị khai thác trong quy trình mua hàng. Để giải bài lab,mua được "Lightweight l33t leather jacket".

Credentials: `wiener:peter`

### Analysis and exploit
Vật phẩm trên có giá tới 1337$ mà chúng ta chỉ có 100$, do đó phải tìm cách "hack" tiền

![image](https://hackmd.io/_uploads/BkXNf5q61e.png)

Mua thử và bắt request bằng BurpSuite, ta sẽ thấy một gói POST đang thực hiện thêm 1 đơn vị áo vào, trong đó có cả trường giá

![image](https://hackmd.io/_uploads/HJfXE9961e.png)

Tham số price ứng với giá tiền **1337\.00\$**, nếu ta đổi sang 1\$ thì không biết có được không

![image](https://hackmd.io/_uploads/ry_qE55Tyg.png)

Khi reload lại trang web, giá tiền sản phẩm đã thay đổi như dưới

![image](https://hackmd.io/_uploads/Hy8oN5cp1x.png)

## High-level logic vulnerability
### Target Goal
Bài lab này không xác nhận đầy đủ đầu vào của người dùng nên bị khai thác trong quy trình mua hàng với giá ngoài ý muốn. Để giải bài lab,mua được "Lightweight l33t leather jacket".

Credentials: `wiener:peter`

### Analysis and exploit
Giá sản phẩm và số tiền được cấp giống với lúc trước

![image](https://hackmd.io/_uploads/r1uESOTa1x.png)

Việc thay đổi giá tiền không còn hiệu quả nhưng trong đó còn 1 param mà chúng ta có thể khai thác, đó chính là `quantity` (số lượng)

Add 1 sản phẩm bất kì ngoài sản phẩm mục tiêu vào giỏ hàng và bắt POST request tới `/cart` bằng BurpSuite

![image](https://hackmd.io/_uploads/r16NjdT6ke.png)

Nếu ta đổi `quantity` thành số âm thay vì số dương và gửi request đi

![image](https://hackmd.io/_uploads/Bk1dsd6aJx.png)

![image](https://hackmd.io/_uploads/B1CtjOppJl.png)

Thay vì số lượng tăng lên lại giảm đi. --> Thanh toán và nhận được lỗi sau

![image](https://hackmd.io/_uploads/HkACjuTpyg.png)

Tức là nó đang tính tổng giá có trong giỏ hàng và nó đang để tổng giá >0, ta sẽ bypass bằng cách lấy giá khác trừ đi để về không âm là được

![image](https://hackmd.io/_uploads/BktZCuTakl.png)

Mua và hoàn thành bài lab

## Inconsistent security control
### Target Goal
Bài lab có lỗi logic cho phép user tùy ý truy cập vào admin. Để giải bài lab, truy cập admin panel và xóa người dùng `Carlos`.

### Analysis and exploit
Để vào được trang admin, chúng ta phải đăng kí bằng email kết thúc bằng `@dontwannacry.com`

Do không có nên chúng ta đăng kí tạm bằng email client được cấp. Sau khi đăng nhập, để ý có chức năng Update Email ngay trong giao diện

![image](https://hackmd.io/_uploads/Bk1pgYppkg.png)

![image](https://hackmd.io/_uploads/H19xbFpa1x.png)

Thử update email thành 1 email bất kì có đuôi `@dontwannacry.com` như thông tin được biết trước đó, đồng thời admin panel xuất hiện. Xóa `carlos` và hoàn thành bài lab

![image](https://hackmd.io/_uploads/Bk77ZK6p1e.png)

## Flawed enforcement of business rules
### Target Goal
Bài lab này có lỗi logic ở luồng xử lí thanh toán. Để giải bài lab, mua được "Lightweight l33t leather jacket"

Credentials: `wiener:peter`

### Analysis and exploit
Ngoài giao diện như bình thường, trang web còn offer coupon mua hàng cho khách hàng mới. Add "Lightweight l33t leather jacket" vào giỏ hàng và nhập coupon này

![image](https://hackmd.io/_uploads/Bk8fGFppJx.png)

Khi nhập lại sẽ bị reject do mã đã dùng rồi. Quay lại trang bán hàng, khi lướt xuống cuối và nhập 1 email bất kì vào phần `newsletter` ta sẽ nhận được 1 coupon mới

![image](https://hackmd.io/_uploads/H1r_zYppJx.png)

Lần này được giảm hẳn 30% , thử apply lần nữa thì cũng bị reject

![image](https://hackmd.io/_uploads/By3tzY6pkg.png)

Nhưng khi nhập lại mã `NEWCUTS5` rồi mới đến mã `SIGNUP30` thì cả 2 coupon đều có thể sử dụng lại

![image](https://hackmd.io/_uploads/S1jqGYTaJx.png)

Có vẻ khi nhập coupon mới thì số lần nhập coupon cũ đã bị reset. Tiếp tục cho đến khi `Total` < 100\$ là ta có thể mua sản phẩm để hoàn thành bài lab

![image](https://hackmd.io/_uploads/rJLnzYTaJe.png)

## Low-level logic flaw
### Target Goal
Bài lab này không xác nhận đầy đủ đầu vào của người dùng nên bị khai thác trong quy trình mua hàng với giá ngoài ý muốn. Để giải bài lab,mua được "Lightweight l33t leather jacket".

Credentials: `wiener:peter`

### Analysis and exploit
Ở bài lab này, ta có thể thay đổi param `quantity`. Dù trang web cho phép gửi request với quantity là số âm nhưng giỏ hàng sẽ không có gì thay đổi

![image](https://hackmd.io/_uploads/Hy-YXtTpJx.png)

Và khi ta nhập `quantity` > 99, thì sẽ bị báo `Invalid paramter: quantity`

![image](https://hackmd.io/_uploads/ByMcXFTTyl.png)

Tối đa mình sẽ mua được 99 sản phẩm trong 1 lần . Dù không có cách nào điều khiển giá tiền trực tiếp nhưng nếu `Total` vượt qua 1 giá trị nhất định mà server có thể xử lí thì sao

![image](https://hackmd.io/_uploads/H1kh7Kpp1x.png)

`Send to Intruder` chèn null payload vào sau `quanity` -> `Payload setting` chọn `Continue indefinitely` -> `Start attack`

![image](https://hackmd.io/_uploads/ry4a7FaTyg.png)

Để Intruder chạy một thời gian, theo tính toàn thông thường thì `Total = Price x Quanity`. Price và Quantity đều dương nên Total sẽ phải là số dương . Nhưng trong giỏ hàng lúc này Total lại là số âm -> `Integer Overflow`

![image](https://hackmd.io/_uploads/B1v1NK6a1l.png)

> Lỗi Integer Overflow ở Total được biết là khi tổng giá tăng > 2,147,483,647 thì nó sẽ giảm về giá trị Integer âm nhỏ nhất là -2,147,483,647 và tiếp tục tăng dần tới 0.

"Lightweight l33t leather jacket" có giá 1337.00$ nhưng giá trị theo requets gửi đi là 133700 (tính cả phần cent) và 1 lần mua nhiều nhất 99 .

Chúng ta cần làm cho Total vượt qua `2147483647` , quay về` -2147483647` và tiến về số âm gần 0 nhất có thể. 
```
(2 x  2147483647) : ( 133700 x99 ) = 324.51803 
```

Ta sẽ cần 323 request đặt 99 sản phảm và từ đó điều chỉnh số lượng bằng và thêm các sản phẩm để 0$ < Total < 100\$

Sử dụng null payload trước đó, lần này chạy chính xác 323 lần

![image](https://hackmd.io/_uploads/HJv4VFp6Jg.png)

Sau khi hoàn tất, còn khoảng` -64060$` cần giải quyết.` 64060 / 1337 = 47` nên ta sẽ mua thêm 1 lần 47 sản phẩm nữa

Tiếp tục đặt thêm các sản phẩm khác sao cho `0$ < Total <= 100$`

![image](https://hackmd.io/_uploads/HktDVFaTJe.png)

Mua thêm 50 sản phẩm thứ 2, khi đó tổng tiền là `18.54$` -> Thanh toán được hóa đơn và hoàn thành bài lab

![image](https://hackmd.io/_uploads/r1vK4YTakl.png)

![image](https://hackmd.io/_uploads/S1ptVKT6kx.png)

## Inconsistent handling of exceptional input
### Target Goal
Bài lab có lỗi logic cho phép user tùy ý truy cập vào admin. Có thể khai thác lỗ hổng ở quy trình đăng ký tài khoản để nhận admin account. Để giải bài lab, truy cập admin panel và xóa người dùng `Carlos`.

### Analysis and exploit
Bài lab này tương tự với [Inconsistent security control](#Inconsistent-security-control). Điểm khác là không còn chức năng update email nữa. 

Nếu ta đăng kí tài khoản với email dài như sau

![image](https://hackmd.io/_uploads/BkIo95apyx.png)

Trong response trả về, trang web đã cắt bớt đi và chỉ lấy 255 kí tự đầu

![image](https://hackmd.io/_uploads/H1N299aTkx.png)

Khi vào mail client, ta thấy dòng thông báo mail này có thể truy tất cả mail kể cả subdomain -> có thể thêm `dontwannacry.com`. để tạo thành 1 subdomain của email và đăng kí.

Kết hợp với các kí tự khác sao cho khi server lấy 255 kí tự đầu thì kết quả sẽ là `<...>@dontwannacry.com`
```
'a'*238+'@dontwannacry.com.'+'exploit-<LABID>.exploit-server.net' 

(238 kí tự 'a')
--> aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@dontwannacry.com.exploit-0abc00a90302d47e827f733d01e200e0.exploit-server.net
```

![image](https://hackmd.io/_uploads/S1ZejcTTkx.png)

![image](https://hackmd.io/_uploads/rJLejcppkl.png)

Lúc này, email đã được server xử lý và rút gọn thành `aaaa...aaa@dontwannacry.com`. Thực hiện đăng kí với email trên và chúng ta đã có quyền admin

![image](https://hackmd.io/_uploads/HJzfoqa6Je.png)

## Weak isolation on dual-use endpoint
### Target Goal
Bài lab có lỗi logic về cấp độ quyền của user. Có thể khai thác lỗ hổng ở phần quản lý các tính năng để nhận được quyền cao hơn. Để giải bài lab, lên quyền admin và xóa người dùng `Carlos`.

Credentials: `wiener:peter`

### Analysis and exploit
Trang web này có 1 chức năng được sử dụng cho cả user và admin (dual-use endpoint). Server xảy ra sai sót trong đánh giá đặc quyền của người dùng tại chức năng này

Đăng nhập vào tài khoản wiener, từ giao diện này mình có thể `ChangePassword` theo mong muốn nếu nhập đúng Curent password

![image](https://hackmd.io/_uploads/ryQdgiT6yg.png)

Thử đổi thành một mật khẩu bất kì (abcd)

![image](https://hackmd.io/_uploads/H1otxi66ye.png)

Thử xóa tham số `current-password` -> gửi đi. Response trả về báo là Password đã thay đổi thành công

![image](https://hackmd.io/_uploads/Bkzsgs6p1g.png)

Đổi `username=administrator` và password của tài khoản này thực sự đã bị thay đổi

![image](https://hackmd.io/_uploads/r1Q3xs6a1x.png)

Đăng nhập vào tài khoản admin và hoàn thành bài lab.

## Insufficient workflow validation
### Target Goal
Bài lab có lỗi logic về giả định thiếu sót về chuỗi các sự kiện trong quy trình mua hàng. Để giải bài lab, mua được "Lightweight l33t leather jacket".

Credentials: `wiener:peter`

### Analysis and exploit
Chúng ta thử mua 1 sản phẩm vừa túi tiền <= 100\$

Chọn 1 sản phảm -> `Add to cart` -> Vào giỏ hàng và `Place order`

![image](https://hackmd.io/_uploads/Byn3Zo6T1x.png)

Giao dịch hoàn thành

![image](https://hackmd.io/_uploads/rkUT-i6T1x.png)

Để ý URL thì ta đã được redirect đến path `/cart/order-confirmation?order-confirmed=true`, theo trình tự bình thường thì sau khi trả tiền user mới được redirect đến đây để xác nhận Order thành công.

Vậy nếu mình thêm sản phẩm mong muốn vào cart và tự traverse đến đây thì sao

![image](https://hackmd.io/_uploads/SkWlGi6Tyl.png)

Thành công bỏ qua bước thanh toán để order sản phẩm -> Bài lab hoàn thành

## Authentication bypass via flawed state machine
### Target Goal
Bài lab có lỗi logic về giả định thiếu sót về chuỗi các sự kiện trong quy trình login. Để giải bài lab, bypass authen để truy cập vào được admin panel để xóa user `carlos`.

Credentials: `wiener:peter`

### Analysis and exploit
Sau khi đăng nhập vào tài khoản wiener được cấp, chúng ta sẽ phải chọn role

![image](https://hackmd.io/_uploads/SyWDHj6p1l.png)

Trong đây chỉ có User và Content Creator. Chọn User -> Đăng nhập hoàn tất.

Bắt request này bằng BurpSuite

![image](https://hackmd.io/_uploads/ByQKHsaT1g.png)

Nếu mình drop hoàn toàn request để xem role được cấp là gì. Log out và đăng nhập lại nhưng lần này bật Intercept trên BurpSuite để duyệt từng request

Foward tất cả cho đến request `GET /role-selector`. Drop request này

![image](https://hackmd.io/_uploads/H127Liaa1g.png)

Quay về giao diện chính bài lab, chúng ta đã có thể access admin panel -> Xóa `carlos` để hoàn thành bài lab

![image](https://hackmd.io/_uploads/B10xDoTp1x.png)

## Infinite money logic flaw
### Target Goal
Bài lab có lỗi logic trong luồng xử lí thanh toán. Để giải bài lab, mua được "Lightweight l33t leather jacket".

Credentials: `wiener:peter`

### Analysis and exploit
Lần này lỗ hổng có thể tìm thấy tại chức năng hoàn tiền bằng gift card kết hợp với coupon như sau

![image](https://hackmd.io/_uploads/SyzODo66Jx.png)

Khi mua sản phẩm Gift Card với giá `10$`, ta sẽ nhận được 1 gift code. Đúng như tên gọi, khi dùng giftcard này sẽ được hoàn lại `10$` vào credit bằng cách nhập code

![image](https://hackmd.io/_uploads/B1Uavsaakg.png)

Nhưng giống như lần trước, ở cuối trang web khi nhập email bất kì sẽ được phát 1 coupon

![image](https://hackmd.io/_uploads/SycJuoppJl.png)

Nếu sử dụng coupon trên thì đơn hàng sẽ được giảm 30%. Như vậy, với gift card `10$`, ta sẽ được giảm `3$` và chỉ cần trả `7$`

![image](https://hackmd.io/_uploads/SJCI_s6TJg.png)

Với gift code mua được, thì ta lại được hoàn `10$` nhưng chỉ phải trả `7$` -> Lời `3$`

![image](https://hackmd.io/_uploads/HJiuuip6ye.png)

Như vậy chỉ cần thực hiện mua gift card và apply mã code vô số lần, tài khoản của mình sẽ được cộng tiền một cách vô hạn. Dùng Burp Intruder để gửi request kèm theo macro lần lượt như sau
```
POST /cart - Thêm gift card 
POST /cart/coupon - Apply coupon -> Giảm 30%
POST /cart/checkout - Thanh toán
GET /cart/order-confirmation?order-confirmed=true - confirm đơn hàng 
POST /gift-card - submit gift code để được hoàn tiền
```

Cứ một lần thực hiện xong macro thì ta sẽ được cộng thêm `3$`. 

Tại request số 4, ta cần chuyển tham số `gift-card` nhận được từ response sang request số 5 để submit tự động

![image](https://hackmd.io/_uploads/SyvXZYRpJl.png)
![image](https://hackmd.io/_uploads/SksmZK0T1g.png)

Macro chạy thành công

![image](https://hackmd.io/_uploads/HkYEbY0TJl.png)

"Lightweight l33t leather jacket" có giá `1337$`. Ta đã có sẵn `100$` và một lần macro thực thi thì được cộng `3$`. Do đó, ta cần gửi `(1337 - 100) / 3 ~ 413` request

Trong resource pool thêm điều kiện `Max concurrent request = 1` để các request được đảm bảo gửi đi lần lượt

![image](https://hackmd.io/_uploads/SkyPZtApJx.png)

Place order và hoàn thành bài lab

## Authentication bypass via encryption oracle
### Target Goal
Bài lab này có một lỗ hổng logic mã hóa cho người dùng. Để giải bài lab, khai thác lỗ hổng này để có quyền truy cập vào admin panel và xóa người dùng `Carlos`.

Credentials: `wiener:peter`

### Analysis and exploit
Trong trang login có chức năng `stay-logged-in` -> Nếu đăng nhập thành công sẽ lưu lại 1 cookie để tự động đăng nhập vào lần sau.

![image](https://hackmd.io/_uploads/H1LR5FA6kx.png)

Bắt request login, xuất hiện `Cookie: stay-logged-in` encrypt bằng base64 được thêm vào request. 

Nhưng khi decode không cho chúng ta thông tin gì

![image](https://hackmd.io/_uploads/SJFljF0pye.png)

Truy cập vào 1 bài post bất kì và để lại email không hợp lệ (a123)

![image](https://hackmd.io/_uploads/BkpWitATkx.png)

Trang web gửi về thông báo` Invalid email address: a123` và kèm theo một cookie nofitication cũng được mã hóa . Từ đó ta có thể assume:

- Nội dung của notification chính là base64 của chuỗi `Invalid email address: a123` sau khi bị mã hóa
- Mã hóa dùng cho nofitication giống với `stay-logged-in`

![image](https://hackmd.io/_uploads/SykSsK0pkx.png)

Khi paste giá trị của `Cookie: stay-logged-in` để đưa vào nofitication

![image](https://hackmd.io/_uploads/SyNUoFApkl.png)

Kết quả cho thấy nội dung của `stay-logged-in` chính là `username:timestamp`

![image](https://hackmd.io/_uploads/H1BvjFAa1l.png)

Bây giờ, ta cần tạo một giá trị `stay-logged-in` cho administrator dựa vào cách mã hóa của notification. Ta sử dụng chính timestamp của wiener làm timestamp để tạo cookie cho tài khoản admin

![image](https://hackmd.io/_uploads/HJftoKCaJl.png)

Response trả về `Invalid email address: administrator:1672593998338` cùng cookie notification dưới dạng base64

![image](https://hackmd.io/_uploads/S1cjjt0aJl.png)

Tuy nhiên mình cần xóa `Invalid email address:(23 bytes)` để notification chứa thông tin: `administrator:1672593998338` . Để làm được điều đó, lấy giá trị notification hiện tại, thực hiện decode URL+base64 và xóa 23 bytes đầu đi

URL decode nhằm hiển thị thông tin dưới dạng bytes, mỗi kí tự ứng với 1 byte

![image](https://hackmd.io/_uploads/rymAoFCake.png)

Sau khi xóa 23 bytes trên, thực hiện encode base64 + URL encode để truyền vào cookie notification chuỗi `O3tEa1GHAnSumMNJYUyeNZmLguHpQlzLaC+N7hZEpoujFylp6tXe1Fc%3d`. Response trả về lỗi do input của notification phải là bội số của 16

-> Mã hóa được thực hiện mỗi 16 bytes 

![image](https://hackmd.io/_uploads/ryCy2K0pyx.png)

Mình biết được chuỗi `Invalid email addreess:` có 23 bytes, do đó chỉ cần thêm 9 bytes bất kì ứng với 9 kí tự -> Mảng cần xóa sẽ có 32 bytes là bội số của 16 -> khi xóa sẽ không ảnh hưởng đến mã hóa của chuỗi `administrator:1672593998338` phía sau

![image](https://hackmd.io/_uploads/SyWf3YCpke.png)

Thực hiện URL+base64 decode 1 lần nữa và xóa 32 bytes -> Paste cookie mới vào notification: `djB3rOXek/kH8c/b/tl4Ps595LA64fFl0wYvIfx%2bYHc%3d`

![image](https://hackmd.io/_uploads/H1Xmht061g.png)

Lúc này giá trị tại notificatiion có dạng
```
URLencode(base64encode('administrator:1672593998338'))
```  
Tạo cookie thành công!

Thực hiện request đến `/admin` và thêm cookie `stay-logged-in` có giá trị trên. `Intercept on`

![image](https://hackmd.io/_uploads/HyVh8cR6Jg.png)

Reload và ta đã vào được account của administrator -> xóa user `carlos` để hoàn thành bài lab.

## Bypassing access controls using email address parsing discrepancies
### Target Goal
Bài lab này xác nhận địa chỉ email để ngăn attacker đăng ký địa chỉ từ các domain trái phép. Có sự khác biệt của trình phân tích cú pháp trong logic xác thực và thư viện được sử dụng để phân tích địa chỉ email.

Để giải bài lab, khai thác lỗ hổng này để đăng ký tài khoản và xóa `Carlos`

### Analysis and exploit
Như mô tả bài lab ta sẽ phải đăng ký email dưới domain `@ginandjuice.shop` thì sẽ có quyền truy cập admin panel

![image](https://hackmd.io/_uploads/HJ7gvAAaJg.png)

Ta sẽ phân tích như sau
```
user@ginandjuice.shop --> đây là email được chấp nhận

@ginandjuice.shop --> đây sẽ là domain email chúng ta không muốn nó gửi mail xác nhận 
```
Mail xác nhận ta muốn chính là mail ta sở hữu, cụ thể là `attacker@exploit-0a3200840378828180af344601f70006.exploit-server.net`

![image](https://hackmd.io/_uploads/BJxqDAAp1l.png)

Theo kỹ thuật khai thác được phân tích ở bài này: [Splitting the email atom: exploiting parsers to bypass access controls](https://portswigger.net/research/splitting-the-email-atom) mail chúng ta muốn và nó có thể gửi đi được sẽ có dạng như sau

```
attacker@exploit-0a3200840378828180af344601f70006.exploit-server.net@ginandjuice.shop
```

Tuy nhiên mail ở trên sẽ không hoạt động vì có 2 ký tự `@` do đó ta sẽ tiến hành encode để mã hóa nó

```
=?utf-7?q?attacker&AEA-exploit-0a3200840378828180af344601f70006.exploit-server.net&ACA-?=@ginandjuice.shop

=? bắt đầu encode
utf-7 định dạng mã hóa
q mã hóa dưới định dạng quoted-printable
& đại diện cho `+`` và được bypass cho '@'
AEA- đại diện cho `@` trong encode utf-7
ACA- đại diện cho dấu cách
?= kết thúc encode
```
Kết quả khi sẽ được hiển thị như sau
```
attacker@exploit-0a3200840378828180af344601f70006.exploit-server.net @ginandjuice.shop
```

Đăng ký và ta có được admin panel, xóa user `carlos` và hoàn thành bài lab

![image](https://hackmd.io/_uploads/rkCk9AApke.png)

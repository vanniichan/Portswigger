## Limit overrun race conditions
### Target Goal
Bài lab có lỗ hổng về race conditions cho phép mua các mặt hàng với giá ngoài ý muốn. Để giải bài lab mua được sản phẩm "Lightweight L33t Leather Jacket"

Credentials: `wiener:peter`

### Analysis and exploit
Đăng nhập vào tài khoản wiener, credit hiện có là 50\$ trong khi thứ cần mua có giá tới 1337\$

![image](https://hackmd.io/_uploads/SJgspgSAkg.png)

Mình được cấp 1 mã coupon, khi nhập giảm 20% tổng giá trị. Có lẽ phải tìm cách apply nhiều mã này để được giảm 100% nhưng khi nhập lại lần 2

![image](https://hackmd.io/_uploads/SJA36lBAkl.png)

Khi bắt request bằng BurpSuite, ta nhận ra có request POST được gửi lên để verify mã giảm giá

![image](https://hackmd.io/_uploads/Sk-RTeSRJl.png)

Với mỗi lần apply sẽ mất 3-4s . Nếu gửi cùng lúc nhiều request apply mã này thì sao, `Send to Repeater` -> `Create tab group` ->  Ctrl + R để clone request trên khoảng 20 lần

(tổng giá trị sẽ giảm dần -> cần nhiều coupon hơn để Total < 50\$)

![image](https://hackmd.io/_uploads/r1dWAeSRke.png)

`Send group in parallel`

![image](https://hackmd.io/_uploads/ry6x1ZHRkg.png)

![image](https://hackmd.io/_uploads/r1u81ZrR1l.png)

`Place order` và hoàn thành bài lab

## Bypassing rate limits via race conditions
### Target Goal
Cơ chế đăng nhập của bài lab này sử dụng giới hạn tỷ lệ để bảo vệ chống lại brute-force. Tuy nhiên, ta có thể bypass bằng lỗ hổng race condition

Để giải bài lab:
1. Tìm ra cách khai thác race condition để bypass race condition
2. Brute-force thành công user `carlos`
3. Login và truy cập thành công admin panel
4. Xóa user `carlos`

Credentials: `wiener:peter`.

### Analysis and exploit
Sau khi thử nhập sai mật khẩu với username=carlos thì mình bị khóa tài khoản

![image](https://hackmd.io/_uploads/HyEwLbrC1e.png)

Ý tưởng của bài lab là dựa vào khoảng thời gian trong lúc server xử lí đăng nhập và tăng số lần incorrect login (nếu password sai) để gửi được nhiều hơn 3 request cùng lúc, đẩy nhanh quá trình bruteforce.

Có 2 hướng đi là sử dụng Send in parallel nhưng sẽ phải thử và đổi password gửi đi bằng tay cho đến khi tìm ra.

Cách thứ 2 là sử dụng script có sẵn của Turbo Intruder có tên` race-single-packet-attack.py`

:::spoiler Payload
```python
def queueRequests(target, wordlists):

    # if the target supports HTTP/2, use engine=Engine.BURP2 to trigger the single-packet attack
    # if they only support HTTP/1, use Engine.THREADED or Engine.BURP instead
    # for more information, check out https://portswigger.net/research/smashing-the-state-machine
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=1,
                           engine=Engine.BURP2
                           )

    # the 'gate' argument withholds part of each request until openGate is invoked
    # if you see a negative timestamp, the server responded before the request was complete
    for word in wordlists.clipboard:
        engine.queue(target.req,word, gate='race1')

    # once every 'race1' tagged request has been queued
    # invoke engine.openGate() to send them in sync
    engine.openGate('race1')


def handleResponse(req, interesting):
    table.add(req)
```
:::

![image](https://hackmd.io/_uploads/BkmArfr0yl.png)

Xuất hiện repsonse với status code 302 - master

![image](https://hackmd.io/_uploads/S1duRGS0Je.png)

`Show response in browser` --> xuất hiện admin panel, xóa user và hoàn thành bài lab

## Multi-endpoint race conditions
### Target Goal
Quy trình mua của bài lab này có lỗ hổng race condition cho phép mua vật phẩm với giá ngoài ý muốn

Để giải bài lab, mua thành công "Lightweight L33t Leather Jacket"

Credentials: `wiener:peter`.

### Analysis and exploit
Đầu tiên, mua Giftcard với và bắt tất cả request liên quan đến quá trình giao dịch

Sau khi mua xong có thể nhập luôn Code này để hoàn lại 10\$ vào credit.

Có 2 request POST cần chú ý:
- POST `/cart` để thêm sản phẩm vào giỏ hàng
- POST `/cart/checkout` để xác nhận thanh toán và đặt hàng

Khi server thực hiện check out và thêm sản phẩm mới sẽ mất khoảng 3-4s trước khi response trả về

Dựa vào đó, ta có thể thêm 1 sản phẩm vừa túi tiền như Giftcard vào cart -> Request checkout đồng thời request thêm Leather Jacket vào. Nếu việc xác nhận thanh toán hoàn thành cùng lúc với thêm sản phẩm mới vào giỏ hàng thì mình sẽ thành công.

Đảm bảo có 1 sản phẩm đủ credit để thanh toán trong cart -> Add 2 request trên vào tab group -> Trong POST `/cart`  đổi `productid=`1 (Leather Jacket) -> `Send in parallel`

![image](https://hackmd.io/_uploads/HJL977HCye.png)

![image](https://hackmd.io/_uploads/rkes7mSAkg.png)

>Có thể mất vài lần thử, nếu không đủ credit thì nhập lại những giftcode đã mua để nhận lại 10\$

Dù credit -1247\$ nhưng việc đặt hàng đã thành công -> Bài lab hoàn thành

![image](https://hackmd.io/_uploads/BJUTmmHC1x.png)

## Single-endpoint race conditions
### Target Goal
Tính năng đổi email của bài lab này có lỗ hổng race condition cho phép liên kết địa chỉ email tùy ý khác

Ai đó có địa chỉ `carlos@ginandjuice.shop` có một lời mời đang chờ xử lý để làm admin cho trang web, nhưng họ chưa tạo tài khoản. Do đó, bất kỳ user nào request thành công địa chỉ này sẽ tự động kế thừa quyền admin

Để giải bài lab:
- Thay thành công email của mình thành `carlos@ginandjuice.shop`
- Truy cập được vào admin panel
- Xóa user `carlos`

Credentials: `wiener:peter`

### Analysis and exploit
Khi nhập email mới, sẽ có 1 mail confirm được gửi về mail client để xác nhận -> Chúng ta phải tìm cách đổi hướng mail confirm từ `carlos@ginandjuice.shop` sang mail client của mình. Bắt request này bằng BurpSuite

![image](https://hackmd.io/_uploads/B1ZxcXSRkg.png)

POST `/my-account/change-mail` có lẽ là single endpoit được nhắc đến để thực hiện chiếm quyền email thông qua race condition

Nếu đồng thời gửi 2 request change-mail  với 2 mail khác nhau. Mặc dù request 1 sẽ đến trước nhưng trong thời gian server xử lí gửi mail confirm thì request 2 tới -> tham số mail bị thay đổi, mail confirm đáng lẽ được gửi đến mail trong request 1 lại được gửi đến mail ở request 2.

Ctrl + R để clone request POST `/my-account/chage-email`, đổi PARAM `email=carlos@ginandjuice.shop` -> Add 2 request vào group -> `Send in parallel`

![image](https://hackmd.io/_uploads/ByLQqQr0Je.png)

Xác nhận đổi mail thành `carlos@ginandjuice.shop` đã được gửi đến mail client được cấp

![image](https://hackmd.io/_uploads/ry6HcQH0kx.png)

Confirm và reload page, admin panel xuất hiện, xóa user `carlos` và hoàn thành bài lab.

## Exploiting time-sensitive vulnerabilities
### Target Goal
Bài lab có tính năng reset password. Mặc dù không có lỗ hổng race condition nhưng có thể khai thác điểm yếu trong cơ chế mã hóa bằng cách gửi các request được căn thời gian một cách cẩn thận.

Để gỉai bài lab:
- Khai thác lỗ hổng ở gen token
- Lấy đựơc token reset password của carlos
- Login bằng `carlos`
- Truy cập vào admin panel và xóa user`carlos`

Credentials: `wiener:peter`.

### Analysis and exploit
Khi yêu cầu gửi lại password sẽ có 1 email được gửi về mail client của chúng ta

![image](https://hackmd.io/_uploads/S1qW37SCkg.png)

Tại url được cấp để đổi mật khẩu có path như sau
```
forgot-password?user=wiener&token=113554982a8e5e2d2b824cd8424825a765d6e8ed
```
Dựa vào đây , ta biết để tạo được 1 link reset password thì cần có `username` và `token`.

Điểm đặc biệt là nếu clone request `forgot-password` và gửi đi cùng lúc (`Add to group` --> `send parallel`)

![image](https://hackmd.io/_uploads/HkYi-vrC1g.png)

Như ảnh trên có thể thấy token khác nhau khi cố gắng gửi cùng 1 request --> `send parallel` như "bình thường" sẽ không còn tác dụng

Phân tích kỹ hơn nguyên nhân:

![image](https://hackmd.io/_uploads/Skv-GPBCyg.png)

![image](https://hackmd.io/_uploads/HkTXMvHAyl.png)

Ở 2 ảnh trên là 2 request, có thể thấy 2 request gửi đi không đồng nhất với nhau về mặt thời gian --> đã xảy ra gửi request tuần tự --> Lý do có thể đến từ cookie hoặc csrf token. Vậy nếu ra sao nếu ta `send parallel` nhưng 2 cookie khác nhau. Để làm được việc đó ta cần tìm chỗ có thể gen ra cookie mới

![image](https://hackmd.io/_uploads/ryEf7vr01e.png)

Nếu xóa đi header `Cookie:...` thì sao

![image](https://hackmd.io/_uploads/rJhBmvSRJg.png)

Ở ảnh trên ta có thể thấy, server đã tự tạo ra 1 cookie mới khi ta gửi request đến mà không có header cookie. Đã có cookie, quay lại `send parallel` và nhận lỗi sau

![image](https://hackmd.io/_uploads/SJYKQPBRyl.png)

Vậy tức là ta cũng cần csrf token mới, lấy token mới này từ cookie mới gen ra --> `send parallel` 

![image](https://hackmd.io/_uploads/BkbgVPHCJg.png)

![image](https://hackmd.io/_uploads/r1zZEwHCyx.png)

![image](https://hackmd.io/_uploads/BJT-EDS0kg.png)

Từ ảnh trên ta đã khai thác thành công race condition khi token gen ra đã giống nhau. Bây giờ sủa lại param `username=carlos`

![image](https://hackmd.io/_uploads/BJ4wVvrCJx.png)

Khi check lại mail ta sẽ chỉ nhận được một mail trả về token, lý do không phải là lỗi mà đã thành công yêu cầu nhận được token từ phía user `carlos` và nó sẽ có token y hệt với token ta vừa mới nhận được ở phía `wiener`

![image](https://hackmd.io/_uploads/SJliTNvHRJe.png)

Thay đổi param ở đường link và đổi mật khẩu theo ý mình

![image](https://hackmd.io/_uploads/HymlrPSC1l.png)

Admin panel xuất hiện, xóa user `carlos` và hoàn thành bài lab

![image](https://hackmd.io/_uploads/BybESwHAkx.png)

## Partial construction race conditions
### Target Goal
Bài lab này có cơ chế đăng ký người dùng mới. Nó tồn tại lỗ hổng race condition cho phép bạn bypass verify email và đăng ký với email tùy ý mà không sở hữu

Để giải được bài lab, khai thác lỗ hổng race condition để tạo account và sau đó xóa thành công user `carlos`

### Analysis and exploit
Sau khi vào bài lab, ta sẽ kiểm tra luôn chức năng register theo thông tin được cung cấp

![image](https://hackmd.io/_uploads/SJTtjDS0Jx.png)

Do được cung cấp 1 email client nên tiếp theo ta sẽ tạo user mới với email đó xem quá trình xác thực diễn ra thế nào

![image](https://hackmd.io/_uploads/B1MAxuHC1e.png)

Như có thể thấy, trang web chỉ cho phép đăng kí với mail `...@ginandjuice.shop` và đây là email nội bộ

Khi đăng kí thì sẽ phải sử dụng đường link gửi qua mail nhưng mail này ta không có quyền kiểm soát và cũng thể đăng kí bằng mail client được cấp. Bằng cách xem các request được gửi đi qua BurpSuite, phát hiện 1 request GET tới `user.js` như sau

![image](https://hackmd.io/_uploads/HkD_-dSC1l.png)

Đọc qua code thì có thể thấy việc tạo ra 1 request POST tới `/confirm` đi cùng tham số token. Theo như quy trình trước đó và việc link xác nhận gửi qua email thì rất có thể link được gửi tới mail để xác nhận đăng kí tài khoản sẽ có dạng 
```
https://<Lab_ID>.web-security-academy.net/confirm?token=...
```
Dù biết được vậy nhưng ta vẫn không thể bypass để tạo tài khoản bới 2 lí do chính:
1. Theo như các bài lab trước thì token là 1 chuỗi chữ + số ngẫu nhiên lên đến hơn 20 kí tự -> rất khó bruteforce
2. Mỗi link sẽ liên kết với 1 tài khoản cố định.

Dựa vào điều này và dạng bài Race Condition, cách exploit chính là vào thời điểm request `Register` được gửi đi -> Server xử lí tạo token ứng với tài khoản mail. Lúc này sẽ có 1 khoảng thời gian rất nhỏ khi mà token = null (không có giá trị) do phía server chưa kịp tạo và gán giá trị.

Trước hết để đảm bảo payload thực hiện được, tạo 1 POST request như sau
```
 /confirm?token=
```
![image](https://hackmd.io/_uploads/Hy5CZdSRyl.png)

![image](https://hackmd.io/_uploads/SJh1fOH0Jl.png)

Forbidden, có vẻ là đã bị chặn. Nhưng khi đổi token thành dữ liệu dạng array -> `token[]` thì response đã trả về `Incorrect Token : Array` . Từ đó việc đặt `token=null` là hoàn toàn khả thi

![image](https://hackmd.io/_uploads/B1MbG_HAyg.png)

Giờ việc cần làm chính là gửi đi request tạo tài khoản cùng lúc với request confirm token để lợi dụng khoảng thời gian khi mà token chưa được gán cho user như đã nói ở trên -> khi đó token = null -> Payload của chúng ta sẽ được chấp nhận

![image](https://hackmd.io/_uploads/ryM7zdrCkg.png)

Không thành công, mặc dù sử dụng `Tab Group` -> `Send In Parallel` với request `Register` nhưng giữa các request thường vẫn sẽ có delay nhất định và khoảng thời gian trong Race Condition thường tình bằng ms -> Tỉ lệ thành công đơn lẻ khá thấp.

Để giải quyết thì sử dụng Extension Turbo Intruder với script `race-single-packet-attack.py`

Sau đó modify script như sau

![image](https://hackmd.io/_uploads/ByOrzdrC1l.png)

Script này sẽ tự động Register với email `@ginandjuiceshop.net` ->Gửi 50 request Confirm với null token. Việc thực hiện nhiều reuqest cùng 1 lần sẽ tăng cơ hội thành công.

Lưu ý là vị trí payload sẽ đặt ở username. Do không thể đăng kí trùng username kể cả chưa thực hiện đăng kí thành công. Sau khi gửi 50 req thì attempt sẽ tăng lên -> Username tăng dần: User0 -> User1 -> User2...

Ta phải thay đổi username liên tục sau mỗi lần register vì mặc dù server sẽ kiểm tra username này liệu đã được đăng kí hay chưa. Còn tham số mail chỉ chặn nếu đã có 1 tài khoản đăng kí thành công bằng mail này.

Trong lần thử thứ 5 với `username=us3r5`, payload đã thành công bypass để đăng kí user mới

![image](https://hackmd.io/_uploads/B19aXOBRJx.png)

Đăng nhập với username và password đã biết trước đó -> Xóa `carlos` -> Hoàn thành bài lab.

:::spoiler Payload
```
def queueRequests(target, wordlists):
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=1,
                           engine=Engine.BURP2
                           )
    # replace your `phpsessionid` session cookie in here
    confirmTokenRequest = '''POST /confirm?token[]= HTTP/2
Host: 0a0b0044042c91ec806d21c1002800ac.web-security-academy.net
Cookie: phpsessionid=GkmisK23OpSUSLFENArpAfLco8LQOwUm
Content-Length: 0

'''
    MIN_ATTEMPT = 1
    MAX_ATTEMPT = 20
    for usernamePrefix in range(MIN_ATTEMPT, MAX_ATTEMPT):
        currentQueue = 'queue' + str(usernamePrefix)
        # prepare 1 registration request
        engine.queue(target.req, str(usernamePrefix), gate=currentQueue)

        # prepare x number of confirm token requests
        CONFIRM_REQUEST_NUMBER = 50
        for confirmRequest in range(CONFIRM_REQUEST_NUMBER):
            engine.queue(confirmTokenRequest, gate=currentQueue)

        # send all prepared requests at the same time
        engine.openGate(currentQueue)

def handleResponse(req, interesting):
    table.add(req)
```
:::

> Lưu ý phải chạy đi chạy lại payload nhiều lần mới thành công

![image](https://hackmd.io/_uploads/rJO6C_SR1x.png)

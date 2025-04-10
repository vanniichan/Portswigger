# Race conditions
## What is Race conditions?
**Race conditions** là lỗ hổng liên quan đến lỗ hổng [Business logic](https://hackmd.io/FQnFkKovTieEFLJyrSiMUw). Khi 1 requets bất kì được gửi về server dù ít hay nhiều thì cũng cần thời gian ( vài ms -> vài s) để server tiếp nhận và xử lí thông tin bên trong, đặc biệt là các ứng dụng xử lí đa luồng. Attacker có thể lợi dụng thời gian này để tấn công Race Condition nhằm thay đổi dữ liệu, bypass access control ...

![image](https://hackmd.io/_uploads/rkhU1VE0Je.png)

Trong Race conditions có một thuật ngữ đó là **Race Window**: dùng để chỉ khoảng thời gian nhỏ giữa các request, nếu hai hoặc nhiều request cùng thực hiện truy cập thì có thể gây ra lỗi hoặc hành vi không mong muốn.

Giả sử một trang web bán hàng online thực hiện các quy trình sau để cho phép nhập mã giảm giá khi thanh toán:
1. Kiểm tra xem mã đã dùng chưa.
2. Áp dụng giảm giá.
3. Cập nhật cơ sở dữ liệu để đánh dấu mã đã dùng.

![image](https://hackmd.io/_uploads/S1dQ-4VCkl.png)
(hình trên thể hiện thứ tự quy trình được thực hiện)

Tuy nhiên nếu gửi nhiều request cùng lúc trước khi hệ thống kịp cập nhật trạng thái -> Áp dụng mã giảm giá nhiều lần

![image](https://hackmd.io/_uploads/BJNtZE4A1l.png)
(hình trên thể hiện 2 request được thực hiệnh cùng lúc trong cùng 1 quy trình)

## How to find vuln and exploit
- Tìm endpoint bị giới hạn lượt sử dụng (rate limit / one-time use) nhưng vẫn thực hiện được hành động có ý nghĩa như gửi tiền, đổi mật khẩu, nhận quà…
- Gửi liên tục request đến endpoint để xem có thể vượt quá giới hạn này hay không

### Hidden multi-step sequences
Một kỹ thuật nâng cao hơn trong khai thác **race condition** đó là khi ta không chỉ nhắm vào việc vượt qua giới hạn sử dụng (limit overrun) mà tận dụng các "**sub-states**" — các trạng thái ẩn tạm thời mà hệ thống đi qua trong một tiến trình xử lý phức tạp **mà người dùng không thấy**. Ví dụ như sau:

**Bypass MFA thông qua sub-state logic flaw**:
1. Gửi request đăng nhập với user/pass đúng → hệ thống chuyển sang trạng thái chờ OTP.
2. Trong khi hệ thống chưa xác thực OTP, gửi song song một request khác để truy cập ứng dụng chính (forced browsing).
3. Nếu hệ thống chưa khóa session hoặc chưa chuyển sang trạng thái "chặn truy cập", ta có thể truy cập được, bypass bước xác thực OTP.

Việc phát hiện còn có thể theo mô hình sau:
![image](https://hackmd.io/_uploads/BkohhVEAkl.png)

#### Predict (Dự đoán)
![image](https://hackmd.io/_uploads/BJNZT4VAJl.png)

Với ảnh trên việc request reset password song song cho hai user khác nhau dường như không gây ra xung đột vì nó tạo ra hai record khác nhau. Tuy nhiên, ảnh dưới cho phép chỉnh sửa cùng một record với các request cho hai user khác nhau dẫn đến **một user đổi mật khẩu nhưng hai account bị đổi**

#### Probe (Thăm dò)
1. Tạo Benchmark cho việc so sánh hành vi: Gửi request tuần như bình thường (áp voucher lần 1, lần 2, ...) để có baseline
2. Gửi song song để kích hoạt race
3. Từ 2 bước trên quan sát lại lần nữa thông tin response trả về (status code, body, headers, JSON trả về, v.v)

#### Prove the concept (Chứng minh là đúng)
Sau các bước trên vẽ lại attack vector: **Tối giản hóa tấn công** (Gỡ bỏ những request thừa, giữ lại nhóm nhỏ nhất có thể tái tạo hiệu ứng), **Tư duy theo hướng cấu trúc** (condition không chỉ là lỗi “xử lý song song” → mà là lỗi logic và trạng thái trong luồng xử lý)

### Multi-endpoint race conditions (Thao túng nhiều endpoint cùng lúc)
Để đơn giản hóa, ta có ví dụ sau:
- Luồng hợp lệ:
1. Thêm sản phẩm vào giỏ hàng.
2. Thanh toán sản phẩm.
3. Xác nhận đơn hàng.
- Lỗi logic:
1. Sau khi thanh toán xong 1 món hàng, thêm thêm sản phẩm vào giỏ hàng ngay trước khi điều hướng đến `/order/confirm`.
2. Nếu hệ thống chỉ kiểm tra “đã thanh toán” mà không kiểm tra chi tiết từng món hàng, thì ta có thể nhận thêm sản phẩm mà không trả tiền

### Single-endpoint race conditions
![image](https://hackmd.io/_uploads/HyrSzrN0kx.png)

Để đơn giản hóa, ta có ví dụ sau:
- Endpoint `/password-reset` nhận username và sinh ra token reset
- Token + user ID được lưu tạm vào session để xác nhận ở bước sau
- Email chứa token được gửi trong thread xử lý nền (after response)

Từ đây, Race condition bắt đầu xảy ra
- Attacker gửi 2 request song song đến `/password-reset`:
	+ Request A: username=alice
	+ Request B: username=bob
- Ở phía back-end nó sẽ xảy ra:
1. Session ban đầu set user=alice
2. Trước khi thread gửi email, request B ghi đè lại session thành user=bob

--> **Kết quả:**
	+ Email chứa token của alice được gửi đến bob 
	+ Có thể đánh cắp token reset, hoặc reset account

### Partial construction race conditions
Để đơn giản hóa, ta có ví dụ sau:
- Khi đăng ký new account, database sẽ thực hiện như sau
```sql
INSERT INTO users (username) VALUES ('bob') 
UPDATE users SET api_key='XYZ123' WHERE username='bob'
```
> Trong khoảng thời gian rất ngắn giữa bước 1 và bước 2, user `bob` đã tồn tại nhưng chưa có `api_key`

- Trong thời gian “race window” đó, attacker có thể gửi request sau
```
GET /api/user/info?user=bob&api-key[]= HTTP/2
Host: vulnerable-website.com
```
Nếu request đến trong race window giữa bước tạo user và set api_key, ta có thể truy cập API mà không cần key.

### Time-sensitive attacks
Để đơn giản hóa, ta có ví dụ sau:
- Gửi 2 request song song tới `/password-reset`:
	+ user A: attacker
	+ user B: victim
- Do token phụ thuộc vào timestamp → cả hai token có thể giống nhau
- Attacker dùng token reset nhận được để reset tài khoản của victim

## Detecting Race conditions
- Các request lặp lại một cách nhanh chóng từ cùng một nguồn tới một endpoint (ví dụ: API rút tiền, thay đổi quyền) là một trong các dấu hiệu để biết SSRF attack đang xảy ra
- Kiểm tra thời gian của các sự kiện để phát hiện các hoạt động trùng lặp hoặc xung đột. Ví dụ: nếu hai giao dịch ghi đè lên cùng một trường dữ liệu mà không có kiểm soát thứ tự

Giả sử trong Splunk ta sẽ có thể trace log bằng query sau
```
index=app_logs sourcetype=transaction user_id="attacker123" endpoint="/withdraw" | stats count by user_id, timestamp | where count > 50 AND time_span < 1s
```
- `user_id="attacker123"`: Lọc log theo `user_id` là `attacker123`
- `endpoint="/withdraw"`: Lọc log liên quan đến endpoint `/withdraw`
- Dùng lệnh `stats` để đếm số sự kiện theo `user_id` và `timestamp` --> Mỗi kết quả sẽ cho biết tại một thời điểm, `attacler123` đó thực hiện bao nhiêu giao dịch.
- `where count > 50 AND time_span < 1s`: 
    + `where count > 50`: Lọc các kết quả có hơn 50 giao dịch trong một timestamp cụ thể.
    + `AND time_span < 1s`: Tìm thời điểm bé hơn 1s

--> Nếu số lượng request vượt quá ngưỡng trong khoảng thời gian ngắn (dưới 1s), cảnh báo sẽ kích hoạt.

## How to prevent
- **Tránh sử dụng dữ liệu từ nhiều nguồn lưu trữ khác nhau trong cùng một quy trình xử lý**. Việc trộn dữ liệu từ nhiều nơi (ví dụ: bộ nhớ tạm, cơ sở dữ liệu, cache) có thể dẫn đến hành vi không nhất quán và khó kiểm soát khi xảy ra race condition
- **Đảm bảo các endpoint thực hiện thay đổi trạng thái theo cách nguyên tử** (atomic) bằng cách tận dụng cơ chế kiểm soát đồng thời (concurrency control) của hệ thống lưu trữ. Ví dụ: khi xử lý đơn hàng, hãy gộp việc kiểm tra số tiền thanh toán và xác nhận đơn hàng vào cùng một transaction
- **Tận dụng các ràng buộc toàn vẹn dữ liệu** như UNIQUE, NOT NULL, hay FOREIGN KEY trong cơ sở dữ liệu như một lớp phòng thủ bổ sung để ngăn lỗi logic hoặc trạng thái không hợp lệ
- **Đảm bảo framework xử lý session duy trì tính nhất quán nội bộ**. Việc cập nhật từng biến session riêng lẻ thay vì cập nhật cùng lúc có thể gây ra lỗi khi có nhiều request chạy song song.
- **Dùng JWT**. Tuy nhiên, hướng tiếp cận này cũng mang theo nhiều rủi ro bảo mật riêng (như giả mạo JWT), cần đánh giá cẩn thận.
- Sử dụng WAF (như Cloudflare, AWS WAF) để phát hiện và chặn các request bất thường
- Thiết lập ngưỡng (threshold) trong SIEM hoặc WAF để cảnh báo khi số lượng request vượt quá mức bình thường

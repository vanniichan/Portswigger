<h1>
    Server-side template injection
</h1>

![image](https://github.com/user-attachments/assets/f3b7f53c-4eda-4f36-bb0c-2fd1163b1a85)

<h2>
    Table of Contents:
    
    What is server-side template injection?
    Impact of server-side template injection
    How vulnerabilities arise
    Constructing an attack
    Preventing vulnerabilities
    
</h2>   

# What is server-side template injection?
**Server-side template injection (SSTI)** là khi attacker có thể sử dụng cú pháp mẫu gốc để tiêm payload độc hại vào một template, sau đó template này sẽ được thực thi ở phía máy chủ.

**Template engines** được thiết kế để tạo các trang web bằng cách kết hợp các template cố định với dữ liệu dễ thay đổi. **SSTI** phía máy chủ có thể xảy ra khi đầu vào của người dùng được nối trực tiếp vào một template, thay vì được truyền vào dưới dạng dữ liệu. Điều này cho phép attacker chèn các lệnh template tùy ý để thao túng công cụ tạo template, thường cho phép chúng kiểm soát hoàn toàn máy chủ. Như tên cho thấy, payload SSTI được phân phối và đánh giá phía máy chủ, có khả năng khiến chúng trở nên nguy hiểm hơn nhiều so với việc chèn template phía máy khách thông thường.

# Impact of server-side template injection
**SSTI** có thể khiến các trang web gặp nhiều cuộc tấn công khác nhau tùy thuộc vào template engine được đề cập và cách ứng dụng sử dụng nó một cách chính xác. Trong một số trường hợp hiếm hoi, những lỗ hổng này không gây ra rủi ro bảo mật thực sự. Tuy nhiên, trong hầu hết các trường hợp, tác động của **SSTI** có thể rất thảm khốc.

Ở mức độ nghiêm trọng nhất, attacker **có khả năng thực thi mã từ xa**, chiếm toàn quyền kiểm soát máy chủ và sử dụng nó để thực hiện các cuộc tấn công khác vào cơ sở hạ tầng nội bộ.

Ngay cả trong trường hợp không thể RCE, attacker vẫn có thể sử dụng tính năng **SSTI** làm cơ sở cho nhiều cuộc tấn công khác, có khả năng giành được quyền truy cập đọc vào dữ liệu nhạy cảm và các tệp tùy ý trên máy chủ.

# How vulnerabilities arise
**SSTI** **phát sinh khi đầu vào của người dùng được nối vào templates thay vì được truyền vào dưới dạng dữ liệu**.

Các template chỉ cung cấp các phần giữ chỗ để hiển thị nội dung động thường không dễ bị **SSTI**. Ví dụ cổ điển là một email chào đón từng người dùng bằng tên của họ, chẳng hạn như đoạn trích sau từ mẫu Twig:

```
$output = $twig->render("Dear {first_name},", array("first_name" => $user.first_name) );
```

Điều này không dễ bị tấn công bởi **SSTI** vì tên của người dùng chỉ được chuyển vào mẫu dưới dạng dữ liệu.

Tuy nhiên, vì các template chỉ đơn giản là các chuỗi nên các nhà phát triển web đôi khi ghép trực tiếp thông tin đầu vào của người dùng vào các mẫu trước khi hiển thị. Hãy lấy một ví dụ tương tự như ví dụ trên, nhưng lần này, người dùng có thể tùy chỉnh các phần của email trước khi gửi. Ví dụ: họ có thể chọn tên được sử dụng:

```
$output = $twig->render("Dear " . $_GET['name']);
```
Thay vì một giá trị tĩnh được chuyển vào template, một phần của chính template đó đang được tạo động bằng cách sử dụng `name` tham số **GET**. Vì cú pháp template được đánh giá phía máy chủ, điều này có khả năng cho phép attacker đặt payload trong tham số `name` như sau:
```
http://vulnerable-website.com/?name={{bad-stuff-here}}
```

# Constructing an attack (Xây dựng một cuộc tấn công)
![image](https://github.com/user-attachments/assets/00f76d9e-a7f1-4dcb-9688-a8707c4b6107)

## Detect
Giống như bất kỳ lỗ hổng nào, bước đầu tiên để khai thác là có thể tìm ra nó. Có lẽ cách tiếp cận ban đầu đơn giản nhất là thử làm fuzzing bằng cách chèn một chuỗi ký tự đặc biệt thường được sử dụng trong các biểu thức mẫu, chẳng hạn như `${{<%[%'"}}%\`. Nếu một **exception** được nêu ra, điều này cho biết rằng nội dung được injected template syntax có khả năng được máy chủ diễn giải theo một cách nào đó. Đây là một dấu hiệu cho thấy lỗ hổng chèn mẫu phía máy chủ có thể tồn tại.

**SSTI** xảy ra trong hai bối cảnh riêng biệt, mỗi bối cảnh yêu cầu phương pháp phát hiện riêng. Bất kể kết quả của nỗ lực FUZZING của bạn là gì, điều quan trọng là bạn cũng phải thử các phương pháp tiếp cận theo ngữ cảnh cụ thể sau đây. Nếu việc FUZZING không thể kết luận được thì một lỗ hổng vẫn có thể tự lộ diện khi sử dụng một trong những phương pháp này. Ngay cả khi tính năng FUZZING gợi ý **SSTI**, bạn vẫn cần xác định bối cảnh của nó để khai thác.

### Plaintext context
Hầu hết template languages cho phép bạn tự do nhập nội dung bằng cách sử dụng trực tiếp thẻ HTML hoặc bằng cách sử dụng cú pháp gốc của template, cú pháp này sẽ được hiển thị thành HTML ở phần phụ trợ trước khi gửi phản hồi HTTP. Ví dụ: trong **Freemarker**, dòng `render('Hello ' + username)` sẽ hiển thị thành `Hello Carlos`.

Điều này đôi khi có thể bị khai thác để tấn công XSS và trên thực tế thường bị nhầm lẫn với một lỗ hổng XSS đơn giản. Tuy nhiên, bằng cách đặt các phép toán làm giá trị của tham số, chúng ta có thể kiểm tra xem đây có phải là điểm truy cập tiềm năng cho một cuộc tấn công tiêm mẫu phía máy chủ hay không.

For example, consider a template that contains the following vulnerable code:
```
render('Hello ' + username)
```
Trong quá trình kiểm tra, chúng ta có thể kiểm tra việc chèn mẫu phía máy chủ bằng cách yêu cầu một URL như:
```
http://vulnerable-website.com/?username=${7*7}
```
Nếu kết quả đầu ra chứa `Hello 49`, điều này cho thấy phép toán đang được đánh giá phía máy chủ. Đây là một bằng chứng tốt về khái niệm cho lỗ hổng **SSTI**.

### Code context
Trong các trường hợp khác, lỗ hổng bị lộ do dữ liệu đầu vào của người dùng được đặt trong một biểu thức mẫu(**template expression**), như chúng ta đã thấy trước đó với ví dụ về email của mình. Điều này có thể ở dạng tên biến do người dùng kiểm soát được đặt bên trong một tham số, chẳng hạn như:
```
greeting = getQueryParameter('greeting')
engine.render("Hello {{"+greeting+"}}", data)
```
Trên trang web, URL kết quả sẽ giống như sau:
```
http://vulnerable-website.com/?greeting=data.username
```
Ví dụ: điều này sẽ được hiển thị trong đầu ra của `Hello Carlos`.

Bối cảnh này dễ bị bỏ qua trong quá trình đánh giá vì nó không dẫn đến XSS rõ ràng và gần như không thể phân biệt được với tra cứu hashmap đơn giản. Một phương pháp kiểm tra việc **SSTI** trong ngữ cảnh này là trước tiên phải xác định rằng tham số không chứa lỗ hổng XSS trực tiếp bằng cách chèn HTML tùy ý vào giá trị:
```
http://vulnerable-website.com/?greeting=data.username<tag>
```
Trong trường hợp không có XSS, điều này thường sẽ dẫn đến một mục trống ở đầu ra (chỉ **Hello** mà không có username), thẻ được mã hóa hoặc thông báo lỗi. Bước tiếp theo là thử thoát ra khỏi câu lệnh bằng cách sử dụng cú pháp tạo khuôn mẫu phổ biến và cố gắng chèn HTML tùy ý vào sau nó:
```
http://vulnerable-website.com/?greeting=data.username}}<tag>
```
Nếu điều này lại dẫn đến lỗi hoặc đầu ra trống, thì bạn đã sử dụng cú pháp từ templating language sai hoặc nếu không có cú pháp kiểu template nào hợp lệ thì việc **SSTI** là không thể. Ngoài ra, nếu kết quả đầu ra được hiển thị chính xác, cùng với HTML tùy ý, thì đây là dấu hiệu chính cho thấy có **SSTI**:
```
Hello Carlos<tag>
```

## Identifying the template engine
Sau khi detect, bước tiếp theo là xác định template engine.

Mặc dù có rất nhiều ngôn ngữ tạo template nhưng nhiều ngôn ngữ trong số đó sử dụng cú pháp rất giống nhau được chọn cụ thể để không xung đột với các ký tự HTML. Do đó, việc tạo các payloaad thăm dò để kiểm tra công cụ tạo template nào đang được sử dụng có thể tương đối đơn giản.

Chỉ cần gửi cú pháp không hợp lệ thường là đủ vì thông báo lỗi thu được sẽ cho bạn biết chính xác công cụ tạo template là gì và đôi khi là cả phiên bản nào. Ví dụ: biểu thức không hợp lệ `<%=foobar%>` kích hoạt phản hồi sau từ công cụ **ERB** dựa trên Ruby:
```
(erb):1:in `<main>': undefined local variable or method `foobar' for main:Object (NameError)
from /usr/lib/ruby/2.5.0/erb.rb:876:in `eval'
from /usr/lib/ruby/2.5.0/erb.rb:876:in `result'
from -e:4:in `<main>'
```
Nếu không, bạn sẽ cần phải kiểm tra thủ công các payload dành riêng cho từng ngôn ngữ khác nhau và nghiên cứu cách công cụ tạo template diễn giải chúng. Sử dụng quy trình loại bỏ dựa trên cú pháp nào có vẻ hợp lệ hoặc không hợp lệ, bạn có thể thu hẹp các tùy chọn nhanh hơn bạn nghĩ. Cách phổ biến để thực hiện việc này là đưa vào các phép toán tùy ý bằng cách sử dụng cú pháp từ các công cụ tạo mẫu khác nhau. Sau đó bạn có thể quan sát xem chúng có được đánh giá thành công hay không. Để trợ giúp quá trình này, bạn có thể sử dụng cây quyết định tương tự như sau:

![image](https://github.com/user-attachments/assets/1fecbfef-30b6-4cee-905c-6bb82d5376d8)

## Exploit
### Read
Trừ khi bạn đã biết rõ về công cụ tạo template, việc đọc tài liệu của nó thường là bước đầu tiên để bắt đầu. Mặc dù đây có thể không phải là cách thú vị nhất để bạn sử dụng thời gian nhưng điều quan trọng là không được đánh giá thấp nguồn thông tin hữu ích mà tài liệu có thể mang lại.

**Learn the basic template syntax**
Khi bạn biết rằng công cụ template **Mako** dựa trên Python đang được sử dụng, việc thực thi mã từ xa có thể đơn giản như:
```
<%
                import os
                x=os.popen('id').read()
                %>
                ${x}
```
**Read about the security implications**
Ngoài việc cung cấp các nguyên tắc cơ bản về cách tạo và sử dụng template, tài liệu cũng có thể cung cấp một số loại phần "Bảo mật". Tên của phần này sẽ khác nhau nhưng thường sẽ phác thảo tất cả những điều nguy hiểm tiềm tàng mà mọi người nên tránh thực hiện với template. Đây có thể là một nguồn tài nguyên vô giá, thậm chí hoạt động như một loại bản ghi chép về những hành vi mà bạn nên tìm kiếm trong quá trình kiểm tra cũng như cách khai thác chúng.

Ví dụ: trong ERB, tài liệu tiết lộ rằng bạn có thể liệt kê tất cả các thư mục và sau đó đọc các tệp tùy ý như sau:
```
<%= Dir.entries('/') %>
<%= File.open('/example/arbitrary-file').read %>
```

### Explore
Tại thời điểm này, bạn có thể đã tình cờ phát hiện ra một cách khai thác khả thi bằng cách sử dụng tài liệu. Nếu không, bước tiếp theo là khám phá môi trường và cố gắng khám phá tất cả các đối tượng mà bạn có quyền truy cập.

Nhiều công cụ tạo template hiển thị một loại đối tượng "**self**" hoặc "**environment**", hoạt động giống như một không gian tên chứa tất cả các đối tượng, phương thức và thuộc tính được công cụ tạo mẫu hỗ trợ. Nếu một đối tượng như vậy tồn tại, bạn có thể sử dụng nó để tạo danh sách các đối tượng nằm trong phạm vi. Ví dụ: trong các ngôn ngữ tạo khuôn template dựa trên Java, đôi khi bạn có thể liệt kê tất cả các biến trong môi trường bằng cách sử dụng nội dung sau:
```
${T(java.lang.System).getenv()}
```
**Developer-supplied objects**
Điều quan trọng cần lưu ý là các trang web sẽ chứa cả các đối tượng tích hợp do template cung cấp và các đối tượng tùy chỉnh, dành riêng cho trang web đã được nhà phát triển web cung cấp. Bạn nên đặc biệt chú ý đến những đối tượng không chuẩn này vì chúng đặc biệt có khả năng chứa thông tin nhạy cảm hoặc các phương pháp có thể bị khai thác. Vì các đối tượng này có thể khác nhau giữa các mẫu khác nhau trong cùng một trang web, hãy lưu ý rằng bạn có thể cần nghiên cứu hành vi của đối tượng trong ngữ cảnh của từng template riêng biệt trước khi tìm cách khai thác nó.

Mặc dù **SSTI** có thể dẫn đến việc thực thi mã từ xa và tiếp quản hoàn toàn máy chủ nhưng trên thực tế, điều này không phải lúc nào cũng có thể đạt được. Tuy nhiên, chỉ vì bạn đã loại trừ khả năng thực thi mã từ xa, điều đó không nhất thiết có nghĩa là không có tiềm năng cho một kiểu khai thác khác. Bạn vẫn có thể tận dụng **SSTI** để thực hiện các hoạt động khai thác có mức độ nghiêm trọng cao khác, chẳng hạn như **path traversal**, để có quyền truy cập vào dữ liệu nhạy cảm.

### Create a custom attack

# Preventing vulnerabilities
Cách tốt nhất để ngăn chặn **SSTI** là không cho phép bất kỳ người dùng nào sửa đổi hoặc gửi template mới. Tuy nhiên, điều này đôi khi không thể tránh khỏi do yêu cầu kinh doanh.

Một trong những cách đơn giản nhất để tránh tạo ra **SSTI** là luôn sử dụng công cụ tạo template "không logic(**template**)", chẳng hạn như **[Mustache](https://mustache.github.io/)**, trừ khi thực sự cần thiết. Việc tách logic khỏi bản trình bày càng nhiều càng tốt có thể làm giảm đáng kể khả năng bạn gặp phải các cuộc tấn công dựa trên template nguy hiểm nhất.

Một biện pháp khác là chỉ thực thi mã của người dùng trong môi trường sandbox, nơi các mô-đun và chức năng tiềm ẩn nguy hiểm đã bị loại bỏ hoàn toàn. 

Cuối cùng, một cách tiếp cận bổ sung khác là chấp nhận rằng việc thực thi mã tùy ý là điều không thể tránh khỏi và áp dụng sandbox của riêng bạn bằng cách triển khai môi trường template của bạn trong vùng chứa Docker bị khóa chẳng hạn.

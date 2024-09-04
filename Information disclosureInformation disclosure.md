<h1>
    Information disclosure vulnerabilities
</h1>

![image](https://github.com/user-attachments/assets/075da32d-ce27-4e80-8760-9af982398f76)

<h2>
    Table of Contents:
    
    What is information disclosure?
    Examples
    How do information disclosure vulnerabilities arise?
    Impact
    Testing for information disclosure
    Common sources of information disclosure
    Preventing
    
</h2> 

# What is information disclosure?

**Information disclosure**, (**information leakage**) còn được gọi là rò rỉ thông tin, là khi một trang web vô tình tiết lộ thông tin nhạy cảm cho người dùng. Tùy thuộc vào ngữ cảnh, các trang web có thể rò rỉ tất cả các loại thông tin cho attacker tiềm năng, bao gồm:

- Dữ liệu về những người dùng khác, chẳng hạn như tên người dùng hoặc thông tin tài chính
- Dữ liệu thương mại hoặc kinh doanh nhạy cảm
- Chi tiết kỹ thuật về trang web và cơ sở hạ tầng của nó

Sự nguy hiểm của việc rò rỉ dữ liệu nhạy cảm của người dùng hoặc doanh nghiệp là khá rõ ràng, nhưng việc tiết lộ thông tin kỹ thuật đôi khi cũng có thể nghiêm trọng. Mặc dù một số thông tin này sẽ được sử dụng hạn chế nhưng nó có thể là điểm khởi đầu để lộ ra một bề mặt tấn công bổ sung, có thể chứa các lỗ hổng thú vị khác. Kiến thức mà bạn có thể thu thập thậm chí có thể cung cấp mảnh ghép còn thiếu khi cố gắng xây dựng các cuộc tấn công phức tạp, có mức độ nghiêm trọng cao.

Đôi khi, thông tin nhạy cảm có thể bị rò rỉ một cách bất cẩn tới những người dùng chỉ duyệt trang web theo cách thông thường. Tuy nhiên, thông thường hơn, kẻ tấn công cần khơi gợi việc tiết lộ thông tin bằng cách tương tác với trang web theo những cách không mong muốn hoặc độc hại. Sau đó, họ sẽ nghiên cứu cẩn thận các phản hồi của trang web để thử và xác định hành vi thú vị.

# Examples of information disclosure
Một số ví dụ cơ bản về công bố thông tin như sau:

- Tiết lộ tên của các thư mục ẩn, cấu trúc và nội dung của chúng thông qua tệp `robots.txt` hoặc danh sách thư mục
- Cung cấp quyền truy cập vào các tệp mã nguồn thông qua các bản sao lưu tạm thời
- Đề cập rõ ràng đến tên bảng hoặc cột cơ sở dữ liệu trong thông báo lỗi
- Tiết lộ thông tin có độ nhạy cảm cao một cách không cần thiết, chẳng hạn như chi tiết thẻ tín dụng
- Khóa API mã hóa cứng, địa chỉ IP, thông tin xác thực cơ sở dữ liệu, v.v. trong mã nguồn
- Gợi ý sự tồn tại hay vắng mặt của tài nguyên, tên người dùng, v.v. thông qua những khác biệt nhỏ trong hành vi ứng dụng

# How do information disclosure vulnerabilities arise?
Các lỗ hổng tiết lộ thông tin có thể phát sinh theo vô số cách khác nhau, nhưng chúng có thể được phân loại rộng rãi như sau:

- **Không xóa được nội dung nội bộ khỏi nội dung công khai**. Ví dụ: nhận xét của nhà phát triển trong đánh dấu đôi khi được hiển thị cho người dùng trong môi trường sản xuất.
- **Cấu hình không an toàn của trang web và các công nghệ liên quan**. Ví dụ: việc không tắt các tính năng **debug** và gỡ lỗi(**diagnostic**) đôi khi có thể cung cấp cho kẻ tấn công những công cụ hữu ích để giúp chúng lấy được thông tin nhạy cảm. Cấu hình mặc định cũng có thể khiến các trang web dễ bị tấn công, chẳng hạn như bằng cách hiển thị các thông báo lỗi quá chi tiết.
- **Thiết kế và hành vi thiếu sót của ứng dụng**. Ví dụ: nếu một trang web trả về các phản hồi riêng biệt khi xảy ra các trạng thái lỗi khác nhau, điều này cũng có thể cho phép kẻ tấn công liệt kê dữ liệu nhạy cảm, chẳng hạn như thông tin xác thực người dùng hợp lệ.

# Impact
**Information disclosure vulnerabilities** có thể có cả tác động trực tiếp và gián tiếp tùy thuộc vào mục đích của trang web và do đó, kẻ tấn công có thể lấy được thông tin gì. Trong một số trường hợp, chỉ riêng hành động tiết lộ thông tin nhạy cảm cũng có thể có tác động lớn đến các bên bị ảnh hưởng. Ví dụ: một cửa hàng trực tuyến làm rò rỉ thông tin thẻ tín dụng của khách hàng có thể gây ra hậu quả nghiêm trọng.

Mặt khác, việc rò rỉ thông tin kỹ thuật, chẳng hạn như cấu trúc thư mục hoặc khuôn khổ của bên thứ ba nào đang được sử dụng, có thể có ít hoặc không có tác động trực tiếp. Tuy nhiên, nếu rơi vào tay kẻ xấu, đây có thể là thông tin quan trọng cần thiết để thực hiện bất kỳ hoạt động khai thác nào khác. Mức độ nghiêm trọng trong trường hợp này phụ thuộc vào những gì kẻ tấn công có thể làm với thông tin này.

## How to assess the severity of information disclosure vulnerabilities (Cách đánh giá mức độ nghiêm trọng của lỗ hổng tiết lộ thông tin)
Mặc dù tác động cuối cùng có thể rất nghiêm trọng nhưng chỉ trong những trường hợp cụ thể, việc tiết lộ thông tin mới là vấn đề có mức độ nghiêm trọng cao. Trong quá trình thử nghiệm, việc tiết lộ thông tin kỹ thuật nói riêng thường chỉ được quan tâm nếu bạn có thể chứng minh được cách kẻ tấn công có thể làm điều gì đó có hại với thông tin đó.

Ví dụ: thông tin về một trang web đang sử dụng một phiên bản khung cụ thể sẽ bị hạn chế sử dụng nếu phiên bản đó được vá đầy đủ. Tuy nhiên, thông tin này trở nên quan trọng khi trang web đang sử dụng phiên bản cũ có chứa lỗ hổng đã biết. Trong trường hợp này, việc thực hiện một cuộc tấn công tàn khốc có thể đơn giản như áp dụng một cách khai thác được ghi chép công khai.

Điều quan trọng là phải có ý thức chung khi bạn phát hiện ra rằng thông tin nhạy cảm có thể bị rò rỉ. Có thể các chi tiết kỹ thuật nhỏ có thể được phát hiện bằng nhiều cách trên nhiều trang web mà bạn kiểm tra. Do đó, trọng tâm chính của bạn phải là tác động và khả năng khai thác của thông tin bị rò rỉ, chứ không chỉ là sự hiện diện của việc tiết lộ thông tin như một vấn đề độc lập. Ngoại lệ rõ ràng cho trường hợp này là khi thông tin bị rò rỉ quá nhạy cảm đến mức nó cần được chú ý theo đúng nghĩa của nó.

# Testing for information disclosure
Fuzzing và các tool, extension có của Burp pro

# Common sources of information disclosure
## Files for web crawlers
Nhiều trang web cung cấp các tệp tại `/robots.txt` và `/sitemap.xml` để giúp trình thu thập thông tin điều hướng trang web của họ. Trong số những thứ khác, những tệp này thường liệt kê các thư mục cụ thể mà trình thu thập thông tin nên bỏ qua, chẳng hạn vì chúng có thể chứa thông tin nhạy cảm.

## Directory listings
Máy chủ web có thể được cấu hình để tự động liệt kê nội dung của các thư mục không có trang chỉ mục. Điều này có thể hỗ trợ kẻ tấn công bằng cách cho phép chúng nhanh chóng xác định các tài nguyên trên một đường dẫn nhất định và trực tiếp tiến hành phân tích và tấn công các tài nguyên đó. Nó đặc biệt làm tăng khả năng hiển thị các tệp nhạy cảm trong thư mục mà người dùng không thể truy cập được, chẳng hạn như các tệp tạm thời và các kết xuất lỗi.

## Developer comments
Trong quá trình phát triển, các nhận xét HTML nội tuyến đôi khi được thêm vào phần đánh dấu. Những nhận xét này thường bị loại bỏ trước khi các thay đổi được triển khai vào môi trường sản xuất. Tuy nhiên, các nhận xét đôi khi có thể bị quên, bị bỏ sót hoặc thậm chí bị cố ý để lại do ai đó không nhận thức đầy đủ về các tác động bảo mật. Mặc dù những nhận xét này không hiển thị trên trang được hiển thị nhưng chúng có thể dễ dàng được truy cập bằng Burp hoặc thậm chí là các công cụ dành cho nhà phát triển tích hợp trong trình duyệt.

## Error messages
Nội dung của thông báo lỗi có thể tiết lộ thông tin về loại dữ liệu hoặc đầu vào nào được mong đợi từ một tham số nhất định. Điều này có thể giúp bạn thu hẹp cuộc tấn công bằng cách xác định các tham số có thể khai thác được. Nó thậm chí có thể giúp bạn tránh lãng phí thời gian khi cố gắng đưa vào những payload không hiệu quả.

## Debugging data
Thông báo debug đôi khi có thể chứa thông tin quan trọng để phát triển một cuộc tấn công, bao gồm:

- Giá trị của các biến **key session** có thể được thao tác thông qua đầu vào của người dùng
- Tên máy chủ và thông tin xác thực cho các thành phần phụ trợ
- Tên tập tin và thư mục trên máy chủ
- Các key được sử dụng để mã hóa dữ liệu được truyền qua máy khách

Thông báo debug đôi khi **có thể được ghi vào một tệp riêng biệt**. Nếu kẻ tấn công có thể truy cập vào tệp này, nó có thể đóng vai trò là tài liệu tham khảo hữu ích để hiểu trạng thái thời gian chạy của ứng dụng. Nó cũng có thể cung cấp một số manh mối về cách họ có thể cung cấp đầu vào thủ công để thao tác trạng thái ứng dụng và kiểm soát thông tin nhận được.

## Source code disclosure via backup files
Đôi khi, thậm chí có thể khiến trang web bị lộ mã nguồn của chính nó. Khi lập sơ đồ một trang web, bạn có thể thấy rằng một số tệp mã nguồn được tham chiếu rõ ràng. Thật không may, việc yêu cầu chúng thường không tiết lộ mã. Khi máy chủ xử lý các tệp có phần mở rộng cụ thể, chẳng hạn như `.php`, nó thường sẽ thực thi mã, thay vì chỉ gửi mã đó đến máy khách dưới dạng văn bản. Tuy nhiên, trong một số trường hợp, bạn có thể lừa một trang web trả lại nội dung của tệp. Ví dụ: trình soạn thảo văn bản thường tạo các tệp sao lưu tạm thời trong khi tệp gốc đang được chỉnh sửa. Các tệp tạm thời này thường được biểu thị theo một cách nào đó, chẳng hạn như bằng cách thêm dấu ngã `~` vào tên tệp hoặc thêm phần mở rộng tệp khác. Việc yêu cầu tệp mã bằng phần mở rộng tệp sao lưu đôi khi có thể cho phép bạn đọc nội dung của tệp trong phản hồi.

## Information disclosure due to insecure configuration
Nhà phát triển có thể quên tắt các tùy chọn gỡ lỗi khác nhau trong môi trường sản xuất. Ví dụ: phương pháp HTTP `TRACE` được thiết kế cho mục đích chẩn đoán. Nếu được bật, máy chủ web sẽ phản hồi các yêu cầu sử dụng phương pháp `TRACE` bằng cách lặp lại phản hồi chính xác yêu cầu đã nhận được. Hành vi này thường vô hại nhưng đôi khi dẫn đến tiết lộ thông tin, chẳng hạn như tên của header xác thực nội bộ có thể được thêm vào yêu cầu của proxy ngược.

## Version control history
Hầu như tất cả các trang web đều được phát triển bằng cách sử dụng một số dạng hệ thống kiểm soát phiên bản, chẳng hạn như Git. Theo mặc định, dự án Git lưu trữ tất cả dữ liệu kiểm soát phiên bản của nó trong thư mục có tên `.git`. Đôi khi, các trang web hiển thị thư mục này trong môi trường sản xuất. Trong trường hợp này, bạn có thể truy cập nó bằng cách duyệt đến `/.git`.

# How to prevent information disclosure vulnerabilities
Việc ngăn chặn hoàn toàn việc tiết lộ thông tin là một việc khó khăn do có rất nhiều cách có thể xảy ra. Tuy nhiên, có một số phương pháp chung tốt nhất mà bạn có thể làm theo để giảm thiểu nguy cơ các loại lỗ hổng này xâm nhập vào trang web của riêng bạn.

- Đảm bảo rằng mọi người tham gia dev web đều nhận thức đầy đủ về thông tin nào được coi là nhạy cảm. Đôi khi những thông tin tưởng chừng như vô hại lại có thể hữu ích với kẻ tấn công hơn nhiều so với những gì mọi người nhận ra. Việc nêu bật những mối nguy hiểm này có thể giúp đảm bảo rằng thông tin nhạy cảm nói chung được tổ chức của bạn xử lý an toàn hơn.
- Audit code để biết khả năng tiết lộ thông tin như một phần của quy trình xây dựng hoặc QA của bạn. Việc tự động hóa một số tác vụ liên quan sẽ tương đối dễ dàng, chẳng hạn như loại bỏ nhận xét của nhà phát triển.
- Sử dụng thông báo debug chung chung càng nhiều càng tốt. Đừng cung cấp cho kẻ tấn công manh mối về hành vi ứng dụng một cách không cần thiết.
- Kiểm tra kỹ xem mọi tính năng gỡ lỗi hoặc chẩn đoán có bị tắt trong môi trường sản xuất hay không.
- Đảm bảo bạn hiểu đầy đủ các cài đặt cấu hình và ý nghĩa bảo mật của bất kỳ công nghệ bên thứ ba nào mà bạn triển khai. Dành thời gian để điều tra và tắt mọi tính năng và cài đặt mà bạn không thực sự cần.


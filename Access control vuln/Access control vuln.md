<h1>
    BROKEN AUTHENTICATION   
</h1>

![image](https://github.com/user-attachments/assets/4bd8ec2f-8349-436b-a6ed-75731504c1f8)

<h2>
    Table of Contents:
    
    What is access control?
    Vertical privilege escalation
    Horizontal privilege escalation
    Horizontal to vertical privilege escalation
    Insecure direct object references (IDOR)
    Vulnerabilities in multi-step processes
    Vulnerabilities in Referer-based controls
    Vulnerabilities in location-based controls
    Preventing
    
</h2>

# What is access control?
Kiểm soát truy cập là việc áp dụng các ràng buộc về ai hoặc cái gì được ủy quyền để thực hiện các hành động hoặc truy cập tài nguyên. Trong ngữ cảnh của ứng dụng web, kiểm soát truy cập phụ thuộc vào **xác thực** và **quản lý phiên**:

- **Xác thực (Authentication)** xác nhận rằng người dùng chính là ai.
- **Quản lý phiên (Session Management)** xác định những yêu cầu HTTP tiếp theo nào đang được thực hiện bởi cùng một người dùng.
- **Kiểm soát truy cập (Access Control)** xác định xem người dùng có được phép thực hiện hành động mà họ đang cố gắng thực hiện hay không.

## Access control security models
Nhiều mô hình bảo mật kiểm soát truy cập khác nhau đã được phát minh trong nhiều năm qua để phù hợp với các chính sách kiểm soát truy cập với các quy tắc và thay đổi về công nghệ của doanh nghiệp hoặc tổ chức.

Có 4 mô hình chính:
### Programmatic access control
Một ma trận đặc quyền của người dùng được lưu trữ trong db hoặc các db tương tự và các biện pháp kiểm soát quyền truy cập được áp dụng theo chương trình có tham chiếu đến ma trận này. Cách tiếp cận kiểm soát truy cập này có thể bao gồm vai trò hoặc nhóm hoặc người dùng cá nhân, bộ sưu tập hoặc quy trình làm việc của các quy trình và có thể rất chi tiết.

### Discretionary access control (DAC)
Với kiểm soát truy cập tùy ý, quyền truy cập vào tài nguyên hoặc chức năng bị hạn chế dựa trên người dùng hoặc nhóm người dùng được đặt tên. Chủ sở hữu tài nguyên hoặc chức năng có khả năng chỉ định hoặc ủy quyền truy cập cho người dùng. Mô hình này rất chi tiết với các quyền truy cập được xác định cho một tài nguyên hoặc chức năng và người dùng riêng lẻ. Do đó, mô hình có thể trở nên rất phức tạp để thiết kế và quản lý.

### Mandatory access control (MAC)
Là một hệ thống kiểm soát truy cập được kiểm soát tập trung, trong đó quyền truy cập vào một số đối tượng (tệp hoặc tài nguyên khác) của một chủ thể bị hạn chế. Điều đáng chú ý là, không giống như DAC, người dùng và chủ sở hữu tài nguyên không có khả năng ủy quyền hoặc sửa đổi quyền truy cập đối với tài nguyên của họ. Mô hình này thường được kết hợp với các hệ thống dựa trên giải phóng mặt bằng quân sự.

### Role-based access control (RBAC)
Các vai trò được đặt tên sẽ được xác định để gán đặc quyền truy cập. Người dùng sau đó được gán cho một hoặc nhiều vai trò. RBAC cung cấp khả năng quản lý nâng cao so với các mô hình kiểm soát truy cập khác và nếu được thiết kế phù hợp thì đủ chi tiết để cung cấp khả năng kiểm soát truy cập có thể quản lý được trong các ứng dụng phức tạp. Ví dụ: nhân viên mua hàng có thể được xác định là một vai trò có quyền truy cập vào một tập hợp con các tài nguyên và chức năng của sổ cái mua hàng. Khi nhân viên rời khỏi hoặc gia nhập một tổ chức thì việc quản lý kiểm soát truy cập sẽ được đơn giản hóa để xác định hoặc thu hồi tư cách thành viên của vai trò nhân viên mua hàng.

RBAC **hiệu quả nhất** khi có đủ vai trò để gọi các biện pháp kiểm soát truy cập một cách chính xác nhưng không quá nhiều đến mức khiến mô hình trở nên quá phức tạp và khó quản lý.

## Vertical access controls
Kiểm soát truy cập theo chiều dọc là các cơ chế hạn chế quyền truy cập vào chức năng nhạy cảm đối với những loại người dùng cụ thể.

Với các biện pháp kiểm soát truy cập theo chiều dọc, các loại người dùng khác nhau có quyền truy cập vào các chức năng ứng dụng khác nhau. Ví dụ: quản trị viên có thể sửa đổi hoặc xóa bất kỳ tài khoản nào của người dùng, trong khi người dùng thông thường không có quyền truy cập vào các hành động này. Kiểm soát truy cập theo chiều dọc có thể là cách triển khai chi tiết hơn các mô hình bảo mật được thiết kế để thực thi các chính sách kinh doanh như phân chia nhiệm vụ và đặc quyền tối thiểu.

## Horizontal access controls
Kiểm soát truy cập theo chiều ngang là các cơ chế hạn chế quyền truy cập vào tài nguyên đối với những người dùng cụ thể.

Với các điều khiển truy cập theo chiều ngang, những người dùng khác nhau có quyền truy cập vào một tập hợp con các tài nguyên cùng loại. Ví dụ: một ứng dụng ngân hàng sẽ cho phép người dùng xem các giao dịch và thực hiện thanh toán từ tài khoản của chính họ chứ không phải tài khoản của bất kỳ người dùng nào khác.

## Context-dependent access controls
Kiểm soát truy cập phụ thuộc vào ngữ cảnh hạn chế quyền truy cập vào chức năng và tài nguyên dựa trên trạng thái của ứng dụng hoặc sự tương tác của người dùng với nó.

Kiểm soát truy cập phụ thuộc vào ngữ cảnh ngăn người dùng thực hiện các hành động không đúng thứ tự. Ví dụ: một trang web bán lẻ có thể ngăn người dùng sửa đổi nội dung giỏ hàng của họ sau khi họ đã thanh toán.

# Vertical privilege escalation
Nếu người dùng có thể có quyền truy cập vào chức năng mà họ không được phép truy cập thì đây là leo thang đặc quyền theo chiều dọc. 

## Unprotected functionality
Ở mức cơ bản nhất, việc leo thang đặc quyền theo chiều dọc phát sinh khi ứng dụng không thực thi bất kỳ biện pháp bảo vệ nào đối với chức năng nhạy cảm. Ví dụ: các chức năng quản trị có thể được liên kết từ trang chào mừng của quản trị viên nhưng không được liên kết từ trang chào mừng của người dùng. Tuy nhiên, người dùng có thể truy cập các chức năng quản trị bằng cách duyệt đến URL quản trị viên có liên quan.

`https://insecure-website.com/admin`

## Parameter-based access control methods
Một số ứng dụng xác định quyền truy cập hoặc vai trò của người dùng khi đăng nhập, sau đó lưu trữ thông tin này ở vị trí do người dùng kiểm soát. Đây có thể là:
- A hidden field.
- A cookie.
- Tham số chuỗi truy vấn đặt trước
```
https://insecure-website.com/login/home.jsp?admin=true
https://insecure-website.com/login/home.jsp?role=1
```

## Broken access control resulting from platform misconfiguration
Một số ứng dụng thực thi các biện pháp kiểm soát truy cập ở lớp nền tảng. họ thực hiện điều này bằng cách hạn chế quyền truy cập vào các URL và phương thức HTTP cụ thể dựa trên vai trò của người dùng. Ví dụ: một ứng dụng có thể định cấu hình quy tắc như sau:

`DENY: POST, /admin/deleteUser, managers`

Quy tắc này từ chối quyền truy cập vào phương thức POST trên URL `/admin/deleteUser` đối với người dùng trong nhóm người quản lý. Nhiều thứ có thể xảy ra sai sót trong tình huống này, dẫn đến việc bỏ qua kiểm soát truy cập.

Một số khung ứng dụng hỗ trợ nhiều tiêu đề HTTP không chuẩn khác nhau có thể được sử dụng để ghi đè URL trong yêu cầu ban đầu, chẳng hạn như `X-Original-URL` và `X-Rewrite-URL`. Nếu một trang web sử dụng các biện pháp kiểm soát giao diện người dùng nghiêm ngặt để hạn chế quyền truy cập dựa trên URL nhưng ứng dụng cho phép ghi đè URL thông qua tiêu đề yêu cầu thì có thể bỏ qua các biện pháp kiểm soát truy cập bằng cách sử dụng một yêu cầu như sau:

```
POST / HTTP/1.1
X-Original-URL: /admin/deleteUser
```

Một cuộc tấn công thay thế liên quan đến phương thức HTTP được sử dụng trong **REQUEST**. Các điều khiển giao diện người dùng được mô tả trong các phần trước hạn chế quyền truy cập dựa trên phương thức URL và HTTP. Một số trang web chấp nhận các phương thức yêu cầu HTTP khác nhau khi thực hiện một hành động. Nếu kẻ tấn công có thể sử dụng phương thức **GET (hoặc phương thức khác)** để thực hiện các hành động trên một URL bị hạn chế, chúng có thể bỏ qua kiểm soát truy cập được triển khai ở lớp nền tảng.

## Broken access control resulting from URL-matching discrepancies
Các trang web có thể khác nhau về mức độ phù hợp nghiêm ngặt với đường dẫn của yêu cầu gửi đến **endpoint** được xác định. Ví dụ: họ có thể chấp nhận cách viết hoa không nhất quán, do đó yêu cầu tới `/ADMIN/DELETEUSER` vẫn có thể được ánh xạ tới **endpoint** `/admin/deleteUser`. Nếu cơ chế kiểm soát truy cập kém khả năng chấp nhận hơn thì nó có thể coi đây là hai **endpoint** khác nhau và kết quả là không thực thi được các hạn chế chính xác.

Sự khác biệt tương tự có thể phát sinh nếu các nhà phát triển sử dụng framework Spring đã bật tùy chọn `useSuffixPatternMatch`. Điều này cho phép các đường dẫn có phần mở rộng tệp tùy ý được ánh xạ tới **endpoint** tương đương không có phần mở rộng tệp. Nói cách khác, yêu cầu tới `/admin/deleteUser.anything` vẫn khớp với `/admin/deleteUser` Trước **Spring 5.3**, tùy chọn này được **bật theo mặc định**.

Trên các hệ thống khác, bạn có thể gặp phải sự khác biệt về việc liệu `/admin/deleteUser` và `/admin/deleteUser/` có được coi là endpoint riêng biệt hay không. Trong trường hợp này, bạn có thể bỏ qua các biện pháp kiểm soát quyền truy cập bằng cách **thêm dấu gạch chéo** vào cuối đường dẫn.

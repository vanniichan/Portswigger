# Target Goal: 

This lab has a stock check feature which fetches data from an internal system.

To solve the lab, change the stock check URL to access the admin interface at `http://localhost/admin` and delete the user `carlos`.

The developer has deployed two weak anti-SSRF defenses that you will need to bypass.

# Recon: 

Như mô tả, trang web có 1 tính năng check stock. Và nó hoạt động bằng cách sử dụng 1 api gọi về để lấy kết quả mà ta truy vấn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/922eba7c-f26c-4b76-81cc-67bfc7fe40c8)

Từ đây, ta có thể tận dụng SSRF gọi ngược về `localhost` để gọi vào trang admin. Tuy nhiên lần này server áp blacklist một số chuỗi như localhost, 127.0.0.1,… :

![image](https://github.com/vanniichan/Portswigger/assets/112863484/394f40ee-6930-44aa-a5bf-016a4ed87baa)

Nhưng do filter yếu nên ta có thể bypass bằng `http://127.1`:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/86a414be-894d-4912-b276-3b1b1d811329)

Tiếp `http://127.1/admin` thì nó đã bị filter `admin` nên có phải thử 1 số cách đều được đó là:
  + thay đổi `admin` thành `aDmin`
  + ecode `admin` ví dụ như 2 là encode Url,... --> `%25%36%31%25%36%34%25%36%64%25%36%39%25%36%65`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/655386c8-c5f0-4685-884c-3b68dc9b93c3)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5a160451-4389-4247-813c-b0e5bd763d99)

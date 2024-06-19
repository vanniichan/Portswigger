# Target Goal: 

This lab has a stock check feature which fetches data from an internal system.

To solve the lab, change the stock check URL to access the admin interface at `http://localhost/admin` and delete the user `carlos`.

The developer has deployed an anti-SSRF defense you will need to bypass.

# Analysis : 

Như mô tả, trang web có 1 tính năng check stock. Và nó hoạt động bằng cách sử dụng 1 api gọi về để lấy kết quả mà ta truy vấn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cbe49b69-1fbe-4159-adbc-3feffee1cfda)

Từ đây, ta có thể tận dụng SSRF gọi ngược về `localhost` để gọi vào trang admin. Tuy nhiên lần này server áp whitelist chỉ cho `http://stock.weliketoshop.net` mới có thể truy cập vào :

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d7bf6cbf-0da2-4af2-b417-2945e0ee89cd)

Trong URL, có 1 cách mà url chấp nhận path đó nữa đó chính là `https://expected-host:fakepassword@evil-host`. [Tham khảo](https://portswigger.net/web-security/ssrf#ssrf-with-whitelist-based-input-filters):

![image](https://github.com/vanniichan/Portswigger/assets/112863484/034daa19-7aa4-4ae5-8894-86e06914fb53)

Tuy nhiên khi thêm `#` vào thì nó sẽ không nhận nữa. Lý do tùy vào từng ngôn ngữ mà server sử dụng. Ở đây, server đã hiểu rằng:

```
http://localhost#@stock.weliketoshop.net

--> với http//localhost chính là url
@stock.weliketoshop.net là chỉ mục được trỏ đến thông qua #
```

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cd302f8e-c726-442a-b625-b799d596539a)

Ta sẽ bypass bằng cách **encode 2 lần url** của `#` --> `%2523`:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a18f1e68-6638-4217-9605-11d86af1699d)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/944fa33c-a200-426c-b165-bf9157da3fb1)

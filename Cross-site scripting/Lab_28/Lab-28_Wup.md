# Target Goal: 

This lab reflects your input in a JavaScript URL, but all is not as it seems. This initially seems like a trivial challenge; however, the application is blocking some characters in an attempt to prevent XSS attacks.

To solve the lab, perform a cross-site scripting attack that calls the alert function with the string 1337 contained somewhere in the alert message.

# Recon: 

Bài này payload khá nhức đầu nên lấy luôn solution rồi phân tích tại sao lại có cái đấy

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0f9c527c-1af8-4fef-acc8-e571cf409ce4)

- Đầu tiên là phân tích `throw/**/onerror=alert,1337`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/00611a49-1f49-4f0c-a549-fdcdaaa22805)

`throw` là hàm sẽ ném ra ngoại lệ như là 1 lỗi và ta sẽ lợi dụng nó để gọi được 1337. Và hàm này sẽ chỉ ném ra biểu thức cuối cùng và vẫn xử lí các biểu thức đầu. Ví dụ như minh họa dưới. Nó sẽ ném ngoại lệ 1337 và trigger event onerror. Vì `onerror` cũng là attribute ném ra lỗi + `alert()` nên 1337 sẽ được cho thông báo trong `onerror` với `alert`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/14d63d1a-c15d-4b8e-b771-93a606a4d2a7) 

Nó sẽ trả về như này:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/766a2493-326f-4507-b8ef-bcffab13fad5)

- Tiếp theo là `=> function` và `toString`

Thông thường hàm x được định nghĩa như sau:
```
let x = () => {

throw onerror=alert,1337

}

x();
```

Tuy nhiên vì bị filter `()` nên ta sẽ gọi x=x tức là nó vân định nghĩa được đó là hàm x. Do đó làm thế nào để trigger `x();` thì đó là lúc ta dùng đến toString:
```
let x = () => {
throw onerror=alert,1337
}

toString=x;
toString();
```
- Vậy làm như nào để gọi hàm `toString()`? vì nó cũng dính vào `()` -> window + ''

window + '' nói chung sẽ thanh thế để gọi x 

- Tiếp theo là tiến hành inject

![image](https://github.com/vanniichan/Portswigger/assets/112863484/01c36f77-8dfd-462c-98ac-49ad5808e77d)

Như vậy ta phải inject thêm tham số vào hàm `fetch()`, đầu tiên sử dụng `&` để nối tiếp biến và nó sẽ không phá vỡ cấu trúc của trang, sử dụng `'` để kết thúc phần `method và body`. Ta sẽ dùng `}`để kết thúc và sau đó dùng `,` để tiếp tục truyền thêm tham số vào

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5c33b488-4cda-4e27-9dca-4157d862eb1a)

Lý do `throw/**/onerror=alert,1337` có `/**/` là vì nó không thể để khoảng trống trong URL

- Sau khi truyền các tham số vào ta phải kết thúc inject

Bằng cách sử dụng `{x:'` để kết thúc 

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ecce665a-0567-4b86-a92b-76cdadf2a567)

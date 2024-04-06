# Target

This lab is vulnerable due to a logic flaw in its password brute-force protection. To solve the lab, brute-force the victim's password, then log in and access their account page.

# Recon

**Bài này đã bị chặn ip sau mỗi lần đăng nhập sai nhưng lại mở block sau mỗi lần đăng nhập thành công**

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e6ff9f39-9874-4888-aae5-ab6b8576b702)

Sau 3 lần thử sẽ bị block 1 phút, sau đó login thành công thì nó sẽ reset số lần, từ đó ta có một cách đó là sử dụng brtue-force với điều kiện, cứ 2 lần thử sẽ cho 1 lần thành công

![image](https://github.com/vanniichan/Portswigger/assets/112863484/660c8f28-5325-4624-89a5-7e08b0810344)

Chúng ta sẽ dùng `Pitchfork` và dùng [payload]() sử dụng ở trên

![image](https://github.com/vanniichan/Portswigger/assets/112863484/d0bce7ba-1e4a-418f-a13e-57e101d3db55)

Khi brute-force nó sẽ dồn nhiều payload vào 1 request nhất có thể nên sẽ khiến cho vấn đề này xảy ra

![image](https://github.com/vanniichan/Portswigger/assets/112863484/7776f2ad-ae56-4343-bcc5-584e9f4b0eb8)

Vì vậy chúng ta sẽ set lại cho 1 request 1 lần và nó sẽ xử lí chậm hơn( tức là đúng :) )

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8c0fce07-cfc2-4b34-a482-919704f3000a)

Kết quả sau cùng `carlos:cheese`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/75e9f2ec-69bb-4706-b046-a988b78a05bb)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b963f7fa-fbff-4104-b392-edeb8397dc61)

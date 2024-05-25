# Target Goal: 

This lab uses a serialization-based session mechanism and is vulnerable to arbitrary object injection as a result. To solve the lab, create and inject a malicious serialized object to delete the `morale.txt` file from Carlos's home directory. You will need to obtain source code access to solve this lab.

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/97c9aa2d-8baa-446c-9705-cd9fa67a36c1)

Thử đem đi dcode sang b64 và nhận được như sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/abc9446a-e3b4-4d4f-892e-1632085b2f0e)

Mở `Site-map` ta thấy có một path ẩn và có vẻ như đã bị anh dev xóa nội dung:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/01c9d912-a4fb-409d-9697-d7f1fcbb730f)

1 số trang web đặt tên backup hoặc copy của 1 file trong môi trường test bằng cách thêm vào đuôi `~` từ đó ta lấy được src code:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/73b5c131-504a-4fac-b83b-6f3adc50e026)

Bỏ vào vscode đọc cho dễ, ở đây ta có 1 sink [unlink()](https://www.php.net/manual/en/function.unlink.php) cũng chính là hàm ta có thể tận dụng để xóa file với `lock_file_path` có thể thao túng được nó

![image](https://github.com/vanniichan/Portswigger/assets/112863484/5f02905f-a045-403a-a69a-072a28776490)

1 lưu ý nữa ngoài được định dạng có thể bằng binary thì nó có thể serialize dưới dạng giống nhau khác với serialize của ngôn ngữ java 

Để xóa đi `morale.txt` ta có payload:

```
O:14:"CustomTemplate":1:{s:14:"lock_file_path";s:23:"/home/carlos/morale.txt";}

//Khởi tạo 1 class trong CustomTemplate có 1 object 
//Tạo 1 thuộc tính lock_file_path với value /home/carlos/morale.txt
```

![image](https://github.com/vanniichan/Portswigger/assets/112863484/13cb1224-f335-4dca-bc7a-92d5c805aa30)

Thay value apply lại web, mặc dù xảy ra lỗi nhưng nó vẫn solved bởi vì class vẫn được gọi và sink vẫn được involke để xóa đi /home/carlos/morale.txt

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8c682367-0b09-4283-b389-bea9576d6e1b)

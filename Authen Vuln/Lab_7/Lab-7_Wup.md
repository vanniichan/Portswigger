# Target

This lab is vulnerable to username enumeration. It uses account locking, but this contains a logic flaw. To solve the lab, enumerate a valid username, brute-force this user's password, then access their account page.

# Recon

Bài lab này nó sẽ check username, nếu username sai thì nó sẽ trả luôn `Invalid username or password.` nhưng nếu đúng nó vẫn sẽ trả về thế tuy nhiên có một lỗi xảy là sau 1 số lần nhập nó sẽ lock acc

![image](https://github.com/vanniichan/Portswigger/assets/112863484/94a7f606-97fc-4534-a98e-8c0a59e830ac)

Lợi dụng việc này ta brute-force để tìm được username đúng. Sử dụng phương thức `Cluster-bomb` và mục tiêu tìm username nên sẽ để password = `null`. Với payload null = 5 để test thử luôn số lần nó lock 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/48ad3fd0-d2a7-43f8-b3f0-75b716d9bb83)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/680a70fd-f843-4956-931e-d4edc55d087c)

Vậy username = `info` từ đây brute-force password. Và nó respond ra tận 4 cái. Vì cái này lỗi logic nên nó không chuyển trang được. Có thể là do dính logic phải nhập lại 2 lần thì mới login dc :))))

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3520769c-82a4-45bf-8939-d0e550e1ee24)

pass: `tigger` là cái gây ra lỗi này lạ nhất

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8fe2b477-630b-4b76-b5f9-50024c2d4e38)

`info:tigger`

# Flag:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/e9d69fe0-bc51-4b09-9ccc-6b30a63c3833)



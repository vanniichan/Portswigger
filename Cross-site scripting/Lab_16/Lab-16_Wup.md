# Target Goal: 

This lab has a simple reflected XSS vulnerability. The site is blocking common tags but misses some SVG tags and events.

To solve the lab, perform a cross-site scripting attack that calls the alert() function.

# Recon: 

Bài lab này bị gọi là filter và có thể sử dụng `svg` `animatetransform` `title` và `image`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/358fc249-20a4-4af7-8549-7231b088df9d)

Như yêu cầu bài lab ta có thể sử dụng <[svg](https://www.w3schools.com/html/html5_svg.asp)> và animatetransform vì 2 thẻ này phải đi với nhau. Tuy nhiên vẫn cần 1 thẻ event. Do đó phải brute-force 1 lần nữa

![image](https://github.com/vanniichan/Portswigger/assets/112863484/f7d274dc-91ca-456d-9a3d-d09ad420fcd1)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/27520693-8de4-4f99-b775-ce469b4e3f7e)


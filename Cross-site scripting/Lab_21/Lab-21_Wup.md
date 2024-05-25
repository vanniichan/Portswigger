# Target Goal: 

This lab contains a reflected cross-site scripting vulnerability in the search blog functionality. The reflection occurs inside a template string with angle brackets, single, and double quotes HTML encoded, and backticks escaped. To solve this lab, perform a cross-site scripting attack that calls the alert function inside the template string.

# Recon: 

Bài lab này được xử lý input trong dấu \` . Tham khảo trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) và [Portswigger](https://portswigger.net/web-security/cross-site-scripting/contexts) ta có thể chèn thêm `${js}` mà không cần phải thoát khỏi ` này

![image](https://github.com/vanniichan/Portswigger/assets/112863484/64a382cb-6483-4b72-9805-d659908d817e)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ee5a70b7-cc27-490b-94d7-4297dfc76e60)

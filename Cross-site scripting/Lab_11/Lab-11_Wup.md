# Target Goal: 

To solve this lab, perform a cross-site scripting attack that executes an AngularJS expression and calls the alert function

# Recon: 

Chèn thử payload và thấy đựa nó đã bị encode HTML 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/2803d4e9-c2bc-47a0-96c6-78a88e64a7dc)

Lý do là [angularJS với ng-app khiến string có các char bị encode](https://www.w3schools.com/angular/ng_ng-app.asp) điền `{{ }}` thì mã js được chạy

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4b2109ad-1b28-4cab-98fe-b186cd157c8c)

Payload để chạy được mã js `{{$on.constructor('alert(1)')()}}` [Tìm hiểu thêm về $on](https://stackoverflow.com/questions/28800426/what-is-on-in-angularjs)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8a3b6927-144d-4786-b07b-dca7210ca560)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/4ab9e7c9-21b6-4c93-8f7b-7f505f3f04e1)

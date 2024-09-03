# Exploiting XXE using external entities to retrieve files
## Target Goal
This lab has a "Check stock" feature that parses XML input and returns any unexpected values in the response.

To solve the lab, inject an XML external entity to retrieve the contents of the `/etc/passwd` file.
## Analysis
Đối với mục tiêu của bài lab, ta sẽ tấn công vào tính năng `Check stock`

![image](https://github.com/user-attachments/assets/b78234a8-4685-4c7a-bd45-573ca48831cc)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/2f02c79f-4c4c-4c77-974c-95ec85683fe2)

Ta sẽ tiến hành inject payload vào value `<productId>` trước và thành công, hoàn thành bài lab

![image](https://github.com/user-attachments/assets/932daba2-5a0d-4ca5-94df-cb5984c8b007)

## Flag

![image](https://github.com/user-attachments/assets/7614e190-3c79-4828-921d-9067972ef398)

# Exploiting XXE to perform SSRF attacks
## Target Goal
This lab has a "Check stock" feature that parses XML input and returns any unexpected values in the response.

The lab server is running a (simulated) EC2 metadata endpoint at the default URL, which is `http://169.254.169.254/`. This endpoint can be used to retrieve data about the instance, some of which might be sensitive.

To solve the lab, exploit the XXE vulnerability to perform an SSRF attack that obtains the server's IAM secret access key from the EC2 metadata endpoint.
## Analysis
Như mô tả, ta sẽ tiếp tục tấn công vào tính năng `Check stock` của con web này

![image](https://github.com/user-attachments/assets/e870800a-f2d9-45ba-8edb-234cde89ffbe)

Sử dụng Burp để xem nội dung gói tin 

![image](https://github.com/user-attachments/assets/43278cc8-e2a0-4570-a45d-eecb2357a9b7)

Ta sẽ tiến hành inject payload sau vào value `<productId>` với ip nội bộ của server này đã được tiết lộ là `http://169.254.169.254/`
```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://169.254.169.254/"> ]>
```
![image](https://github.com/user-attachments/assets/000f8639-5643-473c-8c36-119a4a3b0b42)

Ở phía endpoint có đường dẫn tới `/latest`. Do đó chúng ta tiếp tục payload thành:
```
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "http://169.254.169.254/latest"> ]>
```
![image](https://github.com/user-attachments/assets/6f9876c2-cdc8-496d-bb49-45afa6340bb6)

Tương tự ta tiếp tục truy cập vào `/meta-data`

![image](https://github.com/user-attachments/assets/4e2c9c20-2328-4ec3-a74b-4f8fe89c7c4e)

Tiếp tục và ta lấy được IAM secret access key tại đường dẫn hoàn chỉnh `/latest/meta-data/iam/security-credentials/admin`

![image](https://github.com/user-attachments/assets/077a5d27-0c93-41a4-a788-08bd03edb0e7)

## Flag

![image](https://github.com/user-attachments/assets/6b4bbf25-428d-4cde-b784-6a628c02147b)


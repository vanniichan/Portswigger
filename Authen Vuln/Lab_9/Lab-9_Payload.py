import hashlib
import base64

def hash_password_md5(password):
    # Sử dụng thuật toán MD5 để mã hóa mật khẩu
    hashed_password = hashlib.md5(password.encode()).hexdigest()
    return hashed_password

# Đường dẫn tới file chứa danh sách mật khẩu
file_path = "passwords.txt"

# Mở file và đọc danh sách mật khẩu
with open(file_path, "r") as file:
    passwords = file.readlines()

# Lặp qua từng mật khẩu, mã hóa và in ra giá trị hash tương ứng
for password in passwords:
    password = password.strip()  # Loại bỏ các khoảng trắng và ký tự xuống dòng thừa
    hashed_password_md5 = hash_password_md5(password)
    
    # Mã hóa chuỗi "carlos:{hashed_password_md5}" sang base64
    encoded_string = base64.b64encode(f"carlos:{hashed_password_md5}".encode()).decode()
    
    print(encoded_string)

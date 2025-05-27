# 📧 Hướng dẫn Setup EmailJS - Miễn phí

## Bước 1: Tạo tài khoản EmailJS

1. Truy cập: https://www.emailjs.com/
2. Nhấn **"Sign Up"** và tạo tài khoản miễn phí
3. Xác nhận email của bạn

## Bước 2: Kết nối Email Service

1. Vào **Dashboard** → **Email Services**
2. Nhấn **"Add New Service"**
3. Chọn **Gmail** (khuyến nghị)
4. Nhấn **"Connect Account"** và đăng nhập Gmail của bạn
5. Copy **Service ID** (dạng: `service_xxxxxxx`)

## Bước 3: Tạo Email Template

1. Vào **Email Templates**
2. Nhấn **"Create New Template"**
3. Thiết lập template:

### Template Settings:
```
Template Name: Contact Form
Template ID: (tự động tạo, copy lại)
```

### Template Content:
**Subject:** `{{subject}} - Tin nhắn từ {{from_name}}`

**Content:**
```html
Bạn có tin nhắn mới từ website:

Từ: {{from_name}}
Email: {{from_email}}
Chủ đề: {{subject}}

Nội dung:
{{message}}

---
Tin nhắn này được gửi từ form liên hệ trên website của bạn.
```

4. Nhấn **"Save"** và copy **Template ID**

## Bước 4: Lấy Public Key

1. Vào **Account** → **General**
2. Copy **Public Key** (dạng: `user_xxxxxxxxxxxxxxxx`)

## Bước 5: Cập nhật code

Mở file `script.js` và thay thế:

```javascript
// Dòng 225: Thay YOUR_PUBLIC_KEY
publicKey: "YOUR_PUBLIC_KEY",  // → publicKey: "user_xxxxxxxxxxxxxxxx",

// Dòng 253: Thay YOUR_SERVICE_ID và YOUR_TEMPLATE_ID  
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// → emailjs.send('service_xxxxxxx', 'template_xxxxxxx', templateParams)
```

## Bước 6: Test thử

1. Mở website và thử gửi form
2. Kiểm tra email `tuangato147@gmail.com`
3. Nếu không nhận được, kiểm tra **Spam folder**

## 📊 Giới hạn miễn phí:
- **200 email/tháng** (đủ dùng cho website cá nhân)
- Không giới hạn số template
- Hỗ trợ Gmail, Outlook, Yahoo...

## 🔧 Troubleshooting:

### Lỗi thường gặp:
1. **Public Key sai** → Kiểm tra lại Public Key
2. **Service ID sai** → Kiểm tra Service ID
3. **Template ID sai** → Kiểm tra Template ID
4. **Email vào Spam** → Thêm EmailJS vào whitelist

### Debug:
Mở **Developer Tools** (F12) → **Console** để xem lỗi chi tiết.

---
**Lưu ý:** Sau khi setup xong, xóa file này để bảo mật!

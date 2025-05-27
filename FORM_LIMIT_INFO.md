## Giới hạn Form Liên Hệ

Để tiết kiệm tài nguyên và tránh lạm dụng form liên hệ, tôi đã áp dụng các giới hạn sau:

### 1. Giới hạn cho mỗi người dùng
- Mỗi máy tính chỉ có thể gửi **1 email mỗi 24 giờ**
- Sử dụng localStorage để theo dõi thời gian gửi email cuối cùng
- Hiển thị thời gian còn lại nếu người dùng cố gắng gửi nhiều hơn

### 2. Lý do cho giới hạn
- EmailJS miễn phí chỉ có **200 requests/tháng**
- Giả sử 1 người dùng duy nhất có thể dùng hết quota trong vài ngày
- Ưu tiên những người thực sự cần liên hệ

### 3. Cách hoạt động
```javascript
// Kiểm tra giới hạn trước khi gửi form
if (localStorage.getItem('lastEmailSent')) {
    const lastSent = parseInt(localStorage.getItem('lastEmailSent'));
    const now = Date.now();
    const hoursPassed = (now - lastSent) / (1000 * 60 * 60);
    
    if (hoursPassed < 24) {
        const hoursRemaining = Math.ceil(24 - hoursPassed);
        showNotification(`Để tiết kiệm tài nguyên, mỗi máy chỉ có thể gửi 1 tin nhắn mỗi 24 giờ. Vui lòng thử lại sau ${hoursRemaining} giờ nữa.`, 'error');
        return;
    }
}

// Lưu thời gian gửi email thành công
localStorage.setItem('lastEmailSent', Date.now());
```

### 4. Thông báo hiển thị
- Thông báo thành công: "Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi trong thời gian sớm nhất."
- Thông báo giới hạn: "Để tiết kiệm tài nguyên, mỗi máy chỉ có thể gửi 1 tin nhắn mỗi 24 giờ. Vui lòng thử lại sau X giờ nữa."

### 5. Lợi ích
- **Bảo vệ tài nguyên**: Đảm bảo quota không bị dùng hết sớm
- **Chống spam**: Giảm nguy cơ bị spam form
- **UX tốt**: Thông báo rõ ràng khi người dùng không thể gửi form

### 6. Xóa giới hạn (nếu cần)
Để xóa giới hạn thời gian cho một máy cụ thể, người dùng có thể:
- Mở Developer Console (F12)
- Gõ: `localStorage.removeItem('lastEmailSent')`
- Hoặc dùng chế độ ẩn danh/incognito

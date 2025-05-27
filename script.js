// JavaScript cho tương tác và hiệu ứng
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling cho navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Tính toán offset cho fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Đóng mobile menu nếu đang mở
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background change on scroll
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        highlightActiveSection();
        handleNavbarScroll();
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const heroBackground = document.querySelector('.hero-background');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve sau khi đã animate để tránh ẩn lại khi scroll ra ngoài
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll (LOẠI TRỪ hoàn toàn contact stats)
    const animateElements = document.querySelectorAll('.app-card, .tool-card, .about-text, .contact-info-card, .contact-form-card');
    // BỎ QUA: .contact-info, .contact-stats, .stat-item
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Image hover effects
    const images = document.querySelectorAll('.app-screenshots img, .about-image img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-info, .hero-buttons, .hero-image');
        
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
});

// Function hiển thị thông báo cho Google Play
function showGooglePlayAlert(event) {
    event.preventDefault();
    
    // Tạo modal thông báo đẹp hơn
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="color: #4b6cb7; font-size: 3rem; margin-bottom: 1rem;">
            <i class="fab fa-google-play"></i>
        </div>
        <h3 style="color: #333; margin-bottom: 1rem;">Google Play Store</h3>
        <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
            Ứng dụng sẽ được cập nhật lên Google Play Store sắp tới. 
            Vui lòng tải từ GitHub hoặc APKPure trong thời gian này!
        </p>
        <button onclick="this.closest('.modal').remove()" style="
            background: #4b6cb7;
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='#3a5998'" onmouseout="this.style.background='#4b6cb7'">
            Đã hiểu
        </button>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// EmailJS Configuration
(function() {
    emailjs.init({
        publicKey: "-7WQHrE8n8SMfxmS7", // Thay thế bằng Public Key của bạn
    });
})();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Kiểm tra giới hạn gửi form (1 lần/ngày/máy)
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
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim() || 'Tin nhắn từ website';
        const message = formData.get('message').trim();
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Email không hợp lệ!', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
        submitBtn.disabled = true;
        
        // Send email using EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'tuangato147@gmail.com', // Email nhận
        };
        
        emailjs.send('service_7klzwtf', 'template_ukr9mwa', templateParams)
            .then(function(response) {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Lưu thời gian gửi email thành công vào localStorage
                localStorage.setItem('lastEmailSent', Date.now());
                
                // Show success message
                showNotification('Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
                
                console.log('Email sent successfully:', response);
            })
            .catch(function(error) {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show error message
                showNotification('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại hoặc liên hệ trực tiếp qua email!', 'error');
                
                console.error('Email send failed:', error);
            });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Form field animation effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if already has value on page load
    if (input.value.trim()) {
        input.parentElement.classList.add('focused');
    }
});

// Enhanced Social Buttons Effects
const socialButtons = document.querySelectorAll('.social-btn');

socialButtons.forEach((btn, index) => {
    // Add staggered entrance animation
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(30px)';
    btn.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
    }, 200 * (index + 1));
    
    // Add mouse tracking effect
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
    
    // Add click ripple effect
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Contact Stats Enhanced Animations - DISABLED
const contactStats = document.querySelectorAll('.stat-item');

// Đảm bảo Contact Stats luôn hiển thị
const contactStatsElements = document.querySelectorAll('.contact-stats, .contact-stats .stat-item');
contactStatsElements.forEach(el => {
    // Force visibility
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.display = 'block';
    
    // Ensure they're not affected by main observer
    if (el.classList.contains('stat-item')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }
});

/* DISABLED - Stats Observer để tránh conflict
// Intersection Observer for contact stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Trigger counter animation
            const statNumber = entry.target.querySelector('.stat-number');
            const finalValue = statNumber.textContent;
            
            // Extract number from text (e.g., "24/7" -> "24", "3+" -> "3")
            const numberMatch = finalValue.match(/\d+/);
            if (numberMatch) {
                const targetNumber = parseInt(numberMatch[0]);
                animateCounter(statNumber, targetNumber, finalValue);
            }
            
            // Add pulsing effect
            setTimeout(() => {
                entry.target.classList.add('stat-visible');
            }, index * 200);
            
            // Unobserve sau khi đã animate để tránh ẩn lại
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all stat items - DISABLED
/*
contactStats.forEach(stat => {
    statsObserver.observe(stat);
    
    // Add mouse tracking effect for stats
    stat.addEventListener('mousemove', (e) => {
        const rect = stat.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        stat.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
    });
    
    stat.addEventListener('mouseleave', () => {
        stat.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    });
    
    // Add click effect
    stat.addEventListener('click', () => {
        stat.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-5px) scale(0.98)';
        setTimeout(() => {
            stat.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        }, 150);
    });
});
*/

// Counter animation function
function animateCounter(element, target, finalText) {
    let current = 0;
    const increment = target / 30; // 30 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            // For numbers with text, preserve the text part
            if (finalText.includes('/')) {
                element.textContent = Math.floor(current) + '/7';
            } else if (finalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (finalText.includes('h')) {
                element.textContent = Math.floor(current) + 'h';
            } else {
                element.textContent = Math.floor(current);
            }
        }
    }, 50);
}

// Add CSS for ripple animation
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = rippleCSS;
    document.head.appendChild(style);
}

// Đảm bảo Contact Stats luôn hiển thị khi scroll
function ensureContactStatsVisible() {
    const contactStatsSection = document.querySelector('.contact-stats');
    const statItems = document.querySelectorAll('.stat-item');
    
    if (contactStatsSection) {
        contactStatsSection.style.display = 'grid';
        contactStatsSection.style.opacity = '1';
        contactStatsSection.style.visibility = 'visible';
    }
    
    statItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.visibility = 'visible';
        item.style.display = 'block';
    });
}

// Gọi hàm này khi scroll
window.addEventListener('scroll', ensureContactStatsVisible);

// Gọi ngay khi load trang
window.addEventListener('load', ensureContactStatsVisible);

// Gọi sau khi DOM load
ensureContactStatsVisible();

// Debug: Kiểm tra Contact Stats
function debugContactStats() {
    console.log('=== DEBUG CONTACT STATS ===');
    const contactStats = document.querySelector('.contact-stats');
    const statItems = document.querySelectorAll('.stat-item');
    
    console.log('Contact Stats element:', contactStats);
    console.log('Stat items count:', statItems.length);
    
    if (contactStats) {
        console.log('Contact Stats styles:', {
            display: window.getComputedStyle(contactStats).display,
            opacity: window.getComputedStyle(contactStats).opacity,
            visibility: window.getComputedStyle(contactStats).visibility,
            transform: window.getComputedStyle(contactStats).transform
        });
    }
    
    statItems.forEach((item, index) => {
        console.log(`Stat item ${index}:`, {
            display: window.getComputedStyle(item).display,
            opacity: window.getComputedStyle(item).opacity,
            visibility: window.getComputedStyle(item).visibility,
            transform: window.getComputedStyle(item).transform
        });
    });
}

// Chạy debug sau 2 giây
setTimeout(debugContactStats, 2000);

// Chạy debug khi scroll
let debugTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(debugTimeout);
    debugTimeout = setTimeout(debugContactStats, 1000);
});

// Hiệu ứng theo dõi con chuột tuyệt đẹp
document.addEventListener('DOMContentLoaded', function() {
    // Tạo container cho hiệu ứng
    const cursorContainer = document.createElement('div');
    cursorContainer.className = 'cursor-container';
    document.body.appendChild(cursorContainer);
    
    // Tạo con trỏ chính và các hiệu ứng
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // Con trỏ lõi
    const cursorCore = document.createElement('div');
    cursorCore.className = 'cursor-core';
    
    // Vòng hiệu ứng
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    
    // Hạt nhỏ theo sau
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    // Thêm vào DOM
    cursor.appendChild(cursorCore);
    cursor.appendChild(cursorRing);
    cursorContainer.appendChild(cursor);
    cursorContainer.appendChild(particlesContainer);
    
    // Tạo các hạt theo dõi
    const particleCount = 12;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.setProperty('--delay', `${i * 0.08}s`);
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: 0,
            y: 0,
            size: Math.random() * 3 + 2
        });
    }
    
    // Thêm CSS động
    const cursorStyles = `
        .cursor-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        
        .custom-cursor {
            position: fixed;
            width: 28px;
            height: 28px;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            transition: transform 0.2s;
        }
        
        .cursor-core {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 6px;
            height: 6px;
            background: #4b6cb7;
            border-radius: 50%;
            box-shadow: 0 0 10px rgba(75, 108, 183, 0.8);
            z-index: 10001;
            transition: transform 0.1s, background 0.3s;
        }
        
        .cursor-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1.5px solid rgba(75, 108, 183, 0.5);
            border-radius: 50%;
            box-sizing: border-box;
            transition: all 0.2s;
            animation: pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        .particles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        }
        
        .cursor-particle {
            position: absolute;
            background: linear-gradient(180deg, #4b6cb7, rgba(75, 108, 183, 0));
            border-radius: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            z-index: 9997;
            filter: blur(1px);
            transition: width 0.3s, height 0.3s, opacity 0.3s;
            mix-blend-mode: screen;
        }
        
        /* Hover states */
        a, button, .social-btn, input, textarea, [data-cursor-hover] {
            cursor: none;
        }
        
        a:hover ~ .cursor-container .cursor-core,
        button:hover ~ .cursor-container .cursor-core,
        .social-btn:hover ~ .cursor-container .cursor-core,
        input:hover ~ .cursor-container .cursor-core,
        textarea:hover ~ .cursor-container .cursor-core,
        [data-cursor-hover]:hover ~ .cursor-container .cursor-core {
            transform: translate(-50%, -50%) scale(1.5);
            background: #ff9d00;
        }
        
        a:hover ~ .cursor-container .cursor-ring,
        button:hover ~ .cursor-container .cursor-ring,
        .social-btn:hover ~ .cursor-container .cursor-ring,
        input:hover ~ .cursor-container .cursor-ring,
        textarea:hover ~ .cursor-container .cursor-ring,
        [data-cursor-hover]:hover ~ .cursor-container .cursor-ring {
            border-color: rgba(255, 157, 0, 0.5);
            transform: scale(1.3);
            animation: pulseRingHover 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        /* Animations */
        @keyframes pulseRing {
            0% { transform: scale(0.9); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 0.5; }
            100% { transform: scale(0.9); opacity: 0.8; }
        }
        
        @keyframes pulseRingHover {
            0% { transform: scale(1.3); opacity: 0.8; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1.3); opacity: 0.8; }
        }
        
        @keyframes floatParticle {
            0% { transform: translate(-50%, -50%) scale(0.4) translate(0, 0); opacity: 0.8; }
            20% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.8) translate(calc(var(--x) * 0.3), calc(var(--y) * 0.3)); }
            50% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9) translate(calc(var(--x) * 0.6), calc(var(--y) * 0.6)); }
            100% { transform: translate(-50%, -50%) scale(0.7) translate(var(--x), var(--y)); opacity: 0; }
        }
        
        /* Hiệu ứng nhấp chuột đa tầng */
        .cursor-click-container {
            position: absolute;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 9996;
        }
        
        .cursor-click {
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9996;
            mix-blend-mode: screen;
        }
        
        .cursor-click-outer {
            position: absolute;
            border: 2px solid rgba(75, 108, 183, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9995;
            box-shadow: 0 0 15px rgba(75, 108, 183, 0.4);
            mix-blend-mode: screen;
        }
        
        .cursor-click-inner {
            position: absolute;
            background: rgba(75, 108, 183, 0.6);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9997;
            mix-blend-mode: screen;
            filter: blur(2px);
        }
        
        @keyframes clickRipple {
            0% { width: 5px; height: 5px; opacity: 1; }
            50% { opacity: 0.5; }
            100% { width: 180px; height: 180px; opacity: 0; }
        }
        
        @keyframes clickRippleOuter {
            0% { width: 5px; height: 5px; opacity: 0.9; border-width: 2px; }
            50% { border-width: 1px; }
            100% { width: 230px; height: 230px; opacity: 0; border-width: 0.5px; }
        }
        
        @keyframes clickRippleInner {
            0% { width: 10px; height: 10px; opacity: 0.9; }
            100% { width: 80px; height: 80px; opacity: 0; }
        }
        
        /* Magic trail effect */
        .magic-trail {
            position: absolute;
            background: linear-gradient(120deg, #4b6cb7, #0047ab);
            border-radius: 50%;
            filter: blur(3px);
            opacity: 0;
            animation: magicTrail 1s forwards ease-out;
            box-shadow: 0 0 6px #4b6cb7, 0 0 12px rgba(75, 108, 183, 0.5);
            mix-blend-mode: screen;
        }
        
        @keyframes magicTrail {
            0% { transform: scale(0.8); opacity: 0.7; }
            100% { transform: scale(0.1); opacity: 0; }
        }
        
        /* Special effects */
        .cursor-none * {
            cursor: none !important;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'cursor-styles';
    styleElement.textContent = cursorStyles;
    document.head.appendChild(styleElement);
    
    // Ẩn chuột thực
    document.body.classList.add('cursor-none');
    
    // Variables for tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailPoints = [];
    let isMoving = false;
    let movingTimeout;
    let lastX = 0;
    let lastY = 0;
    let velocity = { x: 0, y: 0 };
    
    // Cập nhật vị trí chuột và theo dõi tốc độ
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Tính toán vận tốc
        velocity.x = mouseX - lastX;
        velocity.y = mouseY - lastY;
        lastX = mouseX;
        lastY = mouseY;
        
        // Kiểm tra chuyển động
        if (!isMoving) {
            isMoving = true;
            cursor.classList.add('is-moving');
        }
        
        // Đặt lại bộ đếm thời gian bất động
        clearTimeout(movingTimeout);
        movingTimeout = setTimeout(() => {
            isMoving = false;
            cursor.classList.remove('is-moving');
            velocity = { x: 0, y: 0 };
        }, 100);
        
        // Tạo hiệu ứng magic trail khi di chuyển nhanh
        const speed = Math.hypot(velocity.x, velocity.y);
        if (speed > 10) {
            createMagicTrail(mouseX, mouseY, speed);
        }
        
        // Lưu trữ điểm cho trail
        if (trailPoints.length > 8) {
            trailPoints.shift();
        }
        trailPoints.push({ x: mouseX, y: mouseY });
    });
    
    // Hiệu ứng nhấp chuột ấn tượng đa tầng
    document.addEventListener('mousedown', (e) => {
        // Tạo container để chứa tất cả các hiệu ứng nhấp chuột
        const clickContainer = document.createElement('div');
        clickContainer.className = 'cursor-click-container';
        clickContainer.style.left = `${e.clientX}px`;
        clickContainer.style.top = `${e.clientY}px`;
        document.body.appendChild(clickContainer);
        
        // Hiệu ứng gợn sóng ngoài cùng
        const outerRipple = document.createElement('div');
        outerRipple.className = 'cursor-click-outer';
        outerRipple.style.left = '0';
        outerRipple.style.top = '0';
        outerRipple.style.animation = 'clickRippleOuter 1.2s forwards cubic-bezier(0, 0.5, 0.3, 1)';
        clickContainer.appendChild(outerRipple);
        
        // Hiệu ứng gợn sóng chính
        const mainRipple = document.createElement('div');
        mainRipple.className = 'cursor-click';
        mainRipple.style.left = '0';
        mainRipple.style.top = '0';
        mainRipple.style.animation = 'clickRipple 1s forwards cubic-bezier(0, 0.5, 0.3, 1)';
        clickContainer.appendChild(mainRipple);
        
        // Hiệu ứng gợn sóng bên trong
        const innerRipple = document.createElement('div');
        innerRipple.className = 'cursor-click-inner';
        innerRipple.style.left = '0';
        innerRipple.style.top = '0';
        innerRipple.style.animation = 'clickRippleInner 0.8s forwards cubic-bezier(0, 0.5, 0.3, 1)';
        clickContainer.appendChild(innerRipple);
        
        // Tạo thêm hiệu ứng gợn sóng với độ trễ
        setTimeout(() => {
            if (document.body.contains(clickContainer)) {
                const delayedRipple = document.createElement('div');
                delayedRipple.className = 'cursor-click';
                delayedRipple.style.left = '0';
                delayedRipple.style.top = '0';
                delayedRipple.style.animation = 'clickRipple 0.8s forwards cubic-bezier(0, 0.5, 0.3, 1)';
                delayedRipple.style.background = 'radial-gradient(circle, rgba(75, 108, 183, 0.5) 0%, rgba(75, 108, 183, 0) 70%)';
                clickContainer.appendChild(delayedRipple);
            }
        }, 150);
        
        // Xóa container sau khi hoàn thành animation
        setTimeout(() => {
            if (document.body.contains(clickContainer)) {
                clickContainer.remove();
            }
        }, 1200);
        
        // Thu nhỏ con trỏ khi nhấp
        cursorCore.style.transform = 'translate(-50%, -50%) scale(0.6)';
        cursorRing.style.transform = 'scale(0.8)';
        cursorRing.style.opacity = '1';
        
        // Tạo nhiều hạt khi click với số lượng và kích thước đa dạng hơn
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createClickParticle(e.clientX, e.clientY);
            }, i * 30); // Tạo hiệu ứng với độ trễ khác nhau
        }
    });
    
    document.addEventListener('mouseup', () => {
        cursorCore.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.transform = '';
        cursorRing.style.opacity = '';
    });
    
    // Tạo hiệu ứng magic trail nâng cao
    function createMagicTrail(x, y, speed) {
        // Tạo phần tử trail chính
        const trail = document.createElement('div');
        trail.className = 'magic-trail';
        const size = Math.min(28, 12 + speed / 2);
        
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        // Random màu sắc cho đa dạng (giữ tone màu chính)
        const hue = Math.random() * 30 + 220; // Tone xanh dương
        const saturation = Math.floor(Math.random() * 30) + 70; // Độ bão hòa cao
        const lightness = Math.floor(Math.random() * 20) + 40; // Độ sáng vừa phải
        
        trail.style.background = `linear-gradient(120deg, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue+10}, ${saturation-10}%, ${lightness+10}%))`;
        trail.style.boxShadow = `0 0 8px hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Random độ nhạt để tạo độ đa dạng cho trail
        trail.style.opacity = `${Math.random() * 0.3 + 0.5}`;
        
        cursorContainer.appendChild(trail);
        
        // Tạo hiệu ứng trail phụ nếu tốc độ cao
        if (speed > 15 && Math.random() > 0.5) {
            const subTrail = document.createElement('div');
            subTrail.className = 'magic-trail';
            const subSize = size * 0.7;
            
            subTrail.style.width = `${subSize}px`;
            subTrail.style.height = `${subSize}px`;
            subTrail.style.left = `${x + (Math.random() * 10 - 5)}px`;
            subTrail.style.top = `${y + (Math.random() * 10 - 5)}px`;
            subTrail.style.background = `linear-gradient(120deg, hsl(${hue-20}, ${saturation}%, ${lightness+10}%), hsl(${hue}, ${saturation-20}%, ${lightness+15}%))`;
            subTrail.style.opacity = `${Math.random() * 0.3 + 0.3}`;
            subTrail.style.filter = 'blur(4px)';
            
            cursorContainer.appendChild(subTrail);
            
            setTimeout(() => {
                if (subTrail.parentNode === cursorContainer) {
                    subTrail.remove();
                }
            }, 800);
        }
        
        setTimeout(() => {
            if (trail.parentNode === cursorContainer) {
                trail.remove();
            }
        }, 1000);
    }
    
    // Tạo hạt khi click với hiệu ứng đẹp hơn
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        // Kích thước đa dạng hơn
        const size = Math.random() * 8 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Màu sắc ngẫu nhiên theo tone
        const isBlue = Math.random() > 0.3; // 70% xanh, 30% cam
        const hue = isBlue ? (Math.random() * 30 + 220) : (Math.random() * 30 + 25); 
        const saturation = Math.floor(Math.random() * 20) + 80;
        const lightness = Math.floor(Math.random() * 15) + 50;
        
        // Gradient thay vì màu đơn
        particle.style.background = `radial-gradient(circle at 30% 30%, 
                                     hsl(${hue}, ${saturation}%, ${lightness}%), 
                                     hsl(${hue+(isBlue ? 20 : -20)}, ${saturation-20}%, ${lightness-10}%))`;
        
        // Thêm shadow và blur cho hiệu ứng phát sáng
        particle.style.boxShadow = `0 0 ${size/2}px hsl(${hue}, ${saturation}%, ${lightness}%)`;
        particle.style.filter = `blur(${Math.random() * 1 + 0.5}px)`;
        
        // Hướng và khoảng cách bay đa dạng hơn
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 30; // Khoảng cách xa hơn
        const destX = distance * Math.cos(angle);
        const destY = distance * Math.sin(angle);
        
        // Thêm một chút trọng lực
        const gravity = Math.random() * 20 + 10;
        
        particle.style.setProperty('--x', `${destX}px`);
        particle.style.setProperty('--y', `${destY + gravity}px`);
        
        // Thời gian và kiểu animation đa dạng
        const duration = Math.random() * 0.6 + 0.7;
        const delay = Math.random() * 0.2;
        const easing = Math.random() > 0.5 ? 'cubic-bezier(0.1, 0.8, 0.3, 1)' : 'cubic-bezier(0, 0.5, 0.5, 1)';
        
        particle.style.animation = `floatParticle ${duration}s ${easing} ${delay}s forwards`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode === particlesContainer) {
                particle.remove();
            }
        }, (duration + delay) * 1000 + 100);
    }
    
    // Animation loop cho con trỏ
    function animateCursor() {
        // Easing mượt mà
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        // Cập nhật vị trí hạt theo dõi
        particles.forEach((particle, i) => {
            const point = trailPoints[Math.floor(i / 2)] || { x: cursorX, y: cursorY };
            if (point) {
                particle.x += (point.x - particle.x) * 0.15;
                particle.y += (point.y - particle.y) * 0.15;
                
                particle.element.style.left = `${particle.x}px`;
                particle.element.style.top = `${particle.y}px`;
                particle.element.style.width = `${particle.size}px`;
                particle.element.style.height = `${particle.size}px`;
                
                // Độ trong suốt dựa trên khoảng cách với con trỏ
                const distance = Math.hypot(particle.x - cursorX, particle.y - cursorY);
                const opacity = Math.max(0, 1 - distance / 100);
                particle.element.style.opacity = opacity * 0.6;
            }
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    // Khởi động animation
    animateCursor();
    
    // Xử lý khi con trỏ ra khỏi cửa sổ
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        particles.forEach(p => {
            p.element.style.opacity = '0';
        });
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Hiệu ứng đặc biệt khi hover vào tùy chỉnh
    const specialElements = document.querySelectorAll('[data-cursor="special"]');
    specialElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-special');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-special');
        });
    });
});
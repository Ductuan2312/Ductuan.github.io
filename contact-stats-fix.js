// File riêng để sửa lỗi Contact Stats
(function() {
    'use strict';
      // Contact Stats Fix - Ensuring persistent visibility
    
    function forceContactStatsVisible() {
        const contactStats = document.querySelector('.contact-stats');
        const statItems = document.querySelectorAll('.stat-item');
        
        if (contactStats) {
            // Remove any hide classes that might be applied
            contactStats.classList.remove('hidden', 'fade-out');
            
            // Force CSS properties with highest priority
            const statsCSS = `
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
                gap: 2rem !important;
                margin: 3rem 0 !important;
                padding: 0 1rem !important;
                opacity: 1 !important;
                visibility: visible !important;
                transform: none !important;
                position: relative !important;
                z-index: 1 !important;
            `;
            contactStats.setAttribute('style', statsCSS);
        }
        
        statItems.forEach((item, index) => {
            // Remove any hide classes
            item.classList.remove('hidden', 'fade-out');
            
            // Base styles for all stat items
            const baseCSS = `
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                transform: translateY(0) !important;
                position: relative !important;
                padding: 2.5rem 2rem !important;
                border-radius: 25px !important;
                text-align: center !important;
                color: white !important;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
                transition: all 0.4s ease !important;
                margin-bottom: 0 !important;
                z-index: 2 !important;
            `;
            
            // Apply specific backgrounds
            let backgroundCSS = '';
            if (index === 0) {
                backgroundCSS = 'background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%) !important;';
            } else if (index === 1) {
                backgroundCSS = 'background: linear-gradient(135deg, rgba(255, 107, 53, 0.95) 0%, rgba(255, 140, 66, 0.95) 100%) !important;';
            } else if (index === 2) {
                backgroundCSS = 'background: linear-gradient(135deg, rgba(52, 168, 83, 0.95) 0%, rgba(45, 143, 71, 0.95) 100%) !important;';
            }
            
            item.setAttribute('style', baseCSS + backgroundCSS);
            
            // Force icon and text visibility
            const icon = item.querySelector('i');
            const statNumber = item.querySelector('.stat-number');
            const statLabel = item.querySelector('.stat-label');
            
            if (icon) {
                icon.setAttribute('style', 'font-size: 3rem !important; margin-bottom: 1.5rem !important; display: block !important; opacity: 1 !important;');
            }
            if (statNumber) {
                statNumber.setAttribute('style', 'display: block !important; font-size: 2.5rem !important; font-weight: 800 !important; margin-bottom: 0.5rem !important; opacity: 1 !important;');
            }
            if (statLabel) {
                statLabel.setAttribute('style', 'display: block !important; font-size: 1.1rem !important; font-weight: 500 !important; opacity: 1 !important;');
            }        });
        
        // Contact Stats visibility successfully enforced
    }
    
    // Override any JavaScript that might hide the stats
    function preventHiding() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            // Create a MutationObserver to watch for style changes
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const currentStyle = item.getAttribute('style') || '';
                          // If opacity is being set to 0 or display to none, fix it
                        if (currentStyle.includes('opacity: 0') || currentStyle.includes('display: none')) {
                            forceContactStatsVisible();
                        }
                    }
                });
            });
            
            observer.observe(item, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
        });
    }
      // Force visibility on page load events
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(forceContactStatsVisible, 100);
        setTimeout(preventHiding, 200);
    });
    
    window.addEventListener('load', function() {
        setTimeout(forceContactStatsVisible, 100);
    });
    
    // Force on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(forceContactStatsVisible, 50);
    });
    
    // Force every 2 seconds for the first 10 seconds
    let forceCount = 0;
    const forceInterval = setInterval(function() {
        forceContactStatsVisible();
        forceCount++;        
        if (forceCount >= 5) {
            clearInterval(forceInterval);
        }
    }, 2000);
      // Immediate execution
    forceContactStatsVisible();
    
})();

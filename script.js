// DOM Elements
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('show');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (mobileMenu?.classList.contains('show')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.remove('show');
        
        // Reset hamburger
        const spans = hamburger?.querySelectorAll('span');
        spans?.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// Header scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (header) {
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.backdropFilter = 'blur(5px)';
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Elements to observe
const animatedElements = document.querySelectorAll([
    '.section-title',
    '.service-card',
    '.feature-card', 
    '.process-step',
    '.comparison-text',
    '.testimonial-card',
    '.benefit-item',
    '.contact-info'
].join(', '));

animatedElements.forEach(el => {
    observer.observe(el);
});

// Staggered animation for cards
const observeStaggered = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector);
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * delay);
            }
        });
    }, observerOptions);
    
    elements.forEach(el => staggerObserver.observe(el));
};

// Apply staggered animations
observeStaggered('.service-card', 150);
observeStaggered('.feature-card', 100);
observeStaggered('.testimonial-card', 200);
observeStaggered('.benefit-item', 100);

// Form handling for contact section
const contactButton = document.querySelector('.cta-button-secondary');
contactButton?.addEventListener('click', () => {
    // Create modal or expand contact form
    showContactDetails();
});

function showContactDetails() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full transform scale-95 opacity-0 transition-all duration-300">
            <div class="text-center mb-6">
                <h3 class="text-2xl font-bold text-dark-navy mb-2">3일 시작 프로세스</h3>
                <p class="text-gray-600">FormeAI와 함께하는 빠른 시작 가이드</p>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                        <h4 class="font-semibold text-dark-navy">상담 & 분석</h4>
                        <p class="text-sm text-gray-600">비즈니스 목표 파악 및 맞춤 전략 수립</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-secondary-blue text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                        <h4 class="font-semibold text-dark-navy">AI 셋업 & 설정</h4>
                        <p class="text-sm text-gray-600">귀하의 비즈니스에 최적화된 AI 시스템 구축</p>
                    </div>
                </div>
                
                <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-accent-orange text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                        <h4 class="font-semibold text-dark-navy">캠페인 런칭</h4>
                        <p class="text-sm text-gray-600">모든 준비 완료 후 마케팅 캠페인 시작</p>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-3">
                <a href="mailto:contact@formeai.org" class="flex-1 bg-accent-orange text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    지금 상담 신청
                </a>
                <button onclick="this.closest('.fixed').remove()" class="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                    닫기
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal
    setTimeout(() => {
        const modalContent = modal.querySelector('div > div');
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Performance optimizations
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images (if any are added later)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Accessibility enhancements
// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    firstElement?.focus();
}

// Add keyboard navigation for mobile menu
hamburger?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Analytics helper (if needed)
function trackEvent(action, category = 'engagement', label = '') {
    // Placeholder for analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track CTA clicks
document.querySelectorAll('.cta-button, .cta-button-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', 'conversion', button.textContent.trim());
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            trackEvent('section_view', 'engagement', sectionId);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('FormeAI Landing Page Loaded');
    
    // Add any initialization code here
    
    // Preload critical resources
    const criticalLinks = [
        'https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

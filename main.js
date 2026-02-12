/**
 * SMJURAIJ - Main JavaScript
 * Optimized, Clean, Professional
 */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const preloader = document.getElementById('preloader');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const yearSpan = document.getElementById('year');

    // ============================================
    // PRELOADER
    // ============================================
    function hidePreloader() {
        if (!preloader) return;
        
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Enable scrolling after preloader
            document.body.style.overflow = '';
        }, 1800);
    }

    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';
    
    // Start preloader on load
    window.addEventListener('load', hidePreloader);

    // ============================================
    // NAVIGATION
    // ============================================
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Add scrolled class to nav
    function handleNavScroll() {
        if (!nav) return;
        
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Throttled scroll handler
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                handleNavScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // ============================================
    // SMOOTH SCROLL TO SECTION
    // ============================================
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = section.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    function initScrollAnimations() {
        // Add animate class to section elements
        const sections = document.querySelectorAll('.section-content, .focus-card, .section-image');
        
        sections.forEach(el => {
            el.classList.add('animate-on-scroll');
            scrollObserver.observe(el);
        });
    }

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    // ============================================
    // UPDATE YEAR IN FOOTER
    // ============================================
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ============================================
    // PERFORMANCE: LAZY LOAD IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // PERFORMANCE: DEBOUNCE FUNCTION
    // ============================================
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

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + (nav ? nav.offsetHeight + 100 : 100);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttled scroll handler for active link
    window.addEventListener('scroll', debounce(() => {
        window.requestAnimationFrame(updateActiveNavLink);
    }, 100), { passive: true });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%cSMJURAIJ', 'font-size: 24px; font-weight: bold; color: #C4B5FD;');
    console.log('%cPersonal Brand Website', 'font-size: 14px; color: #A1A1AA;');

})();

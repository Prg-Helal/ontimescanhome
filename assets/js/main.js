// Main JavaScript for OnTimeScan Website - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });
    
    // Header Scroll Effect - Hide on scroll down, show on scroll up
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
            
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled', 'hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy Loading Images with Intersection Observer
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    
                    // Load the actual image if it's a placeholder
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        delete img.dataset.src;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.classList.add('loaded');
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
    
    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat h3');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statSection = document.querySelector('.stats');
        const statSectionTop = statSection.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (window.scrollY > statSectionTop - windowHeight + 100) {
            statsAnimated = true;
            
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }, 30);
            });
        }
    }
    
    // WhatsApp Button Click Analytics
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('WhatsApp button clicked:', this.href);
        });
    });
    
    // Scroll to Top Button
    const scrollTopButton = document.getElementById('scrollTop');
    
    function toggleScrollTopButton() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
        
        // Animate stats when in view
        animateStats();
    }
    
    if (scrollTopButton) {
        window.addEventListener('scroll', toggleScrollTopButton);
        
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initialize on load
        toggleScrollTopButton();
    }
    
    // Phone Number Formatting and Tracking
    const phoneLinks = document.querySelectorAll('.phone-link');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add phone call tracking here
            console.log('Phone number clicked:', this.textContent);
        });
    });
    
    // Performance Optimization: Debounce Scroll Events
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
    
    // Optimized scroll handler for header
    const optimizedScrollHandler = debounce(onScroll, 10);
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Initialize all components
    console.log('OnTimeScan website initialized successfully');
});
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll effect for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll reveal effect to articles
    const articleItems = document.querySelectorAll('.writings-list li');
    
    const fadeInOnScroll = () => {
        articleItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100 && itemBottom > 0) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize article items style
    articleItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    fadeInOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', fadeInOnScroll);
});

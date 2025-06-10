// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle column clicks to navigate to subpages
    const columns = document.querySelectorAll('.about-column');
    
    columns.forEach(column => {
        column.addEventListener('click', function() {
            const columnType = this.classList[1]; // Gets 'origin', 'vision', or 'mission'
            
            // Navigate to respective subpage
            // You can modify these URLs to match your actual subpage structure
            switch(columnType) {
                case 'origin':
                    window.location.href = '/about/origin/';
                    break;
                case 'vision':
                    window.location.href = '/about/vision/';
                    break;
                case 'mission':
                    window.location.href = '/about/mission/';
                    break;
                default:
                    console.warn('Unknown column type:', columnType);
            }
        });
        
        // Add keyboard accessibility
        column.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make columns focusable for keyboard navigation
        column.setAttribute('tabindex', '0');
        column.setAttribute('role', 'button');
    });
    
    // Add subtle parallax effect on scroll (optional enhancement)
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.about-column');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Smooth entrance animation
    function animateColumnsOnLoad() {
        const columns = document.querySelectorAll('.about-column');
        
        columns.forEach((column, index) => {
            column.style.opacity = '0';
            column.style.transform = 'translateY(50px)';
            column.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                column.style.opacity = '1';
                column.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Initialize entrance animation
    animateColumnsOnLoad();
    
    // Add hover sound effect (optional - uncomment if you want audio feedback)
    /*
    columns.forEach(column => {
        column.addEventListener('mouseenter', function() {
            // You can add a subtle hover sound here
            // const audio = new Audio('/assets/sounds/hover.mp3');
            // audio.volume = 0.1;
            // audio.play().catch(e => console.log('Audio play failed:', e));
        });
    });
    */
    
    // Enhanced accessibility announcements
    columns.forEach(column => {
        const columnType = column.classList[1];
        column.setAttribute('aria-label', `Navigate to ${columnType} page`);
        
        column.addEventListener('focus', function() {
            this.style.outline = '2px solid rgba(255, 255, 255, 0.8)';
            this.style.outlineOffset = '-4px';
        });
        
        column.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

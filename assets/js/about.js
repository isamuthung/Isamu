document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation with staggered fade-in effect
    function handleScroll() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const images = document.querySelectorAll('.portfolio-item img');
        
        portfolioItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('visible')) {
                // Add a staggered delay for each item (500ms apart for slower effect)
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 500);
            }
        });
        
        images.forEach((img, index) => {
            if (isInViewport(img) && !img.classList.contains('visible')) {
                // Add a staggered delay for each image (500ms apart)
                setTimeout(() => {
                    img.classList.add('visible');
                }, index * 500);
            }
        });
    }
    
    // Initialize portfolio items and images with hidden state and transform
    function initializePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const images = document.querySelectorAll('.portfolio-item img');
        
        portfolioItems.forEach(item => {
            // Set initial styles for animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'opacity 2s ease-out, transform 2s ease-out';
        });
        
        images.forEach(img => {
            // Set initial styles for image animation
            img.style.opacity = '0';
            img.style.transform = 'translateY(30px) scale(0.95)';
            img.style.transition = 'opacity 2s ease-out, transform 2s ease-out';
        });
        
        // Add visible class styles
        if (!document.querySelector('style[data-portfolio-animation]')) {
            const style = document.createElement('style');
            style.setAttribute('data-portfolio-animation', 'true');
            style.textContent = `
                .portfolio-item.visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .portfolio-item img.visible {
                    opacity: 1 !important;
                    transform: translateY(0) scale(1) !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize the animation setup
    initializePortfolioItems();
    
    // Initial check for items in viewport
    handleScroll();
    
    // Event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // For smoother animations on page load with longer delay to ensure content is ready
    setTimeout(function() {
        handleScroll();
    }, 300);
});

//SIDEBAR
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    let contentOverlay = document.getElementById('contentOverlay'); // Changed from const to let
    const body = document.body;
    
    // Create overlay if it doesn't exist
    if (!contentOverlay) {
        const newOverlay = document.createElement('div');
        newOverlay.id = 'contentOverlay';
        newOverlay.className = 'content-overlay';
        document.body.appendChild(newOverlay);
        contentOverlay = newOverlay;
    }
    
    // Function to toggle sidebar
    function toggleSidebar() {
        sidebarToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        contentOverlay.classList.toggle('active');
        
        // Prevent scrolling on body when sidebar is open
        if (sidebar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }

    // Add click event to toggle button
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking on overlay
    contentOverlay.addEventListener('click', function() {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        // Any resize-specific adjustments can go here
    });
    
    // Navigation links with smooth transition
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only if sidebar is active
            if (sidebar.classList.contains('active')) {
                e.preventDefault(); // Prevent immediate navigation
                const destination = this.getAttribute('href');
                
                // Close sidebar with animation
                toggleSidebar();
                
                // Wait for the sidebar transition to complete before navigating
                // Duration matches the CSS transition time (0.8s)
                setTimeout(function() {
                    window.location.href = destination;
                }, 800);
            }
        });
    });
});

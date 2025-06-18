// Text Page Enhancement Scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize text page enhancements
    initTextPageFeatures();
    
    function initTextPageFeatures() {
        // Add reading progress indicator
        addReadingProgress();
        
        // Enhance typography with better spacing
        enhanceTypography();
        
        // Add smooth scroll behavior
        enableSmoothScrolling();
        
        // Add keyboard navigation
        addKeyboardNavigation();
    }
    
    // Reading progress indicator
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
        
        // Add CSS for progress bar
        const progressStyle = document.createElement('style');
        progressStyle.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: rgba(0,0,0,0.1);
                z-index: 1000;
                transition: opacity 0.3s ease;
            }
            
            .reading-progress-bar {
                height: 100%;
                background: #2c2c2c;
                width: 0%;
                transition: width 0.1s ease;
            }
            
            @media print {
                .reading-progress {
                    display: none;
                }
            }
        `;
        document.head.appendChild(progressStyle);
        
        // Update progress on scroll
        window.addEventListener('scroll', updateReadingProgress);
        
        function updateReadingProgress() {
            const mainContent = document.querySelector('.main-content');
            if (!mainContent) return;
            
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            const progressBar = document.querySelector('.reading-progress-bar');
            if (progressBar) {
                progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
            }
        }
    }
    
    // Enhance typography with widow/orphan control
    function enhanceTypography() {
        const paragraphs = document.querySelectorAll('.main-content p');
        
        paragraphs.forEach(p => {
            // Add non-breaking space before last word to prevent orphans
            const text = p.innerHTML;
            const lastSpaceIndex = text.lastIndexOf(' ');
            
            if (lastSpaceIndex > 0 && lastSpaceIndex < text.length - 20) {
                const beforeLastWord = text.substring(0, lastSpaceIndex);
                const lastWord = text.substring(lastSpaceIndex + 1);
                p.innerHTML = beforeLastWord + '&nbsp;' + lastWord;
            }
        });
    }
    
    // Smooth scrolling for any internal links
    function enableSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Keyboard navigation enhancements
    function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Space or Page Down - scroll down
            if (e.code === 'Space' || e.code === 'PageDown') {
                if (!isInputFocused()) {
                    e.preventDefault();
                    window.scrollBy({
                        top: window.innerHeight * 0.8,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Page Up - scroll up
            if (e.code === 'PageUp') {
                if (!isInputFocused()) {
                    e.preventDefault();
                    window.scrollBy({
                        top: -window.innerHeight * 0.8,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Home - scroll to top
            if (e.code === 'Home' && e.ctrlKey) {
                if (!isInputFocused()) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
            
            // End - scroll to bottom
            if (e.code === 'End' && e.ctrlKey) {
                if (!isInputFocused()) {
                    e.preventDefault();
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        function isInputFocused() {
            const activeElement = document.activeElement;
            return activeElement && (
                activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.contentEditable === 'true'
            );
        }
    }
    
    // Add reading time estimation
    function addReadingTime() {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        const text = mainContent.textContent || mainContent.innerText;
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        // Look for existing subtitle/date elements to add reading time
        const subtitle = document.querySelector('.page-subtitle, .page-date');
        if (subtitle) {
            const readingTimeElement = document.createElement('div');
            readingTimeElement.className = 'reading-time';
            readingTimeElement.textContent = `${readingTime} min read`;
            readingTimeElement.style.cssText = `
                font-size: 13px;
                color: #888;
                font-weight: 300;
                font-style: italic;
                margin-top: 4px;
            `;
            subtitle.parentNode.insertBefore(readingTimeElement, subtitle.nextSibling);
        }
    }
    
    // Initialize reading time if there's substantial content
    const mainContent = document.querySelector('.main-content');
    if (mainContent && mainContent.textContent.length > 500) {
        addReadingTime();
    }
    
    // Focus management for better accessibility
    function improveFocus() {
        // Add skip link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add id to main content if it doesn't exist
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
    
    improveFocus();
});

// Print optimization
window.addEventListener('beforeprint', function() {
    // Hide non-essential elements when printing
    const elementsToHide = document.querySelectorAll('.reading-progress, .sidebar, .vertical-bar');
    elementsToHide.forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const elementsToShow = document.querySelectorAll('.reading-progress, .sidebar, .vertical-bar');
    elementsToShow.forEach(el => {
        el.style.display = '';
    });
});

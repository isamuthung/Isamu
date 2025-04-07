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
    
    // Footnote links handling
    document.querySelectorAll('.writings-content a[href^="#footnote-"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Highlight the footnote temporarily
                targetElement.classList.add('writings-footnote-highlight');
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Remove the highlight after a delay
                setTimeout(() => {
                    targetElement.classList.remove('writings-footnote-highlight');
                }, 2000);
            }
        });
    });
    
    // Add CSS for the footnote highlight effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes footnoteHighlight {
            0% { background-color: rgba(255, 255, 150, 0.7); }
            100% { background-color: transparent; }
        }
        
        .writings-footnote-highlight {
            animation: footnoteHighlight 2s ease-out;
        }
    `;
    
    document.head.appendChild(style);
    
    // Image handling
    document.querySelectorAll('.writings-image').forEach(image => {
        image.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'writings-lightbox-overlay';
            
            const container = document.createElement('div');
            container.className = 'writings-lightbox-container';
            
            const imgElement = document.createElement('img');
            imgElement.src = this.src;
            imgElement.className = 'writings-lightbox-image';
            
            const caption = this.parentNode.querySelector('.writings-image-caption');
            
            container.appendChild(imgElement);
            
            if (caption) {
                const captionElement = document.createElement('div');
                captionElement.className = 'writings-lightbox-caption';
                captionElement.textContent = caption.textContent;
                container.appendChild(captionElement);
            }
            
            const closeButton = document.createElement('button');
            closeButton.className = 'writings-lightbox-close';
            closeButton.textContent = '×';
            
            overlay.appendChild(container);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Handle closing the lightbox
            const closeLightbox = () => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            };
            
            closeButton.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeLightbox();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });
    
    // Add CSS for the lightbox
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .writings-lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .writings-lightbox-container {
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .writings-lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .writings-lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px;
            font-style: italic;
        }
        
        .writings-lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(lightboxStyle);
});

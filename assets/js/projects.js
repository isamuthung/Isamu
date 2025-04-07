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
    
    // Gallery image lightbox functionality
    const galleryImages = document.querySelectorAll('.projects-gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'projects-lightbox-overlay';
            
            const container = document.createElement('div');
            container.className = 'projects-lightbox-container';
            
            const imgElement = document.createElement('img');
            imgElement.src = this.src;
            imgElement.className = 'projects-lightbox-image';
            
            const caption = this.parentNode.querySelector('.projects-gallery-caption');
            
            container.appendChild(imgElement);
            
            if (caption) {
                const captionElement = document.createElement('div');
                captionElement.className = 'projects-lightbox-caption';
                captionElement.textContent = caption.textContent;
                container.appendChild(captionElement);
            }
            
            const closeButton = document.createElement('button');
            closeButton.className = 'projects-lightbox-close';
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
    const style = document.createElement('style');
    style.textContent = `
        .projects-lightbox-overlay {
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
        
        .projects-lightbox-container {
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .projects-lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .projects-lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px;
            font-style: italic;
        }
        
        .projects-lightbox-close {
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
    
    document.head.appendChild(style);
});

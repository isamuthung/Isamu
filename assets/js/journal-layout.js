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
    const galleryImages = document.querySelectorAll('.journal-gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'journal-lightbox-overlay';
            
            const container = document.createElement('div');
            container.className = 'journal-lightbox-container';
            
            const imgElement = document.createElement('img');
            imgElement.src = this.src;
            imgElement.className = 'journal-lightbox-image';
            
            const caption = this.parentNode.querySelector('.journal-gallery-caption');
            
            container.appendChild(imgElement);
            
            if (caption) {
                const captionElement = document.createElement('div');
                captionElement.className = 'journal-lightbox-caption';
                captionElement.textContent = caption.textContent;
                container.appendChild(captionElement);
            }
            
            // Navigation arrows for gallery
            const prevButton = document.createElement('button');
            prevButton.className = 'journal-lightbox-nav journal-lightbox-prev';
            prevButton.innerHTML = '&#10094;';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'journal-lightbox-nav journal-lightbox-next';
            nextButton.innerHTML = '&#10095;';
            
            const closeButton = document.createElement('button');
            closeButton.className = 'journal-lightbox-close';
            closeButton.textContent = '×';
            
            overlay.appendChild(container);
            overlay.appendChild(prevButton);
            overlay.appendChild(nextButton);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Get all gallery images for navigation
            const allGalleryImages = Array.from(document.querySelectorAll('.journal-gallery-image'));
            let currentIndex = allGalleryImages.indexOf(this);
            
            // Navigation functionality
            const showImage = (index) => {
                if (index < 0) index = allGalleryImages.length - 1;
                if (index >= allGalleryImages.length) index = 0;
                
                currentIndex = index;
                const newImage = allGalleryImages[index];
                imgElement.src = newImage.src;
                
                const newCaption = newImage.parentNode.querySelector('.journal-gallery-caption');
                if (newCaption && container.querySelector('.journal-lightbox-caption')) {
                    container.querySelector('.journal-lightbox-caption').textContent = newCaption.textContent;
                } else if (newCaption) {
                    const captionElement = document.createElement('div');
                    captionElement.className = 'journal-lightbox-caption';
                    captionElement.textContent = newCaption.textContent;
                    container.appendChild(captionElement);
                } else if (container.querySelector('.journal-lightbox-caption')) {
                    container.querySelector('.journal-lightbox-caption').remove();
                }
            };
            
            prevButton.addEventListener('click', () => showImage(currentIndex - 1));
            nextButton.addEventListener('click', () => showImage(currentIndex + 1));
            
            // Keyboard navigation
            const keyHandler = (e) => {
                if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
                if (e.key === 'ArrowRight') showImage(currentIndex + 1);
                if (e.key === 'Escape') closeLightbox();
            };
            
            document.addEventListener('keydown', keyHandler);
            
            // Handle closing the lightbox
            const closeLightbox = () => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
                document.removeEventListener('keydown', keyHandler);
            };
            
            closeButton.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeLightbox();
                }
            });
        });
    });
    
    // Add CSS for the lightbox
    const style = document.createElement('style');
    style.textContent = `
        .journal-lightbox-overlay {
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
        
        .journal-lightbox-container {
            max-width: 90%;
            max-height: 90%;
            position: relative;
        }
        
        .journal-lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        
        .journal-lightbox-caption {
            color: white;
            text-align: center;
            padding: 10px;
            font-style: italic;
        }
        
        .journal-lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 30px;
            color: white;
            cursor: pointer;
        }
        
        .journal-lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 30px;
            color: white;
            cursor: pointer;
            padding: 10px;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .journal-lightbox-nav:hover {
            opacity: 1;
        }
        
        .journal-lightbox-prev {
            left: 20px;
        }
        
        .journal-lightbox-next {
            right: 20px;
        }
    `;
    
    document.head.appendChild(style);
    
    // Add tag filtering functionality
    const journalTags = document.querySelectorAll('.journal-tag');
    
    journalTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.substring(1); // Remove the # symbol
            
            // If there's a tag filter function on the page, call it
            if (typeof filterJournalByTag === 'function') {
                filterJournalByTag(tagText);
            }
        });
    });
});

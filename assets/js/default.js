document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScroll() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check for items in viewport
    handleScroll();
    
    // Event listener for scroll
    window.addEventListener('scroll', handleScroll);
    
    // For smoother animations on page load
    setTimeout(function() {
        handleScroll();
    }, 100);
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
let quotes = [];
let unusedQuotes = [];

// Load quotes from JSON file
fetch('/assets/data/quotes.json')
  .then(response => response.json())
  .then(data => {
    quotes = data;
    unusedQuotes = [...quotes]; // Initialize unused quote pool
  })
  .catch(error => {
    console.error("Error loading quotes:", error);
  });

// Function to get a non-repeating random quote
function getRandomNonRepeatingQuote() {
  if (unusedQuotes.length === 0) {
    unusedQuotes = [...quotes]; // Reset once all used
  }

  const randomIndex = Math.floor(Math.random() * unusedQuotes.length);
  const quote = unusedQuotes[randomIndex];

  // Remove used quote from the pool
  unusedQuotes.splice(randomIndex, 1);

  return quote;
}

// Function to show the quote with fade animation
function showRandomQuote() {
  if (quotes.length === 0) return;

  const quoteElement = document.getElementById('quote-text');
  if (!quoteElement) return;

  // Fade out
  quoteElement.classList.add('fade-out');

  // Wait for fade-out transition, then change text and fade back in
  setTimeout(() => {
    quoteElement.textContent = getRandomNonRepeatingQuote();
    quoteElement.classList.remove('fade-out');
  }, 500); // Match this to the CSS transition duration
}

// Hook into hamburger toggle
const hamburger = document.getElementById('sidebarToggle'); // Update ID if needed
if (hamburger) {
  hamburger.addEventListener('click', () => {
    showRandomQuote();
  });
}

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in copyright text
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

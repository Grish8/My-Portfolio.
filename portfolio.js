// Portfolio Data
const portfolioData = {
    videos: [
        {
            title: "Corporate Promo Video",
            description: "A professional promotional video edited with smooth transitions, color grading, and motion graphics.",
            tags: ["Premiere Pro", "After Effects", "Color Grading"],
            videoSrc: "sample-video1.mp4",
            thumbnail: "video-thumbnail1.jpg"
        },
        {
            title: "Travel Vlog",
            description: "Edited travel vlog with dynamic cuts, background music synchronization, and text animations.",
            tags: ["Final Cut Pro", "Motion Graphics", "Audio Mixing"],
            videoSrc: "sample-video2.mp4",
            thumbnail: "video-thumbnail2.jpg"
        },
        {
            title: "Event Highlights",
            description: "Highlights reel from a corporate event with multi-camera editing and audio mixing.",
            tags: ["Multi-Camera", "DaVinci Resolve", "Event Coverage"],
            videoSrc: "sample-video3.mp4",
            thumbnail: "video-thumbnail3.jpg"
        },
        {
            title: "Product Commercial",
            description: "Short commercial featuring advanced visual effects and 3D motion graphics integration.",
            tags: ["Visual Effects", "3D Animation", "Commercial"],
            videoSrc: "sample-video4.mp4",
            thumbnail: "video-thumbnail4.jpg"
        },
        {
            title: "Music Video Edit",
            description: "Creative music video editing with rhythm-based cuts and artistic color grading.",
            tags: ["Music Video", "Rhythm Editing", "Color Grading"],
            videoSrc: "sample-video5.mp4",
            thumbnail: "video-thumbnail5.jpg"
        }
    ],
    images: [
        {
            title: "Mountain Landscape",
            description: "Beautiful mountain scenery captured during golden hour with professional color correction.",
            tags: ["Landscape", "Lightroom", "Golden Hour"],
            imageSrc: "photo1.jpg"
        },
        {
            title: "Portrait Session",
            description: "Professional portrait with studio lighting and advanced skin retouching techniques.",
            tags: ["Portrait", "Studio", "Retouching"],
            imageSrc: "photo2.jpg"
        },
        {
            title: "Urban Architecture",
            description: "City architecture shot with attention to lines and symmetry, edited for dramatic effect.",
            tags: ["Architecture", "Urban", "Symmetry"],
            imageSrc: "photo3.jpg"
        },
        {
            title: "Product Shot",
            description: "Clean product photography with professional lighting setup and background removal.",
            tags: ["Product", "Studio", "Lighting"],
            imageSrc: "photo4.jpg"
        },
        {
            title: "Forest Path",
            description: "Nature photography with enhanced colors and detailed focus stacking technique.",
            tags: ["Nature", "Focus Stacking", "Macro"],
            imageSrc: "photo5.jpg"
        },
        {
            title: "Event Coverage",
            description: "Candid event photography with natural lighting and minimal post-processing.",
            tags: ["Event", "Candid", "Natural Light"],
            imageSrc: "photo6.jpg"
        }
    ]
};

// State management
const portfolioState = {
    video: {
        currentPosition: 0,
        speed: 1,
        totalCards: portfolioData.videos.length,
        cardWidth: 350,
        gap: 30,
        isAutoScrollEnabled: false,
        track: null
    },
    image: {
        currentPosition: 0,
        speed: 1,
        totalCards: portfolioData.images.length,
        cardWidth: 350,
        gap: 30,
        isAutoScrollEnabled: false,
        track: null
    }
};

// DOM Elements
const elements = {
    videoTrack: null,
    imageTrack: null,
    videoPrevBtn: null,
    videoNextBtn: null,
    imagePrevBtn: null,
    imageNextBtn: null,
    videoAutoBtn: null,
    imageAutoBtn: null,
    videoSpeedBtn: null,
    imageSpeedBtn: null
};

// Initialize portfolio
function initPortfolio() {
    cacheElements();
    renderPortfolioItems();
    initializeSlides();
    setupEventListeners();
    updateCurrentYear();
}

function cacheElements() {
    elements.videoTrack = document.getElementById('video-track');
    elements.imageTrack = document.getElementById('image-track');
    elements.videoPrevBtn = document.getElementById('video-prev-btn');
    elements.videoNextBtn = document.getElementById('video-next-btn');
    elements.imagePrevBtn = document.getElementById('image-prev-btn');
    elements.imageNextBtn = document.getElementById('image-next-btn');
    elements.videoAutoBtn = document.getElementById('video-auto-btn');
    elements.imageAutoBtn = document.getElementById('image-auto-btn');
    elements.videoSpeedBtn = document.getElementById('video-speed-btn');
    elements.imageSpeedBtn = document.getElementById('image-speed-btn');
}

function renderPortfolioItems() {
    renderVideos();
    renderImages();
}

function renderVideos() {
    const template = document.getElementById('video-card-template');
    
    portfolioData.videos.forEach((video, index) => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.video-card');
        const videoElement = card.querySelector('video source');
        const titleElement = card.querySelector('.card-content h3');
        const descElement = card.querySelector('.card-content p');
        const tagsElement = card.querySelector('.card-tags');
        
        videoElement.src = video.videoSrc;
        titleElement.textContent = video.title;
        descElement.textContent = video.description;
        
        video.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsElement.appendChild(tagElement);
        });
        
        // Add error handling for video
        const videoPlayer = card.querySelector('video');
        videoPlayer.addEventListener('error', () => {
            card.querySelector('.video-container').innerHTML = `
                <div class="loading-placeholder" style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-style: italic;">
                    Video preview not available
                </div>
            `;
        });
        
        elements.videoTrack.appendChild(card);
    });
}

function renderImages() {
    const template = document.getElementById('image-card-template');
    
    portfolioData.images.forEach((image, index) => {
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.image-card');
        const imgElement = card.querySelector('img');
        const titleElement = card.querySelector('.card-content h3');
        const descElement = card.querySelector('.card-content p');
        const tagsElement = card.querySelector('.card-tags');
        
        imgElement.src = image.imageSrc;
        imgElement.alt = image.title;
        titleElement.textContent = image.title;
        descElement.textContent = image.description;
        
        image.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsElement.appendChild(tagElement);
        });
        
        // Add error handling for images
        imgElement.onerror = () => {
            imgElement.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=350&h=250&fit=crop';
            imgElement.alt = 'Sample Landscape Image';
        };
        
        elements.imageTrack.appendChild(card);
    });
}

function initializeSlides() {
    // Get actual card width
    const firstVideoCard = elements.videoTrack.querySelector('.video-card');
    const firstImageCard = elements.imageTrack.querySelector('.image-card');
    
    if (firstVideoCard) {
        portfolioState.video.cardWidth = firstVideoCard.offsetWidth;
        portfolioState.video.track = elements.videoTrack;
    }
    
    if (firstImageCard) {
        portfolioState.image.cardWidth = firstImageCard.offsetWidth;
        portfolioState.image.track = elements.imageTrack;
    }
    
    checkIfAllCardsFit();
    updateNavigationButtons();
}

function checkIfAllCardsFit() {
    const wrapper = document.querySelector('.slides-wrapper');
    
    if (wrapper && elements.videoTrack) {
        const wrapperWidth = wrapper.offsetWidth;
        const totalVideoWidth = (portfolioState.video.cardWidth + portfolioState.video.gap) * portfolioState.video.totalCards - portfolioState.video.gap;
        
        if (totalVideoWidth <= wrapperWidth) {
            portfolioState.video.isAutoScrollEnabled = false;
            elements.videoTrack.classList.remove('auto-scroll');
            elements.videoAutoBtn.disabled = true;
            elements.videoAutoBtn.innerHTML = '<i class="fas fa-ban"></i> <span>All Items Visible</span>';
        }
    }
    
    if (wrapper && elements.imageTrack) {
        const wrapperWidth = wrapper.offsetWidth;
        const totalImageWidth = (portfolioState.image.cardWidth + portfolioState.image.gap) * portfolioState.image.totalCards - portfolioState.image.gap;
        
        if (totalImageWidth <= wrapperWidth) {
            portfolioState.image.isAutoScrollEnabled = false;
            elements.imageTrack.classList.remove('auto-scroll');
            elements.imageAutoBtn.disabled = true;
            elements.imageAutoBtn.innerHTML = '<i class="fas fa-ban"></i> <span>All Items Visible</span>';
        }
    }
}

// Navigation functions
function prevVideoSlide() {
    const wrapper = document.querySelector('#video-editing .slides-wrapper');
    if (!wrapper || !elements.videoTrack) return;
    
    const wrapperWidth = wrapper.offsetWidth;
    const maxScroll = (portfolioState.video.cardWidth + portfolioState.video.gap) * portfolioState.video.totalCards - wrapperWidth;
    
    portfolioState.video.currentPosition = Math.min(portfolioState.video.currentPosition + (portfolioState.video.cardWidth + portfolioState.video.gap), 0);
    elements.videoTrack.style.transform = `translateX(${portfolioState.video.currentPosition}px)`;
    
    updateNavigationButtons();
}

function nextVideoSlide() {
    const wrapper = document.querySelector('#video-editing .slides-wrapper');
    if (!wrapper || !elements.videoTrack) return;
    
    const wrapperWidth = wrapper.offsetWidth;
    const maxScroll = (portfolioState.video.cardWidth + portfolioState.video.gap) * portfolioState.video.totalCards - wrapperWidth;
    
    portfolioState.video.currentPosition = Math.max(portfolioState.video.currentPosition - (portfolioState.video.cardWidth + portfolioState.video.gap), -maxScroll);
    elements.videoTrack.style.transform = `translateX(${portfolioState.video.currentPosition}px)`;
    
    updateNavigationButtons();
}

function prevImageSlide() {
    const wrapper = document.querySelector('#photography .slides-wrapper');
    if (!wrapper || !elements.imageTrack) return;
    
    const wrapperWidth = wrapper.offsetWidth;
    const maxScroll = (portfolioState.image.cardWidth + portfolioState.image.gap) * portfolioState.image.totalCards - wrapperWidth;
    
    portfolioState.image.currentPosition = Math.min(portfolioState.image.currentPosition + (portfolioState.image.cardWidth + portfolioState.image.gap), 0);
    elements.imageTrack.style.transform = `translateX(${portfolioState.image.currentPosition}px)`;
    
    updateNavigationButtons();
}

function nextImageSlide() {
    const wrapper = document.querySelector('#photography .slides-wrapper');
    if (!wrapper || !elements.imageTrack) return;
    
    const wrapperWidth = wrapper.offsetWidth;
    const maxScroll = (portfolioState.image.cardWidth + portfolioState.image.gap) * portfolioState.image.totalCards - wrapperWidth;
    
    portfolioState.image.currentPosition = Math.max(portfolioState.image.currentPosition - (portfolioState.image.cardWidth + portfolioState.image.gap), -maxScroll);
    elements.imageTrack.style.transform = `translateX(${portfolioState.image.currentPosition}px)`;
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const videoWrapper = document.querySelector('#video-editing .slides-wrapper');
    const imageWrapper = document.querySelector('#photography .slides-wrapper');
    
    if (videoWrapper && elements.videoTrack) {
        const wrapperWidth = videoWrapper.offsetWidth;
        const maxVideoScroll = (portfolioState.video.cardWidth + portfolioState.video.gap) * portfolioState.video.totalCards - wrapperWidth;
        
        if (elements.videoPrevBtn) {
            elements.videoPrevBtn.disabled = portfolioState.video.currentPosition >= 0;
        }
        if (elements.videoNextBtn) {
            elements.videoNextBtn.disabled = portfolioState.video.currentPosition <= -maxVideoScroll;
        }
    }
    
    if (imageWrapper && elements.imageTrack) {
        const wrapperWidth = imageWrapper.offsetWidth;
        const maxImageScroll = (portfolioState.image.cardWidth + portfolioState.image.gap) * portfolioState.image.totalCards - wrapperWidth;
        
        if (elements.imagePrevBtn) {
            elements.imagePrevBtn.disabled = portfolioState.image.currentPosition >= 0;
        }
        if (elements.imageNextBtn) {
            elements.imageNextBtn.disabled = portfolioState.image.currentPosition <= -maxImageScroll;
        }
    }
}

// Auto-scroll functions
function toggleVideoAutoScroll() {
    if (portfolioState.video.isAutoScrollEnabled) {
        elements.videoTrack.classList.remove('auto-scroll');
        elements.videoAutoBtn.innerHTML = '<i class="fas fa-play"></i> <span>Start Auto Scroll</span>';
    } else {
        elements.videoTrack.classList.add('auto-scroll');
        elements.videoTrack.style.animationDuration = `${60 / portfolioState.video.speed}s`;
        elements.videoAutoBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Stop Auto Scroll</span>';
    }
    portfolioState.video.isAutoScrollEnabled = !portfolioState.video.isAutoScrollEnabled;
}

function toggleImageAutoScroll() {
    if (portfolioState.image.isAutoScrollEnabled) {
        elements.imageTrack.classList.remove('auto-scroll');
        elements.imageAutoBtn.innerHTML = '<i class="fas fa-play"></i> <span>Start Auto Scroll</span>';
    } else {
        elements.imageTrack.classList.add('auto-scroll');
        elements.imageTrack.style.animationDuration = `${60 / portfolioState.image.speed}s`;
        elements.imageAutoBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Stop Auto Scroll</span>';
    }
    portfolioState.image.isAutoScrollEnabled = !portfolioState.image.isAutoScrollEnabled;
}

// Speed control
function toggleVideoSpeed() {
    if (portfolioState.video.speed === 1) {
        portfolioState.video.speed = 2;
    } else if (portfolioState.video.speed === 2) {
        portfolioState.video.speed = 0.5;
    } else {
        portfolioState.video.speed = 1;
    }
    
    if (portfolioState.video.isAutoScrollEnabled) {
        elements.videoTrack.style.animationDuration = `${60 / portfolioState.video.speed}s`;
    }
    
    elements.videoSpeedBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i> <span>Speed: ${portfolioState.video.speed}x</span>`;
    showNotification(`Video scroll speed: ${portfolioState.video.speed}x`);
}

function toggleImageSpeed() {
    if (portfolioState.image.speed === 1) {
        portfolioState.image.speed = 2;
    } else if (portfolioState.image.speed === 2) {
        portfolioState.image.speed = 0.5;
    } else {
        portfolioState.image.speed = 1;
    }
    
    if (portfolioState.image.isAutoScrollEnabled) {
        elements.imageTrack.style.animationDuration = `${60 / portfolioState.image.speed}s`;
    }
    
    elements.imageSpeedBtn.innerHTML = `<i class="fas fa-tachometer-alt"></i> <span>Speed: ${portfolioState.image.speed}x</span>`;
    showNotification(`Image scroll speed: ${portfolioState.image.speed}x`);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 188, 212, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Video play button functionality
function setupVideoPlayButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.video-play-btn')) {
            const btn = e.target.closest('.video-play-btn');
            const video = btn.parentElement.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                    btn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    btn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }
        }
    });
    
    // Update play buttons when video state changes
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('play', () => {
            const btn = video.parentElement.querySelector('.video-play-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        video.addEventListener('pause', () => {
            const btn = video.parentElement.querySelector('.video-play-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
        });
    });
}

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
        initializeSlides();
        updateNavigationButtons();
    });
    
    // Video play buttons
    setupVideoPlayButtons();
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active') && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.hamburger')) {
                closeMenu();
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Rating modal functions
function rateMe() {
    const modal = document.getElementById('ratingModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('ratingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function submitRating() {
    const selectedRating = document.querySelector('input[name="star"]:checked');
    if (selectedRating) {
        showNotification(`Thank you for your ${selectedRating.value}-star rating!`);
        closeModal();
    } else {
        showNotification('Please select a rating first.');
    }
}

// Email function (placeholder)
function sendEmail(event) {
    event.preventDefault();
    const email = document.getElementById('mail').value;
    if (email) {
        showNotification(`Thank you! We'll contact you at ${email}`);
        document.getElementById('mail').value = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);
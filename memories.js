// ===== MEMORIES PAGE JAVASCRIPT =====

// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
let autoplayInterval;
let isPlaying = true;

const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Initialize carousel
function initCarousel() {
    // Create dots
    createDots();

    // Show first slide
    showSlide(0);

    // Start autoplay
    startAutoplay();

    // Add event listeners
    document.getElementById('prevBtn').addEventListener('click', () => {
        changeSlide(-1);
        resetAutoplay();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        changeSlide(1);
        resetAutoplay();
    });

    document.getElementById('playPauseBtn').addEventListener('click', toggleAutoplay);

    // Pause on hover
    const carouselWrapper = document.getElementById('carouselWrapper');
    carouselWrapper.addEventListener('mouseenter', pauseAutoplay);
    carouselWrapper.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoplay();
    });
}

// Create progress dots
function createDots() {
    const dotsContainer = document.getElementById('carouselDots');

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            showSlide(i);
            resetAutoplay();
        });

        dotsContainer.appendChild(dot);
    }
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Update current slide index
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;

    // Show current slide
    slides[currentSlide].classList.add('active');

    // Update dots
    updateDots();
}

// Update progress dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Change slide
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Start autoplay
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Pause autoplay
function pauseAutoplay() {
    clearInterval(autoplayInterval);
}

// Reset autoplay (stop and start again)
function resetAutoplay() {
    pauseAutoplay();
    if (isPlaying) startAutoplay();
}

// Toggle play/pause
function toggleAutoplay() {
    const btn = document.getElementById('playPauseBtn');

    if (isPlaying) {
        pauseAutoplay();
        btn.textContent = '▶';
        isPlaying = false;
    } else {
        startAutoplay();
        btn.textContent = '⏸';
        isPlaying = true;
    }
}

// ===== LIGHTBOX FUNCTIONALITY =====
const heartPhotos = document.querySelectorAll('.heart-photo');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentPhotoIndex = 0;
const totalPhotos = heartPhotos.length;

// Initialize heart gallery
function initHeartGallery() {
    heartPhotos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showPrevPhoto());
    lightboxNext.addEventListener('click', () => showNextPhoto());

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevPhoto();
            if (e.key === 'ArrowRight') showNextPhoto();
        }
    });
}

// Open lightbox
function openLightbox(index) {
    currentPhotoIndex = index;
    const imgSrc = heartPhotos[index].querySelector('img').src;

    lightboxImage.src = imgSrc;
    updateLightboxCounter();
    lightbox.classList.remove('hidden');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Show previous photo
function showPrevPhoto() {
    currentPhotoIndex--;
    if (currentPhotoIndex < 0) currentPhotoIndex = totalPhotos - 1;

    const imgSrc = heartPhotos[currentPhotoIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
    updateLightboxCounter();
}

// Show next photo
function showNextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex >= totalPhotos) currentPhotoIndex = 0;

    const imgSrc = heartPhotos[currentPhotoIndex].querySelector('img').src;
    lightboxImage.src = imgSrc;
    updateLightboxCounter();
}

// Update lightbox counter
function updateLightboxCounter() {
    lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${totalPhotos}`;
}

// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts-bg');

    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = ['💕', '❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            bottom: -50px;
            font-size: ${20 + Math.random() * 30}px;
            animation: floatUpHeart ${8 + Math.random() * 4}s linear forwards;
            pointer-events: none;
            opacity: 0.6;
        `;
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);
    }, 1000);
}

// Add float up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUpHeart {
        0% {
            bottom: -50px;
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            bottom: 110vh;
            opacity: 0;
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ===== TOUCH SWIPE FOR MOBILE =====
let touchStartX = 0;
let touchEndX = 0;

// Carousel swipe
document.getElementById('carouselWrapper').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('carouselWrapper').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleCarouselSwipe();
});

function handleCarouselSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        changeSlide(1);
        resetAutoplay();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        changeSlide(-1);
        resetAutoplay();
    }
}

// Lightbox swipe
lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleLightboxSwipe();
});

function handleLightboxSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next photo
        showNextPhoto();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous photo
        showPrevPhoto();
    }
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('💕 Memories Page Loaded! 💕');

    // Initialize carousel
    initCarousel();

    // Initialize heart gallery
    initHeartGallery();

    // Start floating hearts
    createFloatingHearts();
});

// ===== SMOOTH SCROLL =====
document.documentElement.style.scrollBehavior = 'smooth';

const images = [
    "https://bouqs.com/blog/wp-content/uploads/2022/03/shutterstock_260182148-min.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/spring-flowers-65de4a13478ee.jpg?crop=0.668xw:1.00xh;0.287xw,0&resize=1200:*",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlyi5dHDLkhDzN2q7iw9Y9Ty7VdlCQoGaCQ&s"
];
let currentImageIndex = 0;
let slideInterval;

const carouselImg = document.getElementById('carousel-img');
const dotsContainer = document.getElementById('dots-container');

// Function to render the correct image and update dots
function updateCarousel(index) {
    carouselImg.src = images[index];

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.remove('bg-blue-500');
        dot.classList.add('bg-gray-400');
        if (i === index) {
            dot.classList.add('bg-blue-500');
        }
    });
}

// Generate navigation dots dynamically
function generateDots() {
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot', 'w-3', 'h-3', 'rounded-full', 'cursor-pointer', 'transition', 'duration-300', 'bg-gray-400', 'hover:bg-blue-300');
        dot.onclick = () => {
            currentImageIndex = index;
            updateCarousel(currentImageIndex);
            resetAutoSlide();
        };
        dotsContainer.appendChild(dot);
    });
    updateCarousel(currentImageIndex); 
}

// Navigation functions
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateCarousel(currentImageIndex);
    resetAutoSlide(); // Ensure auto-slide resets on manual interaction
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarousel(currentImageIndex);
    resetAutoSlide(); // Ensure auto-slide resets on manual interaction
}

// Auto-sliding functionality control
function startAutoSlide() {
    slideInterval = setInterval(nextImage, 5000); // Slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// =========================================================
// JAVASCRIPT FOR TASK 3: FETCH DATA FROM API
// =========================================================

const jokeSetupEl = document.getElementById('joke-setup');
const jokePunchlineEl = document.getElementById('joke-punchline');
const jokeLoaderEl = document.getElementById('joke-loader');
const fetchJokeBtn = document.getElementById('fetch-joke-btn');

// Function to fetch a joke from a public API
async function fetchJoke() {
    const API_URL = 'https://official-joke-api.appspot.com/random_joke';

    // 1. Show loading state
    jokeSetupEl.classList.add('hidden');
    jokePunchlineEl.classList.add('hidden');
    jokeLoaderEl.classList.remove('hidden');
    jokeLoaderEl.classList.add('flex');
    fetchJokeBtn.disabled = true;

    try {
        // 2. Fetch data
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 3. Update UI
        // Clear old classes just in case
        jokeSetupEl.classList.remove('italic'); 
        
        // Use a descriptive prefix to distinguish setup from initial text
        jokeSetupEl.textContent = `Setup: ${data.setup}`;
        jokePunchlineEl.textContent = `Punchline: ${data.punchline}`;

        jokeSetupEl.classList.remove('hidden');

        // Reveal the punchline after a delay for effect
        setTimeout(() => {
            jokePunchlineEl.classList.remove('hidden');
        }, 1500);

    } catch (error) {
        console.error("Failed to fetch joke:", error);
        jokeSetupEl.textContent = "Oops! Failed to load a joke due to an API error. Try again!";
        jokeSetupEl.classList.add('italic'); // Re-add italic for error message
        jokeSetupEl.classList.remove('hidden');
        jokePunchlineEl.classList.add('hidden');
    } finally {
        // 4. Hide loading state and re-enable button
        jokeLoaderEl.classList.add('hidden');
        jokeLoaderEl.classList.remove('flex');
        fetchJokeBtn.disabled = false;
    }
}

// =========================================================
// INITIALIZATION
// =========================================================
window.onload = function() {
    // Initialize Carousel (Task 2)
    generateDots();
    startAutoSlide();

    // Fetch initial Joke (Task 3)
    fetchJoke();
};
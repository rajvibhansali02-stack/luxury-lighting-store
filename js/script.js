// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. App Initialization & Page Load Transition
window.addEventListener("load", () => {
    // Remove loading class to fade out overly
    document.body.classList.remove("loading");
    
    // Initial Hero Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Add a slight delay for the overlay to start fading
    tl.to(".transition-overlay", { opacity: 0, duration: 1.5, ease: "power2.inOut" })
      .to(".hero-bg", { opacity: 0.6, duration: 2 }, "-=1.0")
      .to(".hero-logo", { y: 0, opacity: 1, duration: 1.2 }, "-=1.0")
      .to(".hero-title", { y: 0, opacity: 1, duration: 1.2, letterSpacing: "0.4em" }, "-=0.8")
      .to(".hero-tagline", { opacity: 1, duration: 1 }, "-=0.6")
      .to(".hero-glow", { opacity: 1, filter: "blur(60px)", duration: 2 }, "-=1.0")
      .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");
      
});

// 2. Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 3. Scroll Content Reveal Animations
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((el, index) => {
    // Reset visibility before GSAP takes over
    gsap.set(el, { autoAlpha: 0, y: 50 });
    
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Start when top of element is 85% down viewport
            toggleActions: "play none none reverse" // Play forward on enter, reverse on leave back
        },
        duration: 1.2,
        autoAlpha: 1,
        y: 0,
        ease: "power3.out",
        delay: el.classList.contains("delay-2") ? 0.2 : 
               el.classList.contains("delay-3") ? 0.4 : 
               el.classList.contains("delay-4") ? 0.6 : 0
    });
});

// 4. Parallax Scrolling Effects
// Hero Background Parallax
gsap.to(".hero-bg", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Experience Section Background Parallax
gsap.to(".exp-bg-wrapper", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: ".experience",
        start: "top bottom", // when top of section hits bottom of viewport
        end: "bottom top", // when bottom of section hits top of viewport
        scrub: true
    }
});

// 5. Dynamic Hover Glow Effect on Product Cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const glow = card.querySelector(".card-glow");
        
        // Update position of the glow exactly at cursor
        glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
    
    card.addEventListener("mouseleave", () => {
        const glow = card.querySelector(".card-glow");
        // Reset position to center on leave
        glow.style.transform = `translate(-50%, -50%)`;
    });
});

// 6. Interactive Spotlight in Hero
const heroSection = document.querySelector(".hero");
const ambientGlow = document.getElementById("ambientGlow");

if (heroSection && ambientGlow) {
    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(ambientGlow, {
            x: x,
            y: y,
            duration: 0.4,
            ease: "power2.out"
        });
    });
}

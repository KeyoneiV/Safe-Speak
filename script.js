
// === Imports ===

import { getCookie } from "./utils/CookieHandler.js";

// === Main Script ===

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------
    // 1. Setup for Dynamic Circles
    // ------------------------------------------------------
    const numCircles = 10; // Total number of circles to generate
    const container = document.querySelector('.circle-container');

    // Ensure the container exists before attempting to add circles
    if (!container) {
        console.error('Circle container element not found. Please add <div class="circle-container"></div> to your HTML.');
        return;
    }

    // Get CSS variables to use in JavaScript for consistency
    const rootStyles = getComputedStyle(document.documentElement);
    const circleDuration = parseFloat(rootStyles.getPropertyValue('--circle-anim-duration')) || 8; // Default to 8s

    // ------------------------------------------------------
    // 2. Generate and Position Circles
    // ------------------------------------------------------
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle-background');

        // --- Random Size and Position ---
        // Random size between 400px and 800px
        const size = Math.floor(Math.random() * (800 - 400 + 1) + 400);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Random position across the viewport
        // Positioned using % for responsiveness, centered around a 0-100% range
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        circle.style.left = `${posX}vw`;
        circle.style.top = `${posY}vh`;

        // --- Random Animation Timing ---
        // Random animation duration between 60% and 120% of the base duration
        const durationMultiplier = Math.random() * (1.2 - 0.6) + 0.6;
        circle.style.animationDuration = `${circleDuration * durationMultiplier}s`;

        // Random animation delay to stagger the pulsating effect
        const delay = Math.random() * circleDuration;
        circle.style.animationDelay = `-${delay}s`; // Use negative delay to start them mid-animation

        container.appendChild(circle);
    }
});
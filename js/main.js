import './navbar.js';
import './typing.js';
import './skills.js';
import './projects.js';
import './certificates.js';
import './contact.js';
import './theme.js';
import './resume.js';

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) { progressBar.style.width = scrolled + '%'; }

        const navLinks = document.querySelectorAll('.nav-link');
        const sections = Array.from(navLinks)
            .map(link => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        function updateActiveNav() {
            const scrollPos = window.scrollY + 140; // Offset para hindi ma-late o ma-early ang highlight

            let currentId = sections[0]?.id || '';

            sections.forEach(section => {
                if (section.offsetTop <= scrollPos) {
                    currentId = section.id;
                }
            });

            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${currentId}`;
                link.classList.toggle('active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
        window.addEventListener('load', updateActiveNav);
        updateActiveNav();
    });
});

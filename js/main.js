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
    });
});

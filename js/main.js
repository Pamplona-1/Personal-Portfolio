import './navbar.js';
import './typing.js';
import './skills.js';
import './projects.js';
import './certificates.js';
import './contact.js';
import './theme.js';
import './resume.js';

function initBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    const toggleBtns = document.querySelectorAll('[data-music-toggle]');
    const statusTexts = document.querySelectorAll('.music-status-text');
    const eqContainers = document.querySelectorAll('.music-eq');
    const volumeSlider = document.getElementById('music-volume-slider');
    const volumeLabel = document.getElementById('music-volume-label');
    const muteBtn = document.getElementById('music-mute-btn');
    const floatingPill = document.getElementById('floating-music-pill');

    if (!audio || toggleBtns.length === 0) return;

    audio.loop = true;
    audio.volume = 0.15;
    let lastNonZeroVolume = 0.15;
    let didDragMove = false;

    function syncVolumeUI() {
        const currentVol = audio.muted ? 0 : audio.volume;
        const pct = Math.round(currentVol * 100);

        if (volumeSlider) {
            volumeSlider.value = String(pct);
        }
        if (volumeLabel) {
            volumeLabel.textContent = `${pct}%`;
        }
        if (muteBtn) {
            const volOnIcon = muteBtn.querySelector('.icon-vol-on');
            const volOffIcon = muteBtn.querySelector('.icon-vol-off');
            const isMuted = audio.muted || currentVol === 0;
            if (volOnIcon && volOffIcon) {
                volOnIcon.classList.toggle('hidden', isMuted);
                volOffIcon.classList.toggle('hidden', !isMuted);
            }
        }
    }

    function syncMusicUI(isPlaying) {
        toggleBtns.forEach((btn) => {
            const playIcon = btn.querySelector('.icon-play');
            const stopIcon = btn.querySelector('.icon-stop');
            if (playIcon && stopIcon) {
                playIcon.classList.toggle('hidden', isPlaying);
                stopIcon.classList.toggle('hidden', !isPlaying);
            }
        });

        statusTexts.forEach((el) => {
            el.textContent = isPlaying ? 'Playing on Loop' : 'Paused • Click play';
        });

        eqContainers.forEach((eq) => {
            eq.classList.toggle('is-playing', isPlaying);
        });
    }

    async function playMusic() {
        try {
            await audio.play();
            syncMusicUI(true);
        } catch (err) {
            syncMusicUI(false);
        }
    }

    function pauseMusic() {
        audio.pause();
        syncMusicUI(false);
    }

    toggleBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (didDragMove) {
                didDragMove = false;
                return;
            }
            if (audio.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
    });

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            e.stopPropagation();
            const val = Number(volumeSlider.value) / 100;
            audio.volume = val;
            audio.muted = val === 0;
            if (val > 0) {
                lastNonZeroVolume = val;
            }
            syncVolumeUI();
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.muted || audio.volume === 0) {
                audio.muted = false;
                audio.volume = lastNonZeroVolume > 0 ? lastNonZeroVolume : 0.55;
            } else {
                lastNonZeroVolume = audio.volume > 0 ? audio.volume : 0.55;
                audio.muted = true;
            }
            syncVolumeUI();
        });
    }

    audio.addEventListener('error', () => {
        statusTexts.forEach((el) => {
            el.textContent = 'Check assets/akoangbagyo.mp3';
        });
    });

    // Smooth draggable floating pill with requestAnimationFrame
    if (floatingPill) {
        let isDragging = false;
        let pointerId = null;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let originX = 0;
        let originY = 0;
        let rafId = null;

        function clampOffset(nextX, nextY) {
            const rect = floatingPill.getBoundingClientRect();
            const baseLeft = rect.left - currentX;
            const baseTop = rect.top - currentY;
            const margin = 10;

            const minX = margin - baseLeft;
            const maxX = window.innerWidth - rect.width - margin - baseLeft;
            const minY = margin - baseTop;
            const maxY = window.innerHeight - rect.height - margin - baseTop;

            return {
                x: Math.min(Math.max(nextX, minX), Math.max(minX, maxX)),
                y: Math.min(Math.max(nextY, minY), Math.max(minY, maxY))
            };
        }

        function animatePillPosition() {
            currentX += (targetX - currentX) * 0.24;
            currentY += (targetY - currentY) * 0.24;
            floatingPill.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

            const dist = Math.hypot(targetX - currentX, targetY - currentY);
            if (isDragging || dist > 0.2) {
                rafId = requestAnimationFrame(animatePillPosition);
            } else {
                currentX = targetX;
                currentY = targetY;
                floatingPill.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
                rafId = null;
            }
        }

        function schedulePillFrame() {
            if (!rafId) {
                rafId = requestAnimationFrame(animatePillPosition);
            }
        }

        floatingPill.addEventListener('pointerdown', (e) => {
            if (e.target.closest('button, input')) return;
            isDragging = true;
            didDragMove = false;
            pointerId = e.pointerId;
            startX = e.clientX;
            startY = e.clientY;
            originX = targetX;
            originY = targetY;
            floatingPill.setPointerCapture(pointerId);
            schedulePillFrame();
        });

        floatingPill.addEventListener('pointermove', (e) => {
            if (!isDragging || e.pointerId !== pointerId) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.hypot(dx, dy) > 6) {
                didDragMove = true;
            }
            const clamped = clampOffset(originX + dx, originY + dy);
            targetX = clamped.x;
            targetY = clamped.y;
            schedulePillFrame();
        });

        function endDrag(e) {
            if (!isDragging || e.pointerId !== pointerId) return;
            isDragging = false;
            if (floatingPill.hasPointerCapture(pointerId)) {
                floatingPill.releasePointerCapture(pointerId);
            }
            pointerId = null;
            setTimeout(() => {
                didDragMove = false;
            }, 0);
        }

        floatingPill.addEventListener('pointerup', endDrag);
        floatingPill.addEventListener('pointercancel', endDrag);

        window.addEventListener('resize', () => {
            const clamped = clampOffset(targetX, targetY);
            targetX = clamped.x;
            targetY = clamped.y;
            schedulePillFrame();
        }, { passive: true });
    }

    syncVolumeUI();
    syncMusicUI(false);
}

function initModernInteractions() {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const root = document.documentElement;

    if (!isTouchDevice) {
        let targetX = window.innerWidth * 0.5;
        let targetY = window.innerHeight * 0.25;
        let currentX = targetX;
        let currentY = targetY;

        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        }, { passive: true });

        const syncPointerVars = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            const xPct = ((currentX / Math.max(window.innerWidth, 1)) * 100).toFixed(2);
            const yPct = ((currentY / Math.max(window.innerHeight, 1)) * 100).toFixed(2);
            root.style.setProperty('--mx', `${xPct}%`);
            root.style.setProperty('--my', `${yPct}%`);
            requestAnimationFrame(syncPointerVars);
        };
        requestAnimationFrame(syncPointerVars);
    }

    const bindSpotlight = (el) => {
        if (el.dataset.spotlightBound) return;
        el.dataset.spotlightBound = 'true';

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.setProperty('--spot-x', `${x}px`);
            el.style.setProperty('--spot-y', `${y}px`);
        });
    };

    const enhanceDynamicCards = () => {
        document.querySelectorAll('#skills-grid > div, #projects-grid > div, #certificates-container .grid > div').forEach((card) => {
            card.classList.add('spotlight-card');
            bindSpotlight(card);
        });
    };

    document.querySelectorAll('.spotlight-card').forEach(bindSpotlight);
    enhanceDynamicCards();

    const mainEl = document.querySelector('main');
    if (mainEl) {
        const observer = new MutationObserver(() => {
            enhanceDynamicCards();
        });
        observer.observe(mainEl, { childList: true, subtree: true });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundMusic();
    initModernInteractions();

    const progressBar = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function updateScrollUI() {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

        document.documentElement.style.setProperty('--scroll-y', `${winScroll}px`);

        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }

        const scrollPos = window.scrollY + 140;
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

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('load', updateScrollUI);
    updateScrollUI();
});


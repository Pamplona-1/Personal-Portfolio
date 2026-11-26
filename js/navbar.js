document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink(targetHref) {
        allNavLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === targetHref);
        });
    }

    function updateActiveOnScroll() {
        const scrollPos = window.scrollY + 140;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                setActiveLink(`#${id}`);
            }
        });
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            updateActiveOnScroll();
            const isOpen = mobileMenu.classList.contains('translate-y-0');
            if (isOpen) {
                mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            } else {
                mobileMenu.classList.remove('-translate-y-full', 'opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
            }
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                setActiveLink(link.getAttribute('href'));
                mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
            });
        });
    }

    window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
    updateActiveOnScroll();
});
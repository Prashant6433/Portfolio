// JavaScript for smooth scrolling, active navigation state, and mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const closeMenuButton = document.getElementById('close-menu-button');

    // Toggle mobile sidebar visibility
    mobileMenuButton.addEventListener('click', () => {
        mobileSidebar.classList.add('show');
    });

    closeMenuButton.addEventListener('click', () => {
        mobileSidebar.classList.remove('show');
    });

    // Hide mobile sidebar when a link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileSidebar.classList.remove('show');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer to update active navigation link
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Portfolio filter functionality
    const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Remove 'active' class from all buttons and add to the clicked one
            filterBtns.forEach(b => b.classList.remove('bg-yellow-500', 'text-white'));
            btn.classList.add('bg-yellow-500', 'text-white');

            portfolioItems.forEach(item => {
                item.classList.remove('show');
                if (filter === 'all' || item.classList.contains(filter)) {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                }
            });
        });
    });
});
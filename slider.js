document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (!slider || slides.length === 0) return;

    let slideIndex = 0;
    slides.forEach(s => s.classList.remove('active'));
    slides[slideIndex].classList.add('active');
    slider.style.transition = slider.style.transition || 'transform 0.4s ease';

    const goTo = (index) => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (index + slides.length) % slides.length;
        slides[slideIndex].classList.add('active');
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    };

    const prevSlide = () => goTo(slideIndex - 1);
    const nextSlide = () => goTo(slideIndex + 1);

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    let startX = null;
    slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    slider.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 50) {
            if (dx > 0) prevSlide(); else nextSlide();
            startX = null;
        }
    });
    slider.addEventListener('touchend', () => { startX = null; });
});
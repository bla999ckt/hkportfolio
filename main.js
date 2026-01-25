/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle)
{
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose)
{
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}
      

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader =  () =>{
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_fv1ol9n','template_grx8rym','#contact-form','Tnk1nk_OnvjqRhcYk')
        .then(() =>{
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✔'

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)

            // Clear input fields
            contactForm.reset()

        }, () => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ✗ '
        })
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
        sectionsClass.classList.add('active-link')
    }else{
        sectionsClass.classList.remove('active-link')
    }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 200,
    reset: true //to repeat animations
})

sr.reveal(`.home__data, .experience, .skills, .contact__container, #certificates .work__card`)
sr.reveal(`.home__img`, {delay: 600})
sr.reveal(`.home__scroll`, {delay: 800})
sr.reveal(`.work__card, .services__card`, {interval: 100})
sr.reveal(`.about__content`, {origin: 'right'})
sr.reveal(`.about__img`, {origin: 'left'})

/*=============== CAROUSEL ===============*/
function initCarousels() {
  const carousels = document.querySelectorAll('.work__carousel');
  console.log('Found carousels:', carousels.length);
  
  carousels.forEach((carousel, index) => {
    console.log('Initializing carousel', index);
    const images = carousel.querySelectorAll('.carousel__img');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    
    console.log('Images found:', images.length);
    console.log('Prev btn:', prevBtn);
    console.log('Next btn:', nextBtn);
    console.log('Dots container:', dotsContainer);
    
    if (images.length === 0) return;

    // If only one image is present, show it and hide controls/dots
    if (images.length === 1) {
      images[0].classList.add('active');
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    let currentIndex = 0;
    
    // Create dots
    if (dotsContainer) {
      images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel__dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }
    
    const dots = carousel.querySelectorAll('.carousel__dot');
    
    const updateCarousel = () => {
      images.forEach(img => img.classList.remove('active'));
      images[currentIndex].classList.add('active');
      
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    };
    
    const goToSlide = (i) => {
      currentIndex = i;
      updateCarousel();
    };
    
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    };
    
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    };
    
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    });
    
    // Initialize
    updateCarousel();
  });
}

// Run when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousels);
} else {
  initCarousels();
}
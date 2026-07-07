
console.log('Script loaded');

/*===== menu icon navbar ====*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

/*=====scroll sections active link====*/
let sections = document.querySelectorAll('section, .hero');
let navLinks = document.querySelectorAll('.nav-link');

window.onscroll = () => {
    sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if(top >= offset && top < offset + height){
        navLinks.forEach(links => {
          links.classList.remove('active');
          let activeLink = document.querySelector('.nav-link[href*=' + id + ']');
          if(activeLink) activeLink.classList.add('active');
        });
      };
    });

/*===== remove menu icon navbar when click navbar link (scroll) ====*/
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');

 };

/*======= swiper =======*/
var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      allowTouchMove: true,
      preventInteractionOnTransition: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        touchStart: function(e) {
          e.preventDefault();
        },
        touchMove: function(e) {
          e.preventDefault();
        },
        touchEnd: function() {
          document.body.style.overflow = '';
        }
      }
    });

/*======= dark light mode =======*/
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle('bx-sun');
  document.body.classList.toggle('dark-mode');
};

/*======= scroll reveal =======*/
ScrollReveal({
    reset: true,
    distance: '50px',
    duration: 1500,
    delay: 200
});

ScrollReveal().reveal('.hero-content, .section-header', { origin: 'top' });
ScrollReveal().reveal('.about-content, .services-list, .projects-list, .testimonial-wrapper, .contact-content', { origin: 'bottom' });

/*======= form submission =======*/
document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const FORMSPREE_URL = 'https://formspree.io/f/mnjkrvyl';

    console.log('Form elements:', { submitBtn, nameInput, emailInput, messageInput });

    if(submitBtn) {
        submitBtn.addEventListener('click', async function(e) {
            console.log('Button clicked');
            e.preventDefault();
            
            if(!nameInput.value || !emailInput.value || !messageInput.value) {
                formStatus.textContent = 'Please fill in all fields.';
                formStatus.className = 'form-status error';
                return;
            }
            
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            const formData = new FormData();
            formData.append('name', nameInput.value);
            formData.append('email', emailInput.value);
            formData.append('message', messageInput.value);
            formData.append('_subject', 'New message from your portfolio!');
            
            console.log('Sending to:', FORMSPREE_URL);
            
            try {
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Response data:', result);
                
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'form-status success';
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                } else {
                    formStatus.textContent = result.error || 'Oops! There was a problem sending your message.';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Oops! There was a problem sending your message.';
                formStatus.className = 'form-status error';
            }
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        });
    } else {
        console.error('Submit button not found');
    }
}); 

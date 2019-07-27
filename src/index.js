import '@/css/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'aos/dist/aos.css'

import 'bootstrap'
import '@/js/common'
import AOS from 'aos'
import ParticleSlider from '@/js/ParticleSlider'
import $ from 'jquery'

AOS.init({
    once: true
})

new ParticleSlider({
    ptlGap: 2, // default 0
    ptlSize: 2, // default 1
    width: 1e9,
    height: 1e9,
    mouseForce: 700
})

$(document).ready(function() {
    const svg = $('.carousel-item.active')[0].children[0]
    Array.from(svg.children).forEach(path => {
        const len = path.getTotalLength()
        path.style.strokeDasharray = len
        path.style.strokeDashoffset = len
        setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 1500ms linear'
            path.style.strokeDashoffset = 0
            path.addEventListener('transitionend', removeTransition)
        }, 100)
    })
})

$('#v-carousel').on('slid.bs.carousel', function(e) { // second active 
    const svg = e.relatedTarget.children[0]
    Array.from(svg.children).forEach(path => resetStroke(path))
})

function removeTransition(e) {
    e.target.style.transition = ''
    e.target.removeEventListener('transitionend', removeTransition)
}

function resetStroke(stroke) {
    const len = stroke.getTotalLength()
    stroke.style.strokeDasharray = len
    stroke.style.strokeDashoffset = len
    setTimeout(() => {
        stroke.style.transition = 'stroke-dashoffset 1500ms linear'
        stroke.style.strokeDashoffset = 0
        stroke.addEventListener('transitionend', removeTransition)
    }, 100)
}

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
});
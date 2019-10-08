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

  // show navbar
  $(function() {
    $(window).scroll(function() {

        if ($(this).scrollTop() > 100) {
            $('.navbar').slideDown()
        } else {
            $('.navbar').slideUp()
        }
    })
  })

  // header animation
  const text = $('#header-text-anim').html()
  $('#header-text-anim').html('')
  setTimeout(() => {
    let timerId
    let i = 0
    const animate = () => {
      timerId = setTimeout(function() {
        if (i >= text.length) return clearTimeout(timerId)

        $('#header-text-anim').append(text[i])
        i++
        animate()

      }, 50)
    }
    animate()
  }, 500)

  // slider animation
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
// let object, width, height

// $(document).ready(function() {
//     object = $('.carousel-item.active object')[0]
//     object.addEventListener('load', function objectLoad() {
//         width = $('.carousel-inner').width()
//         height = $('.carousel-inner').height()
//         $('.carousel-item').width(width).height(height)
//         const svg = object.contentDocument.children[0]
//         Array.from(svg.children).slice(1).forEach(path => {
//             const len = path.getTotalLength()
//             path.style.strokeDasharray = len
//             path.style.strokeDashoffset = len
//             setTimeout(() => {
//                 path.style.transition = 'stroke-dashoffset 1500ms linear'
//                 path.style.strokeDashoffset = 0
//                 path.addEventListener('transitionend', removeTransition)
//             }, 0)
//         })
//         object.removeEventListener('load', objectLoad)
//     })
// })

// $(window).resize(function() {
//     $('.carousel-item').width('').height('')
//     width = $('.carousel-inner').width()
//     height = $('.carousel-inner').height()
//     $('.carousel-item').width(width).height(height)
// })

// $('#v-carousel').on('slide.bs.carousel', function(e) { // second active 
//     const object = e.relatedTarget.children[0]
//     object.style.visibility = 'hidden'
//     object.addEventListener('load', function objectLoad() {
//         object.style.visibility = ''
//         const svg = object.contentDocument.children[0]
//         Array.from(svg.children).slice(1).forEach(path => resetStroke(path))
//         object.removeEventListener('load', objectLoad)
//     })
// })

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
    }, 0)
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
          scrollTop: target.offset().top - 200
        }, 1000, function() {
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
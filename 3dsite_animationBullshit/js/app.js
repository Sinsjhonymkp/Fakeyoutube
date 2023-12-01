window.addEventListener('scroll', e =>{
    document.body.style.cssText += `--scrollTop: ${this.scrollY}px`
})
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.content'
})
let animationName = () => {
    gsap.from('.layers__title' , {opacity:-1, duration: 1.5, delay: 0.5, y:-100})
}
animationName();

let animationFirst = () =>{
gsap.from('.main-article__header', {
    scrollTrigger:{
        trigger:'.header',
        start:' top 20px',
        end: 'bottom',
        scrub: 'true',
    },
    opacity:-1,
      delay: 0.5,
       x:-1000
})
}
animationFirst();


let animationSecond = () =>{
    gsap.from('.main-article__paragr', {
        scrollTrigger:{
            trigger:'.header',
            start:'center top',
            end: 'bottom',
            scrub: 'true',
        },
        opacity:-1,
        
           x: 1000
    })
    }
    animationSecond();

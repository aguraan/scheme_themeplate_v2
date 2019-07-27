const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 1e3 / 60)
}
export default function Animate(options) {
    const start = performance.now()
    raf(function animate(time) {
        let timeFraction = (time - start) / options.duration
        if (timeFraction > 1) timeFraction = 1
        let progress = typeof options.timing == 'string' ? Animate[options.timing](timeFraction) : options.timing(timeFraction)
        options.draw(progress)
        if (timeFraction < 1) raf(animate)
    })
}

Animate.linear = timeFraction => timeFraction
Animate.quad = progress => Math.pow(progress, 2)
Animate.circ = timeFraction => 1 - Math.sin(Math.acos(timeFraction))
Animate.back = (x, timeFraction) => Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
Animate.bounce = timeFraction => {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}
Animate.elastic = (x, timeFraction) => Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
Animate.makeEaseOut = timing => timeFraction => 1 - Animate[timing](1 - timeFraction)
Animate.makeEaseInOut = timing => timeFraction => timeFraction < 0.5 ? Animate[timing](2 * timeFraction) / 2 : (2 - Animate[timing](2 * (1 - timeFraction))) / 2
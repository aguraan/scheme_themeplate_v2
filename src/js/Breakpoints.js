function Breakpoints() {}

let defaults = {
    xs: {
        min: 0,
        max: 575.98
    },
    sm: {
        min: 576,
        max: 767.98
    },
    md: {
        min: 768,
        max: 991.98,
    },
    lg: {
        min: 992,
        max: 1199.98
    },
    xl: {
        min: 1200,
        max: Infinity
    }
}

Breakpoints.current = function() {
    for (let key in defaults) {
        let current = window.innerWidth
        if (current <= defaults[key].max && current >= defaults[key].min) return key
    }
}
Breakpoints.is = (size) => size === Breakpoints.current()

export default Breakpoints
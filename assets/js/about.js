let btn_close = document.querySelector(".btn-close");
let poppup = document.querySelector(".poppup");

/* auto hidden */
setTimeout(() => {
    poppup.classList.add("opacity-0");
    setTimeout(() => {
        poppup.classList.add("hidden");
    } , 1000)
}, 5000)

/* manual hidden */
btn_close.addEventListener('click', function () {
    poppup.classList.add("opacity-0");
    setTimeout(() => {
        poppup.classList.add("hidden");
    }, 1000)
})
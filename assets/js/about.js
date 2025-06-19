let poppup = document.querySelector(".poppup");
let btn_close = document.querySelector(".btn-close");

/* Auto hidden Poppup */
setTimeout(() => {
    poppup.classList.add("opacity-0");
    setTimeout(() => {
        poppup.classList.add("hidden");
    }, 500)
}, 5000)

/* close poppup by close_btn */
btn_close.addEventListener('click', function () {
    poppup.classList.add("opacity-0");
    setTimeout(() => {
        poppup.classList.add("hidden");
    }, 500)
})

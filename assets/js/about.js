/* create poppup */
const poppup = (content) => {
    let tag = document.createElement("div");
    tag.className = "text-center py-4 px-2 flex items-center justify-center text-blue-500 relative bg-blue-100 text-sm md:text-base"
    tag.innerHTML = `
        <p>${content}</p>
        <span class="absolute right-5 cursor-pointer btn-close"><i class="fa-solid fa-xmark"></i></span>
    `
    let header = document.querySelector("header");
    header.before(tag);

    /* close poppup automatice */
    setTimeout(() => {
        tag.classList.add("opacity-0");
        setTimeout(() => {
            tag.classList.add("hidden");
        }, 1000)
    }, 5000)

    /* close poppup by close_btn */
    let btn_close = document.querySelector(".btn-close");
    btn_close.addEventListener('click', function () {
        tag.classList.add("opacity-0");
        setTimeout(() => {
            tag.classList.add("hidden");
        }, 700)
    })
}

poppup('Ready to get with the times? Get the skills');

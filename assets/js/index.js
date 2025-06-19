let search_icon = document.querySelector(".search_icon");
let search_input = document.querySelector(".search_input");
let other_search = document.querySelector(".other-search");

/* ===============>>> btn Open Menu <<<=============== */
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

//console.log(mobileMenuButton.children)
if (mobileMenuButton) mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    Array.from(mobileMenuButton.children).forEach(ele => ele.classList.toggle("hidden"))
});

document.addEventListener('click', (event) => {
    if (mobileMenu && mobileMenuButton) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            if (!mobileMenu.classList.contains("hidden")) Array.from(mobileMenuButton.children).forEach(ele => ele.classList.toggle("hidden"))
            mobileMenu.classList.add('hidden');
        }
    }
});
// Toggle user dropdown
const userMenuButton = document.getElementById('user-menu-button');
const userDropdown = document.getElementById('user-dropdown');

userMenuButton.addEventListener('click', () => {
    if (userDropdown) userDropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.add('hidden');
    }
});

/* ==============>>> btn open search <<<============== */
if (search_icon) search_icon.addEventListener('click', function () {
    search_input.classList.toggle("hidden");
    search_input.children[0].classList.toggle("active");
})
/* ================>>> Other search <<<=============== */
if (other_search) other_search.addEventListener('click', function () {
    search_input.classList.toggle("hidden");
    search_input.children[0].classList.toggle("active");
})

document.addEventListener('click', (event) => {
    if (search_icon && search_input) {
        if (!search_icon.contains(event.target) && !search_input.contains(event.target)) {
            search_input.classList.add('hidden');
        }
    }
});
/* ================>>> Focus Data <<<================= */
let focus_data = document.querySelectorAll(".focus_data .data");
let details = document.querySelectorAll(".view_Details img");

if (focus_data) focus_data.forEach(function (ele) {
    ele.addEventListener('click', function () {
        focus_data.forEach(function (focus) {
            focus.classList.remove("border-sky-500");
        })
        details.forEach(function (img) {
            if (img.getAttribute("data") !== ele.getAttribute("focus")) {
                img.classList.add("hidden");
            } else {
                img.classList.remove("hidden");
            }
        })
        this.classList.add("border-sky-500");
    })
})

/* ============>>> options <<<============== */
let options = document.querySelectorAll(".options .option");
options.forEach(function (option) {
    option.addEventListener('click', function () {
        this.children[1].classList.toggle("h-0");
    })
})

/* poppup */
if(document.body.classList.contains("home_page")){
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
            }, 500)
        })
    }

    poppup('The Fota Course has been Recently Provided.');
}

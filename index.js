let menu = document.querySelector("#mobile-menu");
let icon_menu = document.querySelector(".menu-icon")
let user_menu = document.querySelector("[role=menu]")
let user_icon = document.querySelector("#user-menu-button");
let search_icon = document.querySelector(".search_icon");
let search_input = document.querySelector(".search_input");

/* ======= >>> btn Open Menu <<< ============= */

if(icon_menu){
    icon_menu.addEventListener('click',function(){
        if(search_input.children[0].className === "active"){
            search_input.classList.toggle("hidden");
            search_input.children[0].classList.toggle("active");
        }
        if(user_icon.parentElement.parentElement.children[1].children[0].className === "active"){
            user_icon.parentElement.parentElement.children[1].children[0].classList.toggle("active");
            user_menu.classList.toggle("hidden");
        }
        menu.classList.toggle("hidden");
        menu.children[0].classList.toggle("active");
        icon_menu.childNodes[5].classList.toggle("hidden");
        icon_menu.childNodes[7].classList.toggle("hidden");
    })
}

/* ========>>> btn Open The User <<<========== */

user_icon.addEventListener('click' ,function(){
    if(search_input.children[0].className === "active"){
        search_input.classList.toggle("hidden");
        search_input.children[0].classList.toggle("active");
    }
    if(menu.children[0].className === "active"){
        menu.classList.toggle("hidden");
        icon_menu.childNodes[5].classList.toggle("hidden");
        icon_menu.childNodes[7].classList.toggle("hidden");
        menu.children[0].classList.toggle("active");
    }
    user_icon.parentElement.parentElement.children[1].children[0].classList.toggle("active");
    user_menu.classList.toggle("hidden");
})

/* ========>>> btn open search Input <<<======== */
search_icon.addEventListener('click' , function(){
    if(menu.children[0].className === "active"){
        menu.classList.toggle("hidden");
        icon_menu.childNodes[5].classList.toggle("hidden");
        icon_menu.childNodes[7].classList.toggle("hidden");
        menu.children[0].classList.toggle("active");
    }
    if(user_icon.parentElement.parentElement.children[1].children[0].className === "active"){
        user_icon.parentElement.parentElement.children[1].children[0].classList.toggle("active");
        user_menu.classList.toggle("hidden");
    }
    search_input.classList.toggle("hidden");
    search_input.children[0].classList.toggle("active");
})


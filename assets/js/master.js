let menu = document.querySelector("#mobile-menu");
let icon_menu = document.querySelector(".menu-icon")

let user_menu = document.querySelector("[role=menu]")
let user_icon = document.querySelector("#user-menu-button");

if(icon_menu){
    icon_menu.addEventListener('click',function(){
        menu.classList.toggle("hidden");
        icon_menu.childNodes[5].classList.toggle("hidden");
        icon_menu.childNodes[7].classList.toggle("hidden")
    })
}
user_icon.addEventListener('click' ,function(){
    user_menu.classList.toggle("hidden")
})
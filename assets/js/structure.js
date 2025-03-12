let counter = document.querySelectorAll("div .counter");
let scroll_section = document.querySelector(".scroll_section");
let config = false;

let main = document.querySelector(".main");
let section_1 =document.querySelector(".section_1");
let section_2 =document.querySelector(".section_2");
let section_3 =document.querySelector(".section_3");
let section_4 =document.querySelector(".section_4");
let section_5 =document.querySelector(".section_5");
let section_6 =document.querySelector(".section_6");

window.onload = function(){
    main.classList.add("scroll");
    section_1.classList.add("scroll");
}

window.onscroll = function(){
    if(window.scrollY >= section_2.offsetTop - 200){
        section_2.classList.add("scroll");
    }
    if(window.scrollY >= section_3.offsetTop - 200){
        section_3.classList.add("scroll");
    }
    if(window.scrollY >= section_4.offsetTop - 200){
        section_4.classList.add("scroll");
    }
    if(window.scrollY >= section_5.offsetTop - 200){
        section_5.classList.add("scroll");
    }
    if(window.scrollY >= section_6.offsetTop - 600){
        section_6.classList.add("scroll");
    }
    if(window.scrollY >= scroll_section.offsetTop - 400){
        if(!config){
            counter.forEach((ele) => {
                let goal = ele.getAttribute("counter");
                let c =setInterval(() => {
                ele.innerHTML++;
                if(ele.innerHTML == goal){
                    clearInterval(c)
                }
            }, 1000 / goal);
        })
        }
        config = true;
    }
}



const ele_1 = {
    image : "assets/images/image (7).svg",
    h1 : "Become an Instructor",
    p_bold_1 : "Plan your course",
    p_1 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egetnval",
    p_bold_2 : "How we help you",
    p_2 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egeeque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egetnval",
}
const ele_2 = {
    image : "assets/images/image (8).svg",
    h1 : "Instructor Rules",
    p_bold_1 : "Plan your course",
    p_1 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egetnval",
    p_bold_2 : "How we help you",
    p_2 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egeeque convallis a cras",
}
const ele_3 = {
    image : "assets/images/image (9).svg",
    h1 : "Start with Courses",
    p_bold_1 : "Plan your course",
    p_1 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egetnval",
    p_bold_2 : "How we help you",
    p_2 : "Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egeeque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor. Liberoe convallis a cras semper atincidunt egetnval",
}

const links_btn = document.querySelectorAll(".links_ele ul li");
let elements = document.querySelector(".elements");
elements.innerHTML = templete(ele_1.image , ele_1.h1 , ele_1.p_bold_1 , ele_1.p_1 , ele_1.p_bold_2 , ele_1.p_2);

links_btn.forEach(function(ele ,index , arr){
    ele.addEventListener('click' , function(){
        links_btn.forEach(ele => {
            ele.classList.add("non_active_btn");
            ele.classList.remove("active_btn");
        });
        this.classList.remove("non_active_btn");
        this.classList.add("active_btn");
        elements.innerHTML = "";
        if(this.innerHTML === "Become an Instructor"){
            elements.innerHTML = templete(ele_1.image , ele_1.h1 , ele_1.p_bold_1 , ele_1.p_1 , ele_1.p_bold_2 , ele_1.p_2);
        }
        else if(this.innerHTML === "Instructor Rules"){
            elements.innerHTML = templete(ele_2.image , ele_2.h1 , ele_2.p_bold_1 , ele_2.p_1 , ele_2.p_bold_2 , ele_2.p_2);
        }
        else if(this.innerHTML === "Start With Courses"){
            elements.innerHTML = templete(ele_3.image , ele_3.h1 , ele_3.p_bold_1 , ele_3.p_1 , ele_3.p_bold_2 , ele_3.p_2);
        }else{
            elements.innerHTML = templete(ele_1.image , ele_1.h1 , ele_1.p_bold_1 , ele_1.p_1 , ele_1.p_bold_2 , ele_1.p_2);
        }
    })
})

function templete(img , h1 , p_bold_1 ,p_1, p_bold_2 , p_2){
    return(
        `<div class="container lg:flex justify-center items-stretch">
            <div class="w-full lg:w-2/4 px-5 mb-5 text-center lg:text-start">
                <h1 class="font-bold text-2xl md:text-3xl mt-4">${h1}</h1>
                <p class="my-5 font-bold">${p_bold_1}</p>
                <p class="mt-3 text-gray-600 text-sm">${p_1}</p>
                <p class="my-5 font-bold">${p_bold_2}</p>
                <p class="mt-3 text-gray-600 text-sm">${p_2}</p>
            </div>
            <div class="px-10 lg:w-2/4 text-center py-8">
                <img src="${img}" width="85%" height="80%" alt="" class="mx-auto p-9">
            </div>
        </div>`
    )
}


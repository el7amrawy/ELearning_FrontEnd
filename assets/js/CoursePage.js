const videos = [
    {
        "section 1": { 
            "lec 1": {name: "Lec 1", src: "https://youtu.be/qBL71zNtZYQ?si=tIqMqSfm8S2wCKlb"},
            "lec 2": {name: "Lec 2", src: "https://youtu.be/Tr-e8GIt4Ks?si=4cYc8Botb0PcVXqb"},
        }
    },
    {
        "section 2": { 
            "lec 3": {name: "Lec 3", src: "https://youtu.be/ghTN_UzZuT8?si=BlsbV5X6xOaSQISo"},
            "lec 4": {name: "Lec 4", src: "https://youtu.be/6PCW0I22XrQ?si=o5jMjvGXp0eG_HKA"},
        }
    },
    {
        "section 3": { 
            "lec 5": {name: "Lec 5", src: "https://youtu.be/zMg1OSlkHJg?si=p2wXQqlrniiihQBL"},
            "lec 6": {name: "Lec 6", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1"},
        }
    },
    {
        "section 4": { 
            "lec 7": {name: "Lec 7", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1"},
            "lec 8": {name: "Lec 8", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1"},
        }
    }
]

let list_of_videos = document.querySelector(".list_of_videos");
let i = 0;

videos.forEach((video) => {
    let section = ''
    let details = []
    for (const key in video) {
        section = key
        for (const i in video[key]) {
            let spacific_lect = [];
            for (const j in video[key][i]) {
                spacific_lect.push(video[key][i][j]);
            }
            details.push(spacific_lect)
        }
    }
    i++;
    create_list(section , details , i);
})

/* create List Of video in large screens*/
function create_list(section , details , i){
    let title_video = document.createElement("li");
    title_video.className = "title_video";
    title_video.setAttribute("i" , i);
    let btn = document.createElement("button");
    btn.className = "block border rounded-md mt-1 bg-gray-100 w-full text-left p-2";
    btn.appendChild(document.createTextNode(section))
    title_video.appendChild(btn);

    let div = document.createElement("div");
    div.className = "hidden py-2";

    let selector = document.createElement("ul");
    selector.className = "selector_list";
    details.forEach(ele => {
        let li = document.createElement("li");
        li.className = "p-2 flex items-center gap-2 mb-1 cursor-pointer rounded-md transition-all hover:text-sky-500 hover:bg-white";
        li.setAttribute("data-video-src" , ele[1])

        let icon = document.createElement("ion-icon");
        icon.setAttribute("name" , "videocam-outline");
        icon.className = "text-2xl flex-shrink-0";
        li.appendChild(icon);
        li.appendChild(document.createTextNode(ele[0]));
        selector.appendChild(li);
    })
    div.appendChild(selector)
    title_video.appendChild(div);

    list_of_videos.appendChild(title_video)
}

/* create List of videos in small screens */
let List_small_screen = document.querySelector(".Lectures");
let title_video = document.querySelectorAll(".title_video");

title_video.forEach(list => {
    let clonedVideo = list.cloneNode(true)
    List_small_screen.appendChild(clonedVideo);
    let newList = document.querySelectorAll(".Lectures .title_video");

    newList.forEach((list) => {
        list.children[0].addEventListener('click' , function(){
            newList.forEach(e => e.children[1].classList.add("hidden"));
            list.children[1].classList.remove("hidden");
        })
    });

})

let index = 1;
let ID = 0;
let source_of_video = Object.values(videos[0]["section 1"])[0].src;

/* return number of video from sessionStorage */
updateValue();
function updateValue(){
    if(window.sessionStorage.getItem("video_position")){
        let obj = JSON.parse(window.sessionStorage.getItem("video_position"));
        index = obj.num_section;
        ID = obj.num_video;
        source_of_video = obj.source_of_video;
        console.log("HHH")
    }
}
/* select Section */
Array.from(list_of_videos.children).forEach((list , index , array) => {
    list.children[0].addEventListener('click' , function(){
        Array.from(list_of_videos.children).forEach(e => e.children[1].classList.add("hidden"));
        list.children[1].classList.remove("hidden");
    })
})
/* focus video */
let list = document.querySelectorAll(".selector_list");

list.forEach((select) => {
    Array.from(select.children).forEach(function(selected_list , index , array){
        selected_list.addEventListener('click' , function(){
            list.forEach(ele => Array.from(ele.children).forEach(local_ele => local_ele.classList.remove("currentCourse")))
            Array.from(select.children).forEach(ele => ele.classList.remove("currentCourse"))
            this.classList.add("currentCourse");
            source_of_video = this.getAttribute("data-video-src");
            let i = select.parentElement.parentElement.getAttribute("i");
            Store_video_position(i , index , source_of_video);
            changeVideo(source_of_video)
        })
    })
})
/* store number of video in sessionStorage */
function Store_video_position(i , id , source_of_video){
    let obj = {
        "num_section" : i,
        "num_video" : id,
        "source_of_video" : source_of_video,
    }
    window.sessionStorage.setItem("video_position",JSON.stringify(obj));
    updateValue();
};
/*  Show detail Of Video  */
let lists = document.querySelectorAll(".list li");
lists.forEach((list , index) => {
    list.addEventListener('click' , function(){
        lists.forEach(list => {
            list.classList.add("non_active_btn");
            list.classList.remove("active_btn");
        });
        this.classList.remove("non_active_btn");
        this.classList.add("active_btn");
        let focus = this.getAttribute("name");

        Array.from(document.querySelector(".result").children).forEach(function(ele){
            ele.classList.add("hidden")
            if(ele.getAttribute("name") == focus){
                ele.classList.remove("hidden")
            }
        });
    })
})
/* focus video */

select_video(index , ID);
function select_video(i , id){
    let listContainer = document.querySelectorAll(".listContainer");
    listContainer.forEach((list) => {
        
        Array.from(list.children).forEach((ele)=>{
            console.log(ele.getAttribute("i"))
            console.log(i)
            if(ele.getAttribute("i") == i){
                ele.children[1].classList.remove("hidden")
                ele.children[1].children[0].children[id].classList.add("currentCourse");
            }
        })
    })
}

/* =============>>>Videos Library<<<============= */

let player = videojs('youtube-video', {
        techOrder: ["youtube"],
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            type: "video/youtube",
            src: source_of_video
        }],
        youtube: {
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            vq: "hd720"
        }
    })

    player.on('loadedmetadata', function () {
        var youtubePlayer = player.tech().ytPlayer;
        if (youtubePlayer) {
            youtubePlayer.setOption('captions', 'track', {});
            youtubePlayer.setOption('captions', 'fontSize', 0);
        }
    });

function changeVideo(source_of_video) {
    player.src({ type: "video/youtube", src: source_of_video + "&cc_load_policy=0" });
    player.src({ type: "video/youtube", src: source_of_video });
    player.play();
}
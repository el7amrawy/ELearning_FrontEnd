let Content_video = [
    { name: "Lec 1", src: "https://youtu.be/qBL71zNtZYQ?si=tIqMqSfm8S2wCKlb" },
    { name: "Lec 2", src: "https://youtu.be/Tr-e8GIt4Ks?si=4cYc8Botb0PcVXqb" },
    { name: "Lec 3", src: "https://youtu.be/ghTN_UzZuT8?si=BlsbV5X6xOaSQISo" },
    { name: "Lec 4", src: "https://youtu.be/6PCW0I22XrQ?si=o5jMjvGXp0eG_HKA" },
    { name: "Lec 5", src: "https://youtu.be/zMg1OSlkHJg?si=p2wXQqlrniiihQBL" },
    { name: "Lec 6", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1" },
    { name: "Lec 7", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1" },
    { name: "Lec 8", src: "https://youtu.be/SRVtk7YEd6g?si=4r3y3_Wwjy_L3yj1" },
];


/* create List Of Videos */
let list_Of_video = document.querySelector(".list_of_videos");

Content_video.forEach((video) => create_video(video));

function create_video(Videos){
    let li = document.createElement("li");
    li.className = "p-3 flex items-center gap-2 mb-1 cursor-pointer rounded-md transition-all hover:text-sky-500 hover:bg-white";
    li.setAttribute("data-video-src" , Videos.src)

    let icon = document.createElement("ion-icon");
    icon.setAttribute("name" , "videocam-outline");
    icon.className = "text-2xl flex-shrink-0";
    li.appendChild(icon);
    li.appendChild(document.createTextNode(Videos.name));
    
    list_Of_video.appendChild(li);
}

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

let Videos = document.querySelectorAll(".list_of_videos li");
let Lectures = document.querySelector(".Lectures ul");

current = 0;

/* return current from sessionStroge if Exsited */
sessionStorage.getItem("current_video") ? current = sessionStorage.getItem("current_video") : Store_current_video(current)


/* Store current video in sessionStorage */
function Store_current_video(index){
    window.sessionStorage.setItem("current_video" , index);
}

/* update current Value */
function update_current_value(current){
    window.sessionStorage.current_video = current;
    Videos.forEach((video , index,array) => {
        Videos.forEach(video => video.classList.remove("currentCourse"))
        array[current].classList.add("currentCourse");
    });
    Array.from(Lectures.children).forEach((video , index , array) => {
        Array.from(Lectures.children).forEach(video => video.classList.remove("currentCourse"))
        array[current].classList.add("currentCourse");
    });
    changeVideo(current)
}

/* List Of Videos in large Screen */
Videos.forEach((video , index, array) =>{
    let ClonedVideo = video.cloneNode(true);
    Lectures.appendChild(ClonedVideo);
    array[current].classList.add("currentCourse");

    video.addEventListener('click' , function(){
        Videos.forEach(function(video){
            video.classList.remove("currentCourse");
        })
        this.classList.add("currentCourse");
        update_current_value(index);
    });
});

/* List Of Videos in medium Screen */
Array.from(Lectures.children).forEach(function(video , index , array){
    array[current].classList.add("currentCourse");
    video.addEventListener('click' , function(){
        Array.from(Lectures.children).forEach(function(video){
            video.classList.remove("currentCourse");
        })
        this.classList.add("currentCourse");
        update_current_value(index);
    })
})

/* =============>>>Videos Library<<<============= */

    let player = videojs('youtube-video', {
        techOrder: ["youtube"],
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            type: "video/youtube",
            src: Content_video[current].src
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

function changeVideo(index) {
    player.src({ type: "video/youtube", src: Content_video[index].src + "&cc_load_policy=0" });
    player.src({ type: "video/youtube", src: Content_video[index].src });
    player.play();
}
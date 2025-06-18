
const arrayVideo = [];

async function loadData() {
    try {
        const res = await fetch('response.json');
        const data = await res.json();
        arrayVideo.push(data);
    } catch (err) {
        console.error('Fetch error:', err.message);
    }
}
let list_of_videos = document.querySelector(".list_of_videos");

loadData().then(() => {
    // === data ===
    const { instructor, sections, ...playList_details } = arrayVideo[0];
    instructor_details = instructor;
    sections_details = sections;

    collection_video(sections_details, playList_details, instructor_details)

    function collection_video(sections, disc, instructor_info) {
        sections.forEach((section) => {
            create_list(section.name, section.lectures, section.id);
        });
        create_description(disc);
        create_instructor_info(instructor_info)
    }

    /*        create List  (sections & lectures)         */
    /* create List of videos in large screens */
    function create_list(section, details, id) {
        let title_video = document.createElement("li");
        title_video.className = "title_video mb-2 border rounded-lg overflow-hidden";
        title_video.setAttribute("section_Id", id);
        let btn = document.createElement("button");
        btn.className = "block rounded-t-lg p-3 bg-gray-100 w-full cursor-pointer flex justify-between items-center module-header border-b";
        btn.appendChild(document.createTextNode(`Module 1: ${section}`))

        let iconCount = document.createElement("i");
        iconCount.className = "fas fa-chevron-down module-toggle transition-transform duration-200";
        btn.appendChild(iconCount)

        title_video.appendChild(btn);

        let div = document.createElement("div");
        div.className = "hidden px-1";

        let selector = document.createElement("ul");
        selector.className = "selector_list";
        details.forEach(ele => {
            let li = document.createElement("li");
            li.className = "px-3 py-3 block flex justify-between items-center gap-2 mt-1 mb-1 cursor-pointer rounded-md transition-all hover:text-sky-600";
            li.setAttribute("data-video-src", ele.video.url);
            li.setAttribute("sec_id", id)

            let icon = document.createElement("ion-icon");
            icon.className = "fas fa-play-circle flex-shrink-0 mr-3 ml-0";

            let div = document.createElement("div");
            div.className = "whitespace-nowrap overflow-hidden text-ellipsis"
            div.appendChild(icon);
            div.appendChild(document.createTextNode(ele.title))

            li.setAttribute("lecture_Id", ele.id)
            li.appendChild(div);

            const shortDuration = duration_modified(ele.video.duration);
            if (shortDuration) {
                let span = document.createElement("span");
                span.innerHTML = shortDuration;
                span.className = 'ml-auto text-sm'
                li.appendChild(span)
            }

            selector.appendChild(li);
        })
        div.appendChild(selector)
        title_video.appendChild(div);

        list_of_videos.appendChild(title_video);

        open_section(title_video);
    }

    /* create List of videos in small screens */
    function open_section(...title_video) {
        let List_small_screen = document.querySelector(".Lectures");
        title_video.forEach(list => {
            let clonedVideo = list.cloneNode(true)
            List_small_screen.appendChild(clonedVideo);
            let newList = document.querySelectorAll(".Lectures .title_video");

            newList.forEach((list) => {
                list.children[0].addEventListener('click', function () {
                    newList.forEach(e => e.children[1].classList.add("hidden"));
                    list.children[1].classList.remove("hidden");
                })
            });
        })
    }

    /* select section */
    Array.from(list_of_videos.children).forEach((list, index, array) => {
        list.children[0].addEventListener('click', function () {
            Array.from(list_of_videos.children).forEach(e => e.children[1].classList.add("hidden"));
            list.children[1].classList.remove("hidden");
        })
    })

    /* focus video */
    let list = document.querySelectorAll(".selector_list");

    list.forEach((select) => {
        Array.from(select.children).forEach(function (selected_list, index, array) {
            selected_list.addEventListener('click', function () {
                list.forEach(ele => Array.from(ele.children).forEach(local_ele => local_ele.classList.remove("currentCourse")))
                Array.from(select.children).forEach(ele => ele.classList.remove("currentCourse"))
                this.classList.add("currentCourse");

                let lec_id = this.getAttribute("lecture_id");
                let sec_id = this.getAttribute("sec_id");
                let lec_src = this.getAttribute("data-video-src");

                Store_video_position(sec_id, lec_id, lec_src);
                return_position_video();
            })
        })
    })
    return_position_video();
})
/* ========================================================================= */
/* ========================================================================= */

/* store current data in sessionStorage */
function Store_video_position(s_id, l_id, source_of_video) {
    let obj = {
        "section_position": s_id,
        "lecture_position": l_id,
        "source_of_video": source_of_video,
    }
    window.sessionStorage.setItem("video_position", JSON.stringify(obj));
};

/* return number of video from sessionStorage */
function return_position_video() {
    let sec_id;
    let lec_id;
    let src_video
    if (window.sessionStorage.getItem("video_position")) {
        let obj = JSON.parse(window.sessionStorage.getItem("video_position"));

        sec_id = obj.section_position;
        lec_id = obj.lecture_position;
        src_video = obj.source_of_video;

        changeVideo(src_video);
    }
    else {
        sec_id = 1;
        lec_id = 1;
    }
    focus_video(sec_id, lec_id);
}

/* focus video from start */
function focus_video(section_id, lecture_id) {
    let list = document.querySelectorAll(".title_video");
    list.forEach((sec) => {
        if (sec.getAttribute("section_id") == section_id) {
            sec.children[1].classList.remove("hidden");
            Array.from(sec.children[1].children[0].children).forEach((ele) => {
                if (ele.getAttribute("lecture_id") == lecture_id) {
                    ele.classList.add("currentCourse");
                    changeVideo(ele.getAttribute("data-video-src"))
                }
                else {
                    ele.classList.remove("currentCourse")
                }
            })
        }
        else {
            sec.children[1].classList.add("hidden");
        }
    })
}

/*  Show detail Of Video  */
let lists = document.querySelectorAll(".list li");
lists.forEach((list, index) => {
    list.addEventListener('click', function () {
        lists.forEach(list => {
            list.classList.add("non_active_btn");
            list.classList.remove("active_btn");
        });
        this.classList.remove("non_active_btn");
        this.classList.add("active_btn");
        let focus = this.getAttribute("name");

        Array.from(document.querySelector(".result").children).forEach(function (ele) {
            ele.classList.add("hidden")
            if (ele.getAttribute("name") == focus) {
                ele.classList.remove("hidden");
            }
        });
    })
})

/* description */
function create_description(content) {
    let disc = document.querySelector("#discription");

    disc.innerHTML = `
        <h1 class="font-bold mb-2 text-base md:text-xl lg:text-2xl mt-3">${content.title}</h1>
        <p class=" text-sm md:text-base">${content.subTitle}</p>
        <div class="disc  text-sm md:text-base">
            ${content.description}
        </div>
    `
    document.querySelector(".cont video").poster = content.image;
}

/* convert duration */
function duration_modified(duration) {
    let min = 0;
    let hour = 0;
    duration = Number(Math.floor(duration))

    while (duration >= 3600) {
        hour = Math.floor(duration / 3600);
        duration = duration - hour * 3600;
    }
    while (duration >= 60) {
        min = Math.floor(duration / 60);
        duration = duration - min * 60;
    }
    /* convert to 00:00:00 */
    min = min < 10 ? `0${min}` : min;
    hour = hour < 10 ? `0${hour}` : hour;
    duration = duration < 10 ? `0${duration}` : duration;

    return `${hour}:${min}:${duration}`
}
/* Course completion rate */
range(30);

function range(value) {
    let range = document.querySelector(".range");
    range.querySelector("span").innerHTML = `${value}%`

    range.querySelector('#mainProgress').style.width = `${value}%`
}

/* instructor info */
function create_instructor_info(info) {
    document.querySelector(".instructor_info").innerHTML = `
        <div class="px-4 py-8">
            <div class="bg-white">
                <div class="block md:flex items-center">
                    <div class="mr-3 mb-3 flex justify-center">
                        <img class="h-48 w-48 rounded-full object-cover flex-shrink-0 border-4 border-indigo-100"
                            src=${info.image ? info.image : "./assets/files/team-01.png"} alt="imstructor Image">
                    </div>

                    <div class="">
                        <div class="block text-center md:text-left md:flex flex-col px-3">
                            <div>
                                <h1 class="text-3xl font-bold text-gray-800">${info.firstName} ${info.lastName}</h1>
                                <p class="text-gray-600 mt-1 mb-3">Front-End Developer</p>
                            </div>
                            <div class="w-20 rounded-lg text-center mx-auto md:m-0">
                                <p class="text-2xl font-semibold text-blue-600">${info.courseCount}</p>
                                <p class="text-gray-600">Course</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-center md:text-left">
                    ${info.bio ? `<h3 class="text-xl font-semibold text-gray-800">About</h3>
                        <p class="text-gray-600 mt-2 leading-relaxed">${info.bio}</p>` : ""}
                </div>
            </div>
        </div>
    `
}

/* =========================================================== */
/* ===================>>> Videos Library <<<================== */
/* =========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const player = new Plyr('#player');
});

const player = new Plyr('#player', {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
    settings: ['captions', 'quality', 'speed'],
    ratio: '16:9',
    autoplay: false,
    muted: false,
    keyboard: { focused: true, global: false }
});


function changeVideo(videoUrl) {
    const videoElement = document.querySelector('#player');
    if (videoElement.querySelector("source").src !== videoUrl) {
        if (videoElement) {
            videoElement.querySelectorAll('source').forEach((ele) => {
                ele.src = videoUrl
            })
            videoElement.load();
        }
    }
}
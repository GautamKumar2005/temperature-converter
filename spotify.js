console.log("object")
// async function main(){
//     let a=await fetch("https://simpleguics2pygame.readthedocs.io/en/latest/_static/links/snd_links.html")
//     let response=await a.text()
//     let div =document.createElement('div');
//     console.log(response)
//     div.innerHTML=response;
//     let as=document.getElementsByTagName('a');
//     let songs=[];
//     for (let i = 0; i < as.length; i++) {
//         const element = as[i];
//         if(element.href.endsWith(".ogg")){
//             songs.push(element.href);
//         }

        
//     }
//     console.log(songs)
// }
// main();
let songs = [
    ["https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3","jeremy.mp3"],
    ["https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg","mood.mp3"],
    ["https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg","super.mp3"],
    ["http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/lose.ogg","nice.mp3"]
];

let currsong = new Audio();
function secondsToMinutes(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Pad the minutes and seconds with leading zeros if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return minutes + ':' + remainingSeconds;
}
document.addEventListener('DOMContentLoaded', function() {
    let songul = document.querySelector(".songlist").getElementsByTagName('ul')[0];
    let playButton = document.querySelector("#play"); 
    let mee = document.querySelector(".end")// Ensure this matches the ID of your play button
    let songItemsHTML = '';

    for (const song of songs) {
        songItemsHTML += `<li>
                            <img class="front invert" src="https://img.icons8.com/?size=60&id=100059&format=png" alt="">
                            <div class="info">
                                <div class="songname">${song[1]}</div>
                                <div class="artist">Gautam Kumar</div>
                                <div>Play Now</div>
                            </div>
                            <img class="end invert" src="https://img.icons8.com/?size=100&id=25603&format=png" alt="">
                          </li>`;
    }

    songul.innerHTML = songItemsHTML;

    Array.from(songul.getElementsByTagName('li')).forEach((e, index) => {
        e.addEventListener('click', function() {
            currsong.pause();
            currsong.src = songs[index][0];
            currsong.play();
            let singing=songs[index][1];
            document.querySelector(".songinfo").innerHTML=singing;
            document.querySelector(".songtime").innerHTML="00:00/00:00";
            playButton.src = "https://img.icons8.com/?size=60&id=61012&format=png"; // Update play button to pause icon
            // console.log(songs[index][1]); // Log the song name

            currsong.addEventListener("timeupdate",()=>{
                // console.log(currsong.currentTime,currsong.duration);
                document.querySelector(".songtime").innerHTML=`${secondsToMinutes(currsong.currentTime)}/${secondsToMinutes(currsong.duration)}`;
                document.querySelector(".circle").style.left=(currsong.currentTime/currsong.duration)*100+"%";
            })
            
        });
        
    });
    

    playButton.addEventListener('click', () => {
        if (currsong.paused) {
            currsong.play();
            playButton.src = "https://img.icons8.com/?size=60&id=61012&format=png"; // Update play button to pause icon
        } else {
            currsong.pause();
            playButton.src = "https://img.icons8.com/?size=100&id=25603&format=png"; // Update play button to play icon
        }
    });

    // Play the first song automatically when the page is loaded
    currsong.src = songs[0][0];
    document.querySelector(".songinfo").innerHTML = songs[0][1];
    document.querySelector(".songtime").innerHTML = `00:00/02:14`;
    currsong.addEventListener("timeupdate",()=>{
        // console.log(currsong.currentTime,currsong.duration);
        document.querySelector(".songtime").innerHTML=`${secondsToMinutes(currsong.currentTime)}/${secondsToMinutes(currsong.duration)}`;
        document.querySelector(".circle").style.left=(currsong.currentTime/currsong.duration)*100+"%";
    })
    currsong.play();
    playButton.src = "https://img.icons8.com/?size=100&id=25603&format=png"; 
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        const seekbarWidth = e.target.offsetWidth; 
        const clickPosition = e.offsetX;
        const percent = (clickPosition / seekbarWidth) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currsong.currentTime=((currsong.duration)*percent)/100;
    });
    document.querySelector(".humburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left=-100+"%";
    })
});


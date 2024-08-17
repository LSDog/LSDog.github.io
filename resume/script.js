// 谁看谁是猪

var log = console.log;
const demoSong = new Audio("./res/ai^snow.ogg");

demo_audio.onclick = () => {
    if (demoSong.ended || demoSong.paused) {
        demoSong.play();
    } else {
        demoSong.pause();
    }
}
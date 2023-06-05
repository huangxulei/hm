import { Howl, Howler } from "howler";
import EventBus from "./EventBus";
import { PLAY_STATE } from "./Constants";

let singleton = null; //单例模式

export class Player {
    constructor(track) {
        this.currentTrack = track;
    }
    static get() {
        if (!singleton) {
            singleton = new Player();
        }
        return singleton;
    }

    play() {
        let sound = this.currentTrack.howl;
        var self = this;
        if (!sound) {
            sound = this.currentTrack.howl = new Howl({
                src: [this.currentTrack.url],
                html5: true,
                onplay: function () {
                    requestAnimationFrame(self.step.bind(self));
                    EventBus.emit("track-state", PLAY_STATE.PALYING);
                },
                onpause: function () {
                    EventBus.emit("track-state", PLAY_STATE.PAUSE);
                },
                onend: function () {
                    EventBus.emit("track-state", PLAY_STATE.END);
                },
                onseek: function () {
                    requestAnimationFrame(self.step.bind(self));
                },
            });
        }
        sound.play();
    }

    togglePlay() {
        if (!this.currentTrack) return;
        const sound = this.currentTrack.howl;
        if (sound) {
            if (sound.playing()) {
                sound.pause();
            } else {
                sound.play();
            }
        }
    }

    stop() {
        if (!this.currentTrack) return;
        const sound = this.currentTrack.howl;
        if (sound) {
            sound.stop();
        }
    }

    setCurrent(track) {
        this.stop();
        this.currentTrack = track;
    }

    volume(value) {
        Howler.volume(value);
    }

    seek(percent) {
        if (!this.currentTrack) return;
        const sound = this.currentTrack.howl;
        if (sound.playing()) {
            sound.seek(sound.duration() * percent);
        }
    }

    step() {
        if (!this.currentTrack) return;
        const sound = this.currentTrack.howl;
        const seek = sound.seek() || 0; //获取当前播放秒数
        EventBus.emit("track-pos", seek); //去改变秒数
        if (sound.playing()) {
            /*****重点研究****/
            requestAnimationFrame(this.step.bind(this));
        }
    }
}

const player = Player.get();

EventBus.on("track-play", (track) => {
    console.log("track-play");
    player.setCurrent(track);
    player.play();
});
EventBus.on("queue-empty", (volume) => {
    player.stop();
});
EventBus.on("volume-changed", (volume) => {
    player.volume(volume);
});
EventBus.on("track-togglePlay", () => {
    player.togglePlay();
});

EventBus.on("track-seek", (data) => {
    player.seek(data);
});

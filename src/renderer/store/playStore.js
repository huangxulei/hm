import { defineStore } from "pinia";
import { PLAY_STATE, PALY_MODE } from "../../common/Constants";
import EventBus from "../../common/EventBus";
import { Track } from "../../common/Track";
import { toMmss } from "../../common/Times";

const NO_TRACK = new Track(
    0,
    "",
    "听你想听，爱你所爱",
    [{ id: 0, name: "趁青春" }],
    { id: 0, name: "山川湖海，日月星辰" },
    0,
    "default_cover.png"
);
export const usePlayStore = defineStore("play", {
    state: () => ({
        playing: false,
        playingIndex: -1, //当前播放歌曲序列号
        playMode: PALY_MODE.REPEAT_ALL, //播放模式 默认循环
        queueTracks: [], //播放列表
        currentTime: 0, //当前时间
        progress: 0.0, //进度条
        volume: 1, //音量
    }),
    getters: {
        currentTrack(state) {
            //从列表里面获取歌曲
            if (this.playingIndex < 0) return NO_TRACK;
            return this.track(this.playingIndex);
        },
        isCurrentTrack(state) {
            return (track) => {
                return track.id > 0 && state.currentTrack.id == track.id;
            };
        },
        track(state) {
            return (index) => {
                return state.queueTracks[index];
            };
        },
        indexOf(state) {
            return (track) => {
                return state.queueTracks.indexOf(track);
            };
        },
        noTrack() {
            return NO_TRACK;
        },
        mmssCurrentTime() {
            return toMmss(this.currentTime);
        },
        queueTracksSize(state) {
            return state.queueTracks.length;
        },
        hasLyric() {
            const track = this.currentTrack;
            if (!track) return false;
            const lyric = track.lyric;
            if (!lyric) return false;
            return lyric.data.size > 0;
        },
    },

    actions: {
        setPlaying(value) {
            this.playing = value;
        },
        togglePlay() {
            //点击play
            if (this.currentTrack && NO_TRACK != this.currentTrack) {
                this.setPlaying(!this.playing);
                EventBus.emit("track-togglePlay");
            } else {
                this.playNextTrack();
            }
        },
        addTrack(track) {
            if (this.indexOf(track) != -1) return;
            this.queueTracks.push(track);
        },
        addTracks(tracks) {
            this.queueTracks.push(...tracks);
        },
        playNextTrack() {
            const maxSize = this.queueTracksSize;
            switch (this.playMode) {
                case PALY_MODE.REPEAT_ALL:
                    this.playingIndex = ++this.playingIndex % maxSize;
                    break;
                case PALY_MODE.REPEAT_ONE:
                    break;
                case PALY_MODE.RANDOM:
                    this.playingIndex = Math.ceil(Math.random() * maxSize);
                    break;
            }
            EventBus.emit("track-changed", this.currentTrack);
        },
        playTrack(track) {
            console.log("playTrack", track);
            let index = this.indexOf(track); //获取track 所在index
            if (index == -1) {
                //假如不在列表里面
                index = this.playingIndex + 1; //把他排在当前播放的后面,如果没有就是1
                this.queueTracks.splice(index, 0, track); //插入到当前播放的后面
            }
            this.playingIndex = index; //设置为当前播放的标记
            if (track.url && track.url.trim().length > 0) {
                EventBus.emit("track-play", track);
            } else {
                console.log("playTrack no url");
                //EventBus.emit("track-changed", track);
            }
        },
        /**
         * @description: 音量设置
         * @param {*} value
         * @return {*} 0 < value < 1
         */
        updateVolume(value) {
            value = parseFloat(value);
            value = value > 0 ? value : 0;
            value = value < 1 ? value : 1;
            this.volume = value;
        },
    },
});

EventBus.on("track-state", (state) => {
    const { playNextTrack, setPlaying } = usePlayStore();
    switch (state) {
        case PLAY_STATE.PALYING:
            setPlaying(true);
            break;
        case PLAY_STATE.PAUSE:
            setPlaying(false);
            break;
        case PLAY_STATE.END:
            playNextTrack();
            break;
        default:
            break;
    }
});

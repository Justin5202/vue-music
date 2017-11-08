import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false, //播放状态
  fullScreen: false, //界面全屏
  playList: [], //播放列表
  sequenceList: [], //播放模式列表
  mode: playMode.sequence, //播放模式
  currentIndex: -1, //当前播放索引
}

export default state
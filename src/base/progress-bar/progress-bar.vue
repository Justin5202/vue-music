<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner">
			<div class="progress" ref="progress">
				<div class="progress-btn-wrapper" ref="progressBtn"
					 @touchstart.prevent="progressTouchStart"
					 @touchmove.prevent="progressTouchMove"
					 @touchend="progressTouchEnd"
			>
					<div class="progress-btn"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {prefixStyle} from 'common/js/dom'
	//小球的宽度
	const progressBtnWidth = 16
	const transform = prefixStyle('transform')

	export default {
		data() {
			return {}
		},
		props: {
			percent: {
				type: Number,
				default: 0
			},
			fullScreen: {
				type: Boolean,
				default: true
			}
		},
		created() {
			this.touch = {}
		},
		computed: {
			progressBarWidth() {
				if(this.fullScreen) {
					localStorage.setItem('barWidth', this.$refs.progressBar.clientWidth)
				}
				return localStorage.getItem('barWidth')
			}
		},
		methods: {
			progressTouchStart(e) {
				this.touch.initiated = true
				this.touch.startX = e.touches[0].pageX
				//进度条走了多少偏移量
				this.touch.left = this.$refs.progress.clientWidth
			},
			progressTouchMove(e) {
				if(!this.touch.initiated) {
					return
				}
				//拖动的偏移量
				const deltaX = e.touches[0].pageX - this.touch.startX
				const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
				this._offset(offsetWidth)
			},
			progressTouchEnd(e) {
				this.touch.initiated = false
				this._trigglePercent()
			},
			progressClick(e) {
				this._offset(e.offsetX)
				this._trigglePercent()
			},
			_trigglePercent() {
				const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
				const percent = this.$refs.progress.clientWidth / barWidth
				this.$emit('percentChange', percent)
			},
			_offset(offsetWidth) {
				this.$refs.progress.style.width = `${offsetWidth}px`
				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
			}
		},
		watch: {
			percent(newPercent) {
				if(newPercent >= 0 && !this.touch.initiated) {
					//进度条宽度
					const barWidth = this.progressBtnWidth - progressBtnWidth
					//播放时长宽度
					const offsetWidth = newPercent * barWidth
					this._offset(offsetWidth)
				}
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
<template>
	<div class="recommend">
		<div class="recommend-content">
			<div v-if="recommends.length" class="slide-wrapper">
				<slider>
					<div v-for="item in recommends">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" />
						</a>
					</div>
				</slider>
			</div>
		</div>
		<div class="recommend-list">
			<h1 class="list-title">热门歌单推荐</h1>
			<ul></ul>
		</div>
	</div>
</template>

<script>
	import Slider from 'base/slider/slider'
	import {getRecommend} from 'api/recommend'
	import {ERR_OK} from 'api/config'

	export default {
		components: {
			Slider
		},
		data () {
			return {
				recommends: []
			}
		},
		created () {
			this._getRecommend()
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code === ERR_OK) {
						this.recommends = res.data.slider
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	
</style>
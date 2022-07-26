<template>
	<div class="calendar-content">
		<!-- :start-date="'2019-2-10'"
		:end-date="'2019-3-15'" -->
		<text class="calendar-title">日历组件</text>
		<div class="calendar-tags-group">
			<div v-for="(item, index) in tags" :class="{ checked: item.checked }" :key="index" class="calendar-tags" @click="toggle(index, item)">
				<div class="calendar-tags-item">{{ item.name }}</div>
			</div>
		</div>
		<van-button type="info"  class="calendar-button" @click="open">打开日历</van-button>
		<text v-if="timeData.lunar" class="calendar-title">已选日期</text>
		<div v-if="timeData.lunar" class="calendar-info">
			<div>当前选择时间 : {{ timeData.fulldate }}</div>
			<div v-if="tags[0].checked">农历日期 : {{ timeData.year + '年' + timeData.month + '月' + timeData.date + '日 （' + timeData.lunar.astro + ')' }}</div>
			<div v-if="tags[0].checked">
				{{ timeData.lunar.gzYear + '年' + timeData.lunar.gzMonth + '月' + timeData.lunar.gzDay + '日 (' + timeData.lunar.Animal + '年)' }}
				{{ timeData.lunar.IMonthCn + timeData.lunar.IDayCn }} {{ timeData.lunar.isTerm ? timeData.lunar.Term : '' }}
			</div>
		</div>
		<div v-if="show" class="calendar-mask" @click="closeMask">
			<div class="calendar-box" @click.stop="">
				<t-calendar :lunar="tags[0].checked" :fixed-heihgt="tags[1].checked" :slide="slide" :disable-before="tags[6].checked" :start-date="startDate" :end-date="endDate" @change="change" @to-click="toClick" :selected="selected"/>
				<div class="calendar-button-groups">
					<van-button type="default" class="calendar-button-confirm" @click="closeMask">取消</van-button>
					<van-button type="info" class="calendar-button-confirm" @click="confirm">确认</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TCalendar from '@/components/template/Calendar.vue'
    import { Button } from 'vant';

	export default {
		components: {
			TCalendar,
			[Button.name]:Button
		},
		data() {
			/**
			 * 时间计算
			 */
			function getDate(date, AddMonthCount = 0, AddDayCount = 0) {
				if (typeof date !== 'object') {
					date = date.replace(/-/g, '/')
				}
				let dd = new Date(date)
				dd.setMonth(dd.getMonth() + AddMonthCount) // 获取AddDayCount天后的日期
				dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
				let y = dd.getFullYear()
				let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
				let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
				return y + '-' + m + '-' + d
			}
			let tags = [{
					id: 0,
					name: '农历',
					checked: false,
					attr: 'lunar'
				},
				{
					id: 1,
					name: '固定高度',
					checked: false,
					attr: 'fixedHeihgt'
				},
				{
					id: 2,
					name: '垂直滚动',
					checked: false,
					attr: 'vertical'
				},
				{
					id: 3,
					name: '水平滚动',
					checked: false,
					attr: 'horizontal'
				},
				{
					id: 4,
					name: '开始日期(' + getDate(new Date(), -1) + ')',
					checked: false,
					value: getDate(new Date(), -1),
					attr: 'startDate'
				},
				{
					id: 5,
					name: '结束日期(' + getDate(new Date(), 2) + ')',
					value: getDate(new Date(), 2),
					checked: false,
					attr: 'endDate'
				},
				{
					id: 6,
					name: '禁用今天之前的日期',
					checked: false,
					attr: 'disableBefore'
				}
				,
				{
					id: 7,
					name: `日期打点(${getDate(new Date(), 0, 3)},${getDate(new Date(), 0, 4)})`,
					value: [
						{date:getDate(new Date(), 0, 3)},
						{date:getDate(new Date(), 0, 4)}
						],
					checked: false,
					attr: 'date'
				}
				//,
				// {
				// 	id: 7,
				// 	name: '自定义当前日期(' + getDate(new Date(), 1) + ')',
				// 	value: getDate(new Date(), 1),
				// 	checked: false,
				// 	attr: 'date'
				// }
			]

			return {
				show: false,
				tags,
				slide: 'none',
				date: '',
				startDate: '',
				endDate: '',
				timeData: {},
				selected:[
					// {date:"2019-08-10"},
					// {date:"2019-08-11"}
				]
			}
		},
		onLoad() {},
		methods: {
			closeMask() {
				this.show = false
			},
			toggle(index, item) {
				this.tags[index].checked = !item.checked
				// item.checked = !item.checked;
				console.log(index)
				if (index === 2) {
					this.tags[3].checked = false
				}
				if (index === 3) {
					this.tags[2].checked = false
				}
				// this.attribute[item.attr] = !item.checked;
			},
			open() {
				if (this.tags[3].checked) {
					this.slide = 'horizontal'
				} else if (this.tags[2].checked) {
					this.slide = 'vertical'
				} else {
					this.slide = 'none'
				}
				if (this.tags[4].checked) {
					this.startDate = this.tags[4].value
				} else {
					this.startDate = ''
				}
				if (this.tags[5].checked) {
					this.endDate = this.tags[5].value
				} else {
					this.endDate = ''
				}
				if (this.tags[7].checked) {
					this.selected = this.tags[7].value
				} else {
					this.selected = []
				}
				// if (this.tags[7].checked) {
				// 	this.date = this.tags[7].value
				// } else {
				// 	this.date = new Date()
				// }
				this.show = true
				console.log(this.date)
			},
			change(e) {
				console.log('change 返回:', e.fulldate)
				this.timeData = e
			},
			toClick(e) {
				console.log('点击事件', e.fulldate)
				this.timeData = e
			},
			confirm() {
				this.show = false
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
	}

	div {
		font-size: 14px;
		line-height: inherit
	}

	.example {
		padding: 0 15px 15px
	}

	.example-title {
		font-size: 16px;
		line-height: 16px;
		color: #777;
		margin: 20px 12.5px;
		position: relative
	}

	.example .example-title {
		margin: 20px 0
	}

	.example-body {
		padding: 0 20px
	}

	page {
		background: #fff;
	}

	.calendar-content {
		padding: 10px 0;
		padding-bottom: 30px;
		font-size: 13px;
	}

	.calendar-content>.calendar-title {
		line-height: 40px;
		/* font-weight: bold; */
		color: #666;
		font-size: 16px;
		/* border-left: 2px #0d9ebb solid; */
		/* padding-left: 20upx; */
		margin: 0 10px;
	}

	.calendar-tags-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 5px;
	}

	.calendar-tags {
		width: 50%;
		box-sizing: border-box;
	}

	.calendar-tags-item {
		padding: 5px 10px;
		border: 1px rgba(0, 0, 0, 0.2) solid;
		color: #333;
		border-radius: 5px;
		text-align: center;
		margin: 5px;
		background: #f8f8f8;
	}

	.calendar-tags-item:active {
		background: #f8f8f8;
	}

	.checked .calendar-tags-item {
		background: rgb(0, 122, 255);
		color: #fff;
		border: 1px rgba(0, 0, 0, 0.1) solid;
	}

	.calendar-button {
		margin: 5px 10px;
	}

	.calendar-info {
		padding: 0 10px;
	}

	.calendar-mask {
		position: fixed;
		/* #ifdef H5 */
		top: 45px;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		bottom: 0;
		display: flex;
		align-items: center;
		width: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.calendar-box {
		/* margin: 20upx; */
		border: 1px #f5f5f5 solid;
		/* border-radius: 10upx; */
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
	}

	.calendar-button-groups {
		position: absolute;
		width: 100%;
		bottom: 0;
		display: flex;
	}

	.calendar-button-confirm {
		width: 50%;
		margin: 5px;
		border: 1px #eee solid;
		font-size: 16px;
	}

	.calendar-button-confirm:after {
		border: none;
	}
</style>
<template>
	<div>
		<div v-for="(weeks, week) in canlender.weeks" class="t-calender__body-date-week" :key="week">
				<div v-for="(day, index) in weeks" class="t-calender__date" :key="index">
                  <!--作用域插槽-->
                  <slot name="content" :item="{canlender,day,lunar}"></slot>
					<div v-if="!$scopedSlots.content" :class="{
							't-calender__disable': canlender.month !== day.month || day.disable,
							't-calender__date-current':
								(day.date == canlender.date || day.checked) &&
								canlender.month == day.month &&
								!day.disable,
							't-calender__lunar': lunar,
							't-calender__active': day.isDay,
							't-calender__is-day': day.isDay
						}"
					 @click="
							selectDays(
								week,
								index,
								canlender.month === day.month,
								day.disable,
								canlender.lunar
							)
						">
						<div class="t-calender__circle-box">
							{{ day.date }}
							<div v-if="lunar" class="t-calender__lunar">{{ day.lunar }}</div>
							<div v-if="day.have" class="t-calender__data-circle"></div>
						</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 't-calendar-item',
		props: {
			/**
			 * 当前日期
			 */
			canlender: {
				type: null,
				default: () => {
					return {};
				}
			},
			lunar: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		created() {},
		methods: {
			selectDays(week, index, ischeck, isDay, lunar) {
				this.$emit('selectDays', {
					week,
					index,
					ischeck,
					isDay,
					lunar
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.t-calender__body-date-week {
		display: flex;
		width: 100%;
		// border-bottom: 1px #f5f5f5 solid;

		:last-child {
			border: none;
		}

		// 日期的样式
		.t-calender__date {
			position: relative;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #000;
			background: #fff;
			// line-height: 100upx;
			box-sizing: border-box;
			padding: 0;
			line-height: 1.5;

			.t-calender__lunar {
				font-size: 10px;
				color: #000;
			}

			.t-calender__circle-box {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 40px;
				height: 40px;
				flex-shrink: 0;
				border-radius: 50%;
				transition: all 0.2s;
			}

			// &.t-calender__lunar {
			// 	// 			padding: 20upx 0;
			// 	// 			line-height: 1.5;
			// }

			// 本月禁止的样式
			.t-calender__disable {
				color: #d4d4d4;

				.t-calender__lunar {
					color: #d4d4d4;
				}
			}

			// .t-calender__is-day {
			// 	 color: @primary;
			// }

			.t-calender__is-day .t-calender__lunar {
				color: @primary;
			}

			// 当前选中
			.t-calender__date-current {
				// background: #000;
				// color: #fff;
				box-sizing: border-box;

				.t-calender__circle-box {
					background: @neutral-disable-color;
				}

				// .t-calender__active {}

				.t-calender__lunar {
					color: #000;
				}
			}

			.t-calender__data-circle {
				position: absolute;
				// bottom: 10rpx;
				bottom: 3px;
				left: 50%;
  				transform: translate(-50%, 0);
				// margin: auto;
				width: 5px;
				height: 5px;
				border-radius: 50%;
				background: @primary;
				z-index: 2;
			}
		}
	}
</style>

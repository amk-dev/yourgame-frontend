<template>
	<li class="winnings-item">
		<div class="position-wrapper">
			<span class="icon" :style="iconStyle">
				<font-awesome-icon
					v-if="position <= 3"
					icon="trophy"
				></font-awesome-icon>
			</span>
			<span class="position">{{ positionString }}</span>
		</div>
		<span class="money">{{ `${money} INR` }}</span>
	</li>
</template>

<script>
	export default {
		name: 'WinningsItem',
		props: ['position', 'money'],
		computed: {
			positionString() {
				return {
					'1': '1st',
					'2': '2nd',
					'3': '3rd',
					'4': '4th',
					'5': '5th',
					'6': '6th',
					'7': '7th',
					'8': '8th',
					'9': '9th',
				}[this.position]
			},
			iconColor() {
				return {
					'1': '#FFD700',
					'2': '#4C5F6B',
					'3': '#CD7F32',
				}[this.position]
			},
			iconStyle() {
				if (this.iconColor) {
					return {
						color: this.iconColor,
					}
				}

				return {}
			},
		},
	}
</script>

<style>
	.winnings-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.position {
		margin-left: 8px;
		font-weight: bold;
	}
	.money {
		font-weight: bold;
	}
</style>

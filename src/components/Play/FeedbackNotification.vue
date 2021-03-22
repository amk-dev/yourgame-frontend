<template>
	<div class="feedback-notification" :style="stylesBasedOnType">
		<font-awesome-icon class="mr-1" :icon="icon"></font-awesome-icon>
		{{ message }}
	</div>
</template>

<script>
	export default {
		name: 'FeedbackNotifications',
		props: ['type', 'message'],
		computed: {
			stylesBasedOnType: function () {
				const styles = {
					info: {
						background: '#0a85ed',
					},
					danger: {
						background: '#d01937',
					},
				}

				return styles[this.type]
			},
			icon: function () {
				const icons = {
					info: 'check-circle',
					danger: 'times-circle',
				}

				return icons[this.type]
			},
		},
	}
</script>

<style>
	.feedback-notification {
		padding: 4px 12px;
		border-radius: 4px;
		font-size: 14px;
		color: #fff;
		font-weight: 700;
	}
</style>

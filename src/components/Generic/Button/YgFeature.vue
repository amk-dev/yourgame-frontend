<template>
	<div class="yg-feature">
		<span class="icon-text">
			<span class="icon" :style="style">
				<font-awesome-icon :icon="icon"></font-awesome-icon>
			</span>
			<span class="yg-feature-text">{{ text }}</span>
		</span>
	</div>
</template>

<script>
	/* eslint-disable no-console */
	export default {
		name: 'YgFuture',
		props: ['icon', 'text', 'iconColor', 'backgroundColor'],
		computed: {
			style() {
				return {
					color: this.iconColor,
				}
			},
		},
	}
</script>

<style scoped>
	.icon-text {
		flex-wrap: nowrap;
	}
	.yg-feature-text {
		margin-bottom: 4px;
	}
</style>

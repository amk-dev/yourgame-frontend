<template>
	<default-button class="white-button">
		<slot></slot>
	</default-button>
</template>

<script>
	import DefaultButton from './DefaultButton.vue'

	export default {
		name: 'WhiteButton',
		props: ['value'],
		components: {
			DefaultButton,
		},
	}
</script>

<style scoped>
	.white-button {
		background: #fff;
		color: #000;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	}
</style>

<template>
	<default-button class="transparent-button">
		<slot></slot>
	</default-button>
</template>

<script>
	import DefaultButton from './DefaultButton.vue'

	export default {
		name: 'TransparentButton',
		props: ['value'],
		components: {
			DefaultButton,
		},
	}
</script>

<style scoped>
	.transparent-button {
		background: transparent;
		color: #4a4a4a;
	}
</style>

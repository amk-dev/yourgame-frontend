<template>
	<default-button :disabled="disabled" class="black-button">
		<slot></slot>
	</default-button>
</template>

<script>
	import DefaultButton from './DefaultButton.vue'

	export default {
		name: 'BlackButton',
		props: ['value', 'disabled'],
		components: {
			DefaultButton,
		},
	}
</script>

<style scoped>
	.black-button {
		background: #000;
		color: #fff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	}
</style>

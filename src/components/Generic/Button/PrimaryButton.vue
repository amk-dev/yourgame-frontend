<template>
	<default-button :disabled="disabled" class="primary-button">
		<slot></slot>
	</default-button>
</template>

<script>
	import DefaultButton from './DefaultButton.vue'

	export default {
		name: 'PrimaryButton',
		props: ['value', 'disabled'],
		components: {
			DefaultButton,
		},
	}
</script>

<style scoped>
	.primary-button {
		background: #4262ff;
		color: #fff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	}
	.primary-button:disabled {
		background: #b3bfff;
	}
	.primary-button:hover {
		color: #fff;
		background: #002bff;
	}
</style>

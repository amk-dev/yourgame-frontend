<template>
	<button :disabled="disabled" class="is-clickable button">
		<slot></slot>
	</button>
</template>

<script>
	export default {
		name: 'DefaultButton',
		props: ['value', 'disabled'],
	}
</script>

<style scoped>
	button {
		padding: 12px;
		font-size: 18px;
		font-weight: bold;
		border: none;
		border-radius: 6px;
		height: auto;
		min-width: 96px;
	}
	button:disabled {
		cursor: not-allowed !important;
	}
	@media screen and (max-width: 786px) {
		button {
			font-size: 14px;
		}
	}
</style>

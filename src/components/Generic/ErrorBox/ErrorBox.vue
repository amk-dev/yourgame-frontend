<template>
	<div class="error-box mt-2">
		<p v-for="(error, index) in errors" :key="index">
			{{ error.message }}
		</p>
	</div>
</template>

<script>
	export default {
		name: 'ErrorBox',
		props: ['errors'],
	}
</script>

<style>
	.error-box {
		background: #feecf0;
		color: #cc0f35;
		padding: 12px;
	}
</style>

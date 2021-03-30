<template>
	<router-view />
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style>
	html,
	body {
		min-height: 100vh;
		font-family: 'Lato', sans-serif !important;
	}
	body {
		background: #f2f6fc;
	}
	#nprogress .bar {
		height: 4px !important;
	}
</style>

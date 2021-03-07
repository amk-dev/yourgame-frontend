<template>
	<transition :name="name">
		<slot></slot>
	</transition>
</template>
<script>
	export default {
		name: 'YgTransition',
		props: ['name'],
	}
</script>
<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
		transition-timing-function: ease-in-out;
		will-change: opacity;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>

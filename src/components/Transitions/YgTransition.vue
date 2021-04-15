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

	.appear-from-bottom-enter-active,
	.appear-from-bottom-leave-active {
		transition: transform 0.3s;
		transition-timing-function: ease-in-out;
		will-change: transform;
	}

	.appear-from-bottom-enter,
	.appear-from-bottom-leave-to {
		transform: translateY(400px);
	}
</style>

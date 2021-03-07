<template>
	<div class="white-box">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'WhiteBox',
	}
</script>

<style>
	.white-box {
		background: #fff;
		color: #000;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
	}
</style>

<template>
	<div class="joined-text">
		<font-awesome-icon
			class="joined-text-icon mr-1"
			icon="check-circle"
		></font-awesome-icon>
		Joined
	</div>
</template>

<script>
	export default {
		name: 'JoinedText',
	}
</script>

<style>
	.joined-text {
		font-weight: 700;
	}
	.joined-text-icon {
		color: #4262ff;
	}

	@media screen and (max-width: 768px) {
		.joined-text {
			font-size: 14px;
			text-align: center;
		}
	}
</style>

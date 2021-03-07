<template>
	<div class="player-footer">
		<div class="player-footer-title">
			<h2>Whats's On Your Screen</h2>
			<h3>Akash Mohan</h3>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'

	export default {
		name: 'PlayerFooter',
		data: function() {
			return {}
		},
		computed: {},
		components: {
			PrimaryButton,
		},
		methods: {
			showOptions() {
				this.$emit('showOptionsClicked')
			},
		},
		mounted() {},
	}
</script>

<style>
	.yg-control:last-of-type {
		margin-left: 12px;
	}
	.player-footer-title h2,
	.player-footer-title h3 {
		font-weight: 700;
		font-family: 'Lato', sans-serif;
	}
	.player-footer-title h2 {
		font-size: 24px;
	}
	.player-footer-title h3 {
		font-size: 18px;
	}
	.player-footer {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
</style>

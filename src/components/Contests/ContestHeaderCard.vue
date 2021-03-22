<template>
	<div class="game-card">
		<header class="game-card-header">
			<h3>Whats On The Screen</h3>
			<div class="hosted-by">
				<span class="hosted-by-placeholder"> Hosted By </span>
				<figure class="image is-24x24">
					<img
						class="is-rounded"
						src="https://bulma.io/images/placeholders/128x128.png"
					/>
				</figure>
				<span class="host-name">Akash Mohan</span>
			</div>
		</header>
		<div class="game-card-body">
			<h3 class="game-card-description-title">Description</h3>
			<p class="game-card-description">
				Choose What is on the screen from given options
			</p>
		</div>
		<div class="game-card-footer">
			<div class="game-card-left">
				<h2>Win 300 Rs</h2>
				<h4>Entry Fee - 10 Rs</h4>
			</div>
			<div class="game-card-middle">
				<h3>
					<font-awesome-icon
						:icon="['far', 'clock']"
					></font-awesome-icon>
					8 PM
				</h3>
				<h4>
					<font-awesome-icon
						:icon="['far', 'calendar']"
					></font-awesome-icon>
					16 Jan 2021
				</h4>
			</div>
			<div class="game-card-right">
				<primary-button class="game-card-button"
					>Contest Details</primary-button
				>
			</div>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from './../Button/PrimaryButton.vue'

	export default {
		name: 'GameCard',
		components: {
			PrimaryButton,
		},
	}
</script>

<style>
	.game-card {
		background: linear-gradient(90deg, #02aab0, #00cdac);
		padding: 24px 24px 24px 24px;
		color: #fff;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		position: relative;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
	}
	.game-card-header,
	.game-card-body {
		flex-basis: 100%;
	}
	.game-card-header h3 {
		font-size: 18px;
		font-weight: 700;
	}
	.game-card-header,
	.hosted-by {
		display: flex;
	}
	.game-card-header {
		justify-content: space-between;
		align-items: center;
	}
	.hosted-by .hosted-by-placeholder {
		margin-right: 4px;
	}
	.hosted-by .host-name {
		margin-left: 4px;
	}
	.game-card-body {
		margin-top: 24px;
		margin-bottom: 36px;
	}
	.game-card-description-title {
		font-weight: 700;
	}
	.game-card-footer {
		background: #fff;
		color: #000;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: auto;
		position: absolute;
		bottom: -24px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding-left: 18px;
		padding-right: 18px;
	}
	.game-card-footer h2,
	.game-card-footer h3,
	.game-card-footer h4 {
		font-weight: bold;
	}
	.game-card-footer h2 {
		font-size: 18px;
	}
	.game-card-footer h3 {
		font-size: 14px;
	}
	.game-card-footer h4 {
		font-size: 12px;
	}
	.game-card-left,
	.game-card-middle {
		margin-right: 48px;
	}
	.game-card-button {
		font-size: 14px !important;
	}
</style>

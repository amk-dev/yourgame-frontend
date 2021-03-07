<template>
	<white-box class="your-funds-wrapper">
		<h2 class="your-funds-title">Your Money</h2>

		<div class="your-funds mt-4">
			<div class="your-fund-bonus">
				<h3 class="your-fund-section-title">Bonuses</h3>
				<div class="your-fund-section-content mt-2">
					0 <font-awesome-icon icon="rupee-sign"></font-awesome-icon>
				</div>
			</div>
			<div class="your-fund-winnings ml-4">
				<h3 class="your-fund-section-title">Winnings</h3>
				<div class="your-fund-section-content mt-2">
					0 <font-awesome-icon icon="rupee-sign"></font-awesome-icon>
				</div>
			</div>
		</div>

		<primary-button class="add-funds-button mt-4">Add Money</primary-button>
	</white-box>
</template>

<script>
	import WhiteBox from './../components/Generic/WhiteBox/WhiteBox.vue'
	import PrimaryButton from './../components/Generic/Button/PrimaryButton.vue'

	export default {
		name: 'YourFunds',
		props: ['bonus', 'winnings'],
		components: {
			WhiteBox,
			PrimaryButton,
		},
	}
</script>

<style>
	.your-funds-wrapper {
		padding: 24px;
		margin-bottom: 24px;
	}
	.your-funds {
		display: flex;
	}
	.your-funds-title {
		font-size: 18px;
		font-weight: 700;
	}
	.your-fund-section-title {
		color: #949494;
		font-size: 14px;
		font-weight: 700;
	}
	.your-fund-section-content {
		font-size: 24px;
		font-weight: 700;
	}

	.add-funds-button {
		width: 100%;
	}

	@media screen and (max-width: 768px) {
		.your-funds-wrapper {
			display: block;
		}
	}
</style>

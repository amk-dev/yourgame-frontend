<template>
	<div class="signin">
		<div class="container">
			<div class="columns is-marginless is-centered sign-in-columns">
				<div class="column is-3-widescreen is-4-desktop is-5-tablet">
					<brand class="yourgame-brand"></brand>
					<h2 class="sign-in-text">
						Sign In With Your Google Account To Join Contests And
						Start Winning Money
					</h2>
					<div class="yg-box signin-box">
						<div class="yg-features">
							<yg-feature
								v-for="feature in features"
								:text="feature.text"
								:icon="feature.icon"
								:iconColor="feature.color"
								:backgroundColor="feature.backgroundColor"
								:key="feature.id"
							></yg-feature>
						</div>
						<feedback-box
							v-if="signInError"
							class="mt-4"
							:feedback="signInError"
						></feedback-box>
						<google-sign-in-button
							:class="{ 'is-loading': isSigningIn }"
							:disabled="isSigningIn"
							@click.native="signinWithGoogle"
						></google-sign-in-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Brand from '../components/Navigation/Brand.vue'
	import YgFeature from '../components/Generic/Button/YgFeature.vue'
	import GoogleSignInButton from '../components/Generic/Button/GoogleSignInButton.vue'
	import FeedbackBox from '../components/Generic/FeedbackBox/FeedbackBox.vue'
	import { mapGetters } from 'vuex'

	export default {
		name: 'Home',
		components: {
			YgFeature,
			GoogleSignInButton,
			FeedbackBox,
			Brand,
		},
		data: () => {
			return {
				features: [
					{
						id: 1,
						text: 'Simple Live Games',
						icon: 'check-circle',
						color: '#EC615B',
						// backgroundColor: '#fff0ed',
						// color: '#e94e23',
					},
					{
						id: 2,
						text: 'Direct Payouts via UPI',
						icon: 'check-circle',
						color: '#4262FF',
						// backgroundColor: '#f0eefd',
						// color: '#5248b5',
					},
					{
						id: 3,
						text: 'Hosted By Your Favourite Influencers',
						icon: 'check-circle',
						color: '#21B186',
						// backgroundColor: '#ffebf5',
						// color: '#cf3881',
					},
				],
			}
		},
		computed: {
			...mapGetters(['isSigningIn', 'signInError']),
		},
		methods: {
			signinWithGoogle() {
				this.$store.dispatch('signinWithGoogle')
			},
		},
	}
</script>

<style>
	.signin {
		display: flex;
		min-height: 100vh;
		align-items: center;
	}
	.yg-box {
		padding: 24px;
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
		position: relative;
	}
	.signin-box {
		align-items: flex-start;
	}
	.signin-box h3 {
		font-size: 18px;
		font-weight: bold;
	}
	.is-marginless {
		margin: 0 !important;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		justify-content: flex-start;
	}
	.signin-container {
		min-height: 100vh;
	}

	.is-fixed-top {
		position: absolute;
		width: 100%;
		top: 0;
	}
	.yourgame-brand {
		text-align: center;
		margin-bottom: 24px;
	}
	.sign-in-text {
		margin-bottom: 24px;
		text-align: center;
		font-size: 24px;
	}

	.google-signin-button:disabled {
		background: #87b2f8;
	}

	@media screen and (max-width: 768px) {
		.signin {
			align-items: flex-start;
			margin-top: 0;
		}
	}
</style>

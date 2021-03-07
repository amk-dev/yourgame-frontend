<template>
	<default-button class="google-signin-button button">
		<!-- <img
			src="./../../../assets/google-logo.svg"
			alt="google-logo"
			class="image is-48x48"
		/> -->

		<font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
		<span class="signin-text">Sign In With Google</span>
	</default-button>
</template>
``
<script>
	import DefaultButton from './DefaultButton.vue'

	export default {
		name: 'GoogleSignInButton',
		components: {
			DefaultButton,
		},
	}
</script>

<style>
	.google-signin-button {
		background: #4285f4 !important;
		color: #fff !important;
		display: flex;
		align-items: center;
		margin-top: 24px;
		font-size: 18px !important;
		border: none;
		width: 100%;
		cursor: pointer;
	}
	.google-logo {
		display: flex;
		align-items: center;
		flex-grow: 1;
		text-align: center;
	}
	.google-logo figcaption {
		margin-left: auto;
		margin-right: auto;
		flex-basis: 100%;
	}
	.signin-text {
		margin-left: auto;
		margin-right: auto;
	}

	@media screen and (max-width: 786px) {
		.google-signin-button {
			font-size: 14px !important;
		}
	}
</style>

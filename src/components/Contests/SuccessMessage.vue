<template>
	<div
		class="success-message notification is-light mb-4"
		:class="{
			'is-success': isSuccess,
			'is-info': isInfo,
			'is-danger': isDanger,
		}"
	>
		<div class="text">
			<slot></slot>
		</div>

		<template v-if="buttonTitle && buttonLink">
			<router-link v-if="!isExternal" :to="buttonLink">
				<div class="playground-button">
					<primary-button class="is-fullwidth">{{
						buttonTitle
					}}</primary-button>
				</div>
			</router-link>

			<a v-if="isExternal" :href="buttonLink">
				<div class="playground-button">
					<primary-button class="is-fullwidth">{{
						buttonTitle
					}}</primary-button>
				</div>
			</a>
		</template>
	</div>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'

	export default {
		name: 'SuccessMessage',
		props: ['buttonLink', 'buttonTitle', 'type'],
		components: {
			PrimaryButton,
		},
		computed: {
			isInfo() {
				return this.type == 'info'
			},
			isSuccess() {
				return this.type == 'success'
			},
			isDanger() {
				return this.type == 'danger'
			},
			isExternal() {
				return this.buttonLink.indexOf('https://') == 0
			},
		},
	}
</script>

<style>
	.success-message {
		display: flex;
	}
	.playground-button {
		margin-left: 12px;
	}

	@media screen and (max-width: 786px) {
		.success-message {
			display: block;
		}
		.playground-button {
			margin-left: 0;
			margin-top: 18px;
		}
	}
</style>

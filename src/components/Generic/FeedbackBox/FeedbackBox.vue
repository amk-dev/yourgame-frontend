<template>
	<yg-transition name="fade">
		<div class="field">
			<div
				class="notification is-light"
				:class="{
					'is-success': feedback.type == 'success',
					'is-danger': feedback.type == 'error',
					'is-info': feedback.type == 'info',
				}"
			>
				{{ feedback.message }}
			</div>
		</div>
	</yg-transition>
</template>

<script>
	import YgTransition from '../../Transitions/YgTransition.vue'

	export default {
		name: 'FeedbackBox',
		props: ['feedback'],
		components: {
			YgTransition,
		},
	}
</script>

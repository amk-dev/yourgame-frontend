<template>
	<yg-transition name="fade">
		<YgModal class="new-contest-modal">
			<div class="new-contest-modal-header">
				<h2 class="new-contest-modal-title">Create New Contest</h2>
			</div>
			<div class="new-contest-model-body mt-4">
				<new-contest-form
					@closeModal="hideNewContestForm"
				></new-contest-form>
			</div>
		</YgModal>
	</yg-transition>
</template>

<script>
	import YgTransition from '../components/Transitions/YgTransition.vue'
	import YgModal from '../components/Generic/Modal/YgModal.vue'
	import NewContestForm from '../components/Contests/NewContestForm.vue'

	export default {
		name: 'NewContest',
		components: {
			YgTransition,
			YgModal,
			NewContestForm,
		},
		methods: {
			hideNewContestForm() {
				this.$router.push('/games/created')
			},
		},
	}
</script>

<style></style>

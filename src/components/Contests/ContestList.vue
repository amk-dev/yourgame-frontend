<template>
	<div class="contest-list">
		<div class="section-header">
			<h3 class="section-header-title" v-if="haveContests">
				{{ title }}
			</h3>
			<primary-button
				@click.native="showNewContestForm"
				v-if="type == 'creator'"
			>
				<font-awesome-icon icon="plus" class="mr-3"></font-awesome-icon>
				New Contest
			</primary-button>
		</div>

		<div class="section-body" v-if="clickable">
			<router-link
				v-for="contest in contests"
				:key="contest._id"
				:to="`/contest/${contest._id}`"
			>
				<game-card
					class="mb-6"
					v-for="contest in contests"
					:key="contest._id"
					:contest="contest"
				></game-card>
			</router-link>
		</div>

		<div class="section-body" v-if="!clickable">
			<game-card
				class="mb-6"
				v-for="contest in contests"
				:key="contest._id"
				:contest="contest"
			></game-card>
		</div>

		<div class="no-contests" v-if="!haveContests">
			<font-awesome-icon
				class="no-contests-icon"
				icon="gamepad"
			></font-awesome-icon>
			<h3 class="no-contests-feedback">
				You Have Not Joined Any Contests Yet.
			</h3>
			<router-link to="/games/all">
				<primary-button class="mt-5">
					Join Your First Contest
				</primary-button>
			</router-link>
		</div>

		<yg-transition name="fade">
			<YgModal class="new-contest-modal" v-if="newContestFormVisible">
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
	</div>
</template>

<script>
	import GameCard from './../../components/Generic/GameCard/GameCard.vue'
	import PrimaryButton from './../../components/Generic/Button/PrimaryButton.vue'
	import YgModal from './../../components/Generic/Modal/YgModal.vue'
	import NewContestForm from './../../components/Contests/NewContestForm.vue'
	import YgTransition from '../Transitions/YgTransition.vue'

	export default {
		name: 'ContestList',
		props: ['title', 'type', 'contests', 'clickable'],
		data: function() {
			return {
				newContestFormVisible: false,
			}
		},
		computed: {
			haveContests() {
				return !!this.contests.length
			},
		},
		methods: {
			showNewContestForm() {
				this.newContestFormVisible = true
			},
			hideNewContestForm() {
				this.newContestFormVisible = false
			},
		},
		components: {
			GameCard,
			PrimaryButton,
			YgModal,
			NewContestForm,
			YgTransition,
		},
	}
</script>

<style>
	.section-header {
		margin-bottom: 24px;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.section-header-title {
		font-size: 18px;
		font-weight: 700;
	}
	.new-contest-modal-title {
		font-size: 24px;
		font-weight: 700;
	}
	.confirm-new-contest-modal-title {
		font-size: 18px;
		font-weight: 700;
	}
	.no-contests {
		text-align: center;
	}
	.no-contests-feedback {
		font-size: 18px;
		font-weight: 700;
		color: #808080;
	}
	.no-contests-icon {
		font-size: 96px;
		color: #d9d9d9;
	}

	@media screen and (max-width: 768px) {
		.section-header {
			margin-bottom: 12px;
		}
		.section-header-title {
			font-size: 14px;
		}
	}
</style>

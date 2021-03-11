<template>
	<div class="contest-list">
		<div class="section-header">
			<h3 class="section-header-title">
				{{ title }}
			</h3>
			<router-link to="/games/new" v-if="type == 'creator'">
				<primary-button>
					<font-awesome-icon
						icon="plus"
						class="mr-3"
					></font-awesome-icon>
					New Contest
				</primary-button>
			</router-link>
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
	</div>
</template>

<script>
	import GameCard from './../../components/Generic/GameCard/GameCard.vue'
	import PrimaryButton from './../../components/Generic/Button/PrimaryButton.vue'

	export default {
		name: 'ContestList',
		props: ['title', 'type', 'contests', 'clickable'],
		components: {
			GameCard,
			PrimaryButton,
		},
	}
</script>

<style>
	.section-header {
		margin-bottom: 24px;
		display: flex;
		justify-content: space-between;
		align-items: center;
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

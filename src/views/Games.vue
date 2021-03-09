<template>
	<div class="container">
		<div class="wrapper">
			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-10">
					<navbar></navbar>
				</div>
			</div>

			<div class="columns is-gapless is-centered is-marginless">
				<div class="column is-5">
					<div class="all-games">
						<div class="all-games-section">
							<contest-list
								:contests="contests"
								:title="contestsTitle"
								:clickable="true"
								:type="this.creator ? 'creator' : 'user'"
							></contest-list>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Navbar from '../components/Navigation/NavBar.vue'
	import ContestList from '../components/Contests/ContestList.vue'

	export default {
		name: 'Games',
		props: ['contests', 'contestsTitle', 'creator'],
		components: {
			Navbar,
			ContestList,
		},
	}
</script>

<style>
	.wrapper {
		justify-content: flex-start;
		padding: 0px 24px;
	}
	.all-games {
		margin-top: 48px;
	}
	@media screen and (max-width: 768px) {
		.all-games {
			margin-top: 0 !important;
		}
	}
</style>

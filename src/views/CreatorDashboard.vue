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
					<div class="dashboard">
						<div class="dashboard-section">
							<contest-list
								title="Contests By You"
								type="creator"
								:contests="[]"
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
		name: 'Home',
		components: {
			Navbar,
			ContestList,
		},
	}
</script>

<style scoped>
	.wrapper {
		justify-content: flex-start;
	}
	.dashboard {
		margin-top: 48px;
	}
</style>

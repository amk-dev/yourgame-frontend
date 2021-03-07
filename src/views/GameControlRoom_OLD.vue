<template>
	<div class="game-control-room">
		<div class="columns columns-main">
			<div class="column is-3 leaderboard">
				<leaderboard
					type="control-room"
					class="control-room-leaderboard"
				></leaderboard>
			</div>
			<div class="column is-3 question-area">
				<control-room-quiz></control-room-quiz>
			</div>
			<div class="column is-3 host-video"></div>
		</div>
	</div>
</template>

<script>
	import Leaderboard from './../components/Contests/LeaderBoard.vue'
	import ControlRoomQuiz from './../components/ControlRoom/ControlRoomQuiz.vue'
	export default {
		name: 'GameControlRoom',
		components: {
			Leaderboard,
			ControlRoomQuiz,
		},
	}
</script>

<style scoped>
	.game-control-room {
		min-height: 100vh;
		background: linear-gradient(90deg, #02aab0, #00cdac);
	}
	.game-control-room .columns-main {
		margin: 0 !important;
		padding: 24px;
		min-height: 100vh;
	}
</style>

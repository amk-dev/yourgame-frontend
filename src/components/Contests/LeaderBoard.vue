<template>
	<div class="leaderboard">
		<div class="leaderboard-header">
			<div class="leader-board-left">
				<h3 :style="controlRoomStyles">Top 10</h3>
			</div>
			<!-- <div class="leaderboard-right" v-if="type != 'control-room'">
				<a href="#">See All Of Leaderboard</a>
			</div> -->
		</div>
		<div class="leaderboard-body">
			<ul class="leaderboard-list mt-5" v-if="!isLeaderboardEmpty">
				<leaderboard-item
					:type="type"
					v-for="leaderboardentry in leaderboard"
					:name="leaderboardentry.displayName"
					:key="leaderboardentry.uid"
					:points="leaderboardentry.points"
					:time="leaderboardentry.timeTaken"
					:profilePicture="leaderboardentry.picture"
				></leaderboard-item>
			</ul>

			<div class="leaderboard-empty-state mt-5" v-if="isLeaderboardEmpty">
				<div class="leaderboard-empty-icon">
					<font-awesome-icon icon="list-ol"></font-awesome-icon>
				</div>
				<h2>
					{{
						context == 'game-control-room'
							? 'No Answers Yet'
							: 'Contest Not Started Yet'
					}}
				</h2>
			</div>
		</div>
	</div>
</template>

<script>
	import LeaderboardItem from './../Leaderboard/LeaderboardItem.vue'
	export default {
		name: 'Leaderboard',
		props: ['type', 'leaderboard', 'context'],
		components: {
			LeaderboardItem,
		},
		computed: {
			controlRoomStyles() {
				if (this.type == 'control-room') {
					return {
						'font-size': '24px',
					}
				}
				return {}
			},
			isLeaderboardEmpty() {
				return this.leaderboard.length == 0
			},
		},
	}
</script>

<style scoped>
	.leaderboard {
		background: #fff;
		padding: 24px;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
	}
	.leaderboard h3 {
		font-size: 18px;
		font-weight: 700;
	}
	.leaderboard-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.leaderboard-body {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
	}
	.leaderboard-right a {
		font-size: 14px;
		font-weight: 700;
	}
	.leaderboard-list {
		width: 100%;
	}
	.leaderboard-list li {
		margin-bottom: 12px;
	}
	.leaderboard-empty-state h2 {
		font-size: 18px;
		font-weight: 700;
		color: #c9c9c9;
	}
	.leaderboard-empty-icon {
		font-size: 56px;
		text-align: center;
		color: #c9c9c9;
	}
</style>

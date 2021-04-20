<template>
	<li class="leaderboard-item" :style="controlRoomStyles">
		<div class="name-and-avatar">
			<figure class="image profile-picture is-32x32">
				<img
					class="is-rounded"
					:src="profilePicture"
					:alt="`${name} profile image`"
					referrerpolicy="no-referrer"
				/>
			</figure>
			<h3 class="name">{{ name }}</h3>
		</div>
		<div class="stats">
			<h3 class="points">{{ `${points} Points` }}</h3>
			<h3 class="time ml-2">{{ `${time / 1000} s` }}</h3>
		</div>
	</li>
</template>

<script>
	export default {
		name: 'LeaderboardItem',
		props: ['name', 'points', 'time', 'profilePicture', 'type'],
		computed: {
			controlRoomStyles() {
				if (this.type == 'control-room') {
					return {
						'font-size': '18px',
					}
				}
				return {}
			},
		},
	}
</script>

<style scoped>
	.leaderboard-item {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
	}
	.name-and-avatar,
	.stats {
		display: flex;
		align-items: center;
	}
	.leaderboard-item:last-of-type {
		margin-bottom: 0 !important;
	}
	.name,
	.points,
	.time {
		font-weight: 700;
	}
	.name {
		margin-left: 8px;
	}
</style>

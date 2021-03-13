<template>
	<div
		class="columns is-centered is-gapless is-fullheight-not-mobile is-marginless"
	>
		<div class="column is-9">
			<figure class="image is-16by9 is-fullheight-not-mobile">
				<iframe
					v-if="contestYoutubeLiveUrl"
					class="has-ratio"
					:src="contestYoutubeLiveUrl"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
			</figure>
		</div>
		<div class="column is-3">
			<answer-buttons
				class="player-video-answer-buttons"
				v-on="$listeners"
			></answer-buttons>
		</div>
	</div>
</template>

<script>
	import AnswerButtons from './../components/Play/AnswerButtons.vue'

	import { mapGetters } from 'vuex'

	export default {
		name: 'Play',
		components: {
			AnswerButtons,
		},
		data: function() {
			return {
				isFullscreen: false,
				optionsVisible: false,
			}
		},
		computed: {
			...mapGetters(['contestYoutubeLiveUrl']),
		},
		mounted() {
			this.$store.dispatch(
				'getSingleContest',
				this.$route.params.contestId
			)
		},
	}
</script>

<style>
	body {
		background: #f2f6fc;
	}

	@media screen and (min-width: 768px) {
		.is-fullheight-not-mobile {
			min-height: 100vh;
		}
	}

	@media screen and (max-width: 768px) {
		.play-navbar {
			display: none;
		}
	}
</style>

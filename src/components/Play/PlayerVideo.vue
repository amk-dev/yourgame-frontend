<template>
	<div class="player-video">
		<div class="columns is-flex-tablet is-flex-wrap-wrap">
			<div class="column is-9 have-no-padding-mobile">
				<figure class="image is-16by9">
					<iframe
						v-if="contestYoutubeLiveUrl"
						class="has-ratio"
						:src="contestYoutubeLiveUrl"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</figure>
			</div>
			<div class="column is-3 have-no-padding-mobile">
				<answer-buttons
					class="player-video-answer-buttons"
					v-show="optionsVisible"
					v-on="$listeners"
				></answer-buttons>
			</div>
			<div class="column is-12 is-hidden-mobile">
				<div class="player-footer">
					<div class="player-footer-title">
						<h2>Whats's On Your Screen</h2>
						<h3>With Akash Mohan</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AnswerButtons from './AnswerButtons.vue'

	export default {
		name: 'PlayerVideo',
		props: ['optionsVisible'],
		components: {
			AnswerButtons,
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
	.player-video {
		position: relative;
	}
	.player-footer-title h2,
	.player-footer-title h3 {
		font-weight: 700;
		font-family: 'Lato', sans-serif;
	}
	.player-footer-title h2 {
		font-size: 24px;
	}
	.player-footer-title h3 {
		font-size: 18px;
	}
	@media screen and (max-width: 786px) {
		.have-no-padding-mobile {
			padding: 0 !important;
		}
		.columns {
			margin: 0 !important;
		}
		.column {
			padding: 0 !important;
		}
	}
</style>

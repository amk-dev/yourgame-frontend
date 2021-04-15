<template>
	<div
		class="columns play-wrapper is-centered is-gapless is-fullheight-not-mobile is-marginless"
	>
		<div class="column is-3 video-column">
			<figure class="image is-9by16 video-iframe">
				<iframe
					v-if="contestYoutubeLiveUrl"
					class="has-ratio"
					:src="contestYoutubeLiveUrl"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>

				<figcaption class="answer-area">
					<yg-transition name="appear-from-bottom">
						<answer-buttons
							v-show="optionsVisible"
							class="player-video-answer-buttons"
							v-on="$listeners"
							@hideOptions="hideOptions"
						></answer-buttons>
					</yg-transition>
				</figcaption>

				<div class="show-options-button">
					<primary-button
						@click.native="showOptions"
						class="is-fullwidth"
					>
						Answer
					</primary-button>
				</div>
			</figure>
		</div>
	</div>
</template>

<script>
	import AnswerButtons from './../components/Play/AnswerButtons.vue'
	import PrimaryButton from './../components/Generic/Button/PrimaryButton.vue'
	import YgTransition from './../components/Transitions/YgTransition.vue'

	import { mapGetters } from 'vuex'

	export default {
		name: 'Play',
		components: {
			AnswerButtons,
			PrimaryButton,
			YgTransition,
		},
		data: function () {
			return {
				isFullscreen: false,
				optionsVisible: false,
			}
		},
		computed: {
			...mapGetters(['contestYoutubeLiveUrl']),
		},
		methods: {
			showOptions() {
				this.optionsVisible = true
			},
			hideOptions() {
				this.optionsVisible = false
			},
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
	.video-column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
	}

	.answer-area {
		position: absolute;
		width: 100%;
		height: auto;
		bottom: 0;
		z-index: 999;
	}

	.show-options-button {
		padding: 12px;
		position: absolute;
		bottom: 0;
		width: 100%;
	}

	.play-wrapper {
		background: rgba(0, 0, 0, 0.8);
	}

	@media screen and (min-width: 768px) {
		.is-fullheight-not-mobile {
			min-height: 100vh;
		}
	}

	@media screen and (max-width: 768px) {
		.video-iframe {
			height: 100vh;
		}
	}
</style>

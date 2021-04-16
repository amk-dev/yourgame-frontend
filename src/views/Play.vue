<template>
	<div
		class="columns play-wrapper is-centered is-gapless is-fullheight-not-mobile is-marginless"
	>
		<div class="column is-3 video-column">
			<figure class="image video-iframe">
				<iframe
					v-if="contestYoutubeLiveUrl"
					class="has-ratio"
					:src="contestYoutubeLiveUrl"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
			</figure>

			<div class="show-options-button">
				<primary-button
					@click.native="showOptions"
					class="is-fullwidth"
				>
					Answer
				</primary-button>
			</div>

			<div class="answer-area">
				<yg-transition name="appear-from-bottom">
					<answer-buttons
						v-show="optionsVisible"
						class="player-video-answer-buttons"
						v-on="$listeners"
						@hideOptions="hideOptions"
					></answer-buttons>
				</yg-transition>
			</div>
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
		created() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
			window.addEventListener('resize', () => {
				// eslint-disable-next-line
				console.log('firing')
				let vh = window.innerHeight * 0.01
				document.documentElement.style.setProperty('--vh', `${vh}px`)
			})
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
	.answer-area {
		position: absolute;
		width: 100%;
		height: auto;
		bottom: 0;
		z-index: 999;
	}

	.play-wrapper {
		background: rgba(0, 0, 0, 0.8);
	}

	.play-wrapper,
	.video-column {
		height: calc(var(--vh, 1vh) * 100);
	}

	.video-column {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.video-iframe {
		flex-grow: 1;
	}

	.video-iframe iframe {
		width: 100%;
		height: 100%;
	}
</style>

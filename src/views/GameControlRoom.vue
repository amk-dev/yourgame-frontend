<template>
	<div class="container game-control-room-wrapper">
		<div class="columns">
			<div class="column gcr-left is-flex is-flex-direction-column">
				<leaderboard
					type="control-room"
					class="control-room-leaderboard is-flex-grow-1"
					:style="leaderboardStyles"
					v-if="showQuizView"
					:leaderboard="leaderboard"
					context="game-control-room"
				></leaderboard>
				<winnings
					class="is-flex-grow-1"
					v-if="showStartView"
				></winnings>
			</div>
			<div
				class="column gcr-middle ml-6 is-flex is-flex-direction-column"
			>
				<div
					class="control-room-quiz-wrapper is-flex is-flex-direction-column is-flex-grow-1"
				>
					<div class="remaining-time" v-if="showQuizView">
						<h2>
							{{ `Question ${currentQuestion.questionNumber}` }}
						</h2>
						<h1>{{ `${remainingTime} Sec` }}</h1>
					</div>
					<div
						class="quiz is-flex is-flex-direction-column is-flex-grow-1 is-justify-content-center"
					>
						<div
							class="start-view is-flex is-justify-content-space-between is-flex-direction-column is-flex-grow-1"
							v-if="showStartView"
						>
							<brand
								class="small is-flex is-justify-content-center"
							></brand>
							<!-- <div class="start-view-game-name mt-6">
								<h1 class="has-text-centered">
									Whats On Your Screen
								</h1>
							</div> -->

							<div
								class="start-view-winnings-details has-text-centered pt-5 pb-5"
							>
								<div class="trophy-icon has-text-centered">
									<font-awesome-icon
										icon="trophy"
									></font-awesome-icon>
								</div>
								<div class="start-view-winnings-text mt-5">
									<h2>300 RS to be Won</h2>
									<h2>9 Total Winners</h2>
								</div>
								<div class="start-view-cta mt-5">
									<feedback-box
										class="mt-4"
										v-if="isStartingContestFeedback"
										:feedback="isStartingContestFeedback"
									></feedback-box>

									<primary-button
										@click.native="startContest"
										class="is-fullwidth-button"
										:class="{
											'is-loading': isStartingContest,
										}"
										:disabled="isStartingContest"
										>Start</primary-button
									>
								</div>
							</div>
						</div>
						<div class="quiz-view" v-if="showQuizView">
							<div class="question">
								<h3 class="game-name">
									നിങ്ങളുടെ മുന്നിൽ കാണുന്ന ഷേപ്പ് ഏതാണെന്നു
									പറയുക
								</h3>
								<div class="shape mt-6" ref="shape">
									<svg ref="question-shape">
										<use :xlink:href="currentIcon"></use>
									</svg>
								</div>
							</div>
							<ul class="options">
								<li
									class="option is-a"
									:class="{
										'wrong-answer': !isRightAnswer.a,
									}"
									id="option1"
								>
									{{ `A. ${currentQuestion.option_a}` }}
								</li>
								<li
									class="option is-b"
									id="option2"
									:class="{
										'wrong-answer': !isRightAnswer.b,
									}"
								>
									{{ `B. ${currentQuestion.option_b}` }}
								</li>
								<li
									class="option is-c"
									id="option3"
									:class="{
										'wrong-answer': !isRightAnswer.c,
									}"
								>
									{{ `C. ${currentQuestion.option_c}` }}
								</li>
								<li
									class="option is-d"
									id="option4"
									:class="{
										'wrong-answer': !isRightAnswer.d,
									}"
								>
									{{ `D. ${currentQuestion.option_d}` }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="column gcr-right ml-6">
				<div class="host-video">
					<div class="quiz-buttons mt-5">
						<primary-button
							class="is-block mb-3"
							:class="{ 'is-loading': isGettingNextQuestion }"
							@click.native="getNextQuestion"
							:disabled="
								isGettingNextQuestion ||
								!isRemainingTimeZero ||
								isQuestionsOver
							"
							>{{
								isQuestionsOver
									? 'All Questions Finished'
									: 'Next Question'
							}}</primary-button
						>

						<primary-button
							v-if="isGoLiveButtonVisible"
							:disabled="isUpdatingStatus"
							@click.native="updateStatusToVideoLive"
							class="is-block"
						>
							Go Live
						</primary-button>

						<primary-button
							class="is-block"
							v-if="isQuestionsOver && isRemainingTimeZero"
							@click.native="endContest"
							:disabled="isEndingContest"
							>End Game</primary-button
						>
						<feedback-box
							class="mt-4"
							v-if="isEndingContestFeedback"
							:feedback="isEndingContestFeedback"
						></feedback-box>
						<feedback-box
							class="mt-4"
							v-if="isUpdatingStatusFeedback"
							:feedback="isUpdatingStatusFeedback"
						></feedback-box>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Winnings from '../components/Contests/Winnings.vue'
	import Leaderboard from './../components/Contests/LeaderBoard.vue'
	import PrimaryButton from './../components/Generic/Button/PrimaryButton.vue'
	import Brand from './../components/Navigation/Brand.vue'
	import FeedbackBox from './../components/Generic/FeedbackBox/FeedbackBox.vue'

	export default {
		name: 'GameControlRoom',
		components: {
			Leaderboard,
			PrimaryButton,
			Brand,
			Winnings,
			FeedbackBox,
		},
		data: function () {
			return {
				leaderboardStyles: {
					'box-shadow': '4px 4px 12px rgba(0, 0, 0, 0.1)',
					'margin-top': '56px',
				},
				isGoLiveButtonVisible: true,
			}
		},
		methods: {
			startContest() {
				this.$store.dispatch(
					'startContest',
					this.$route.params.contestId
				)
			},
			updateStatusToVideoLive() {
				this.$store
					.dispatch(
						'updateStatusToVideoLive',
						this.$route.params.contestId
					)
					.then(() => {
						this.isGoLiveButtonVisible = false
					})
					.catch(() => {})
			},
			getNextQuestion() {
				if (this.isRemainingTimeZero) {
					this.$store.dispatch(
						'getNextQuestion',
						this.$route.params.contestId
					)
				}
			},
			endContest() {
				this.$store.dispatch('endContest', this.$route.params.contestId)
			},
		},
		computed: {
			...mapGetters([
				'showQuizView',
				'showStartView',
				'leaderboard',
				'remainingTime',
				'isRemainingTimeZero',
				'currentQuestion',
				'isStartingContest',
				'isStartingContestFeedback',
				'currentIcon',
				'isRightAnswer',
				'isGettingNextQuestion',
				'isQuestionsOver',
				'isEndingContestFeedback',
				'isEndingContest',
				'isUpdatingStatus',
				'isUpdatingStatusFeedback',
			]),
		},
		mounted() {
			fetch('/img/fontawesome/solid.svg')
		},
	}
</script>

<style>
	.game-control-room-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
	}

	/* Control Room Quiz */

	.remaining-time {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.remaining-time h2 {
		font-size: 18px;
		font-weight: 700;
	}
	.remaining-time h1 {
		font-size: 36px;
		font-weight: 700;
	}
	.quiz {
		padding: 24px;
		box-shadow: 0px 2.5px 2.5px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		/* background: #f2f6fc; */
		background: #fff;
	}
	.question {
		text-align: center;
	}
	.game-name {
		font-size: 18px;
		font-weight: 700;
	}
	.option {
		/* border: 0.2px solid rgba(0, 0, 0, 0.25); */
		padding: 12px;
		margin-bottom: 12px;
		border-radius: 8px;
		font-size: 18px;
		color: #fff;
	}
	.option:last-of-type {
		margin-bottom: 0;
	}
	.shape {
		font-size: 96px;
	}
	.quiz-buttons {
		text-align: right;
	}
	.host-video {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #f8f8f8;
		color: rgba(0, 0, 0, 0.25);
		font-weight: 700;
	}
	.start-view-game-name h1 {
		font-size: 24px;
		font-weight: 700;
	}
	.trophy-icon {
		font-size: 64px;
		color: rgb(255, 215, 0);
	}
	.start-view-winnings-details h2 {
		font-size: 24px;
		font-weight: 700;
	}
	.is-fullwidth-button {
		display: block;
		width: 100%;
	}

	.is-a {
		background: #d01937;
	}
	.is-b {
		background: #008ce3;
	}
	.is-c {
		background: #7721ba;
	}
	.is-d {
		background: #37c5ab;
	}
	.option.wrong-answer {
		background: #ccc !important;
	}
	.option {
		transition: background 0.3s ease-in-out;
	}
</style>

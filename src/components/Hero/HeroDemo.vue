<template>
	<div class="hero-demo" ref="heroDemo">
		<div class="text-content" v-if="!showQuiz">
			<div class="victory-tick">
				<font-awesome-icon icon="check-circle"></font-awesome-icon>
			</div>
			<div class="winnings-text">
				<h3 class="congratulations">Congratulations</h3>
				<h2 class="money-won">You Have Won 500/-</h2>
			</div>
		</div>
		<div class="quiz" @animationend="animationEnd" v-if="showQuiz">
			<div class="question">
				<h3 class="game-name">What's On Your Screen</h3>
				<div class="shape">
					<font-awesome-icon icon="square-full"></font-awesome-icon>
				</div>
			</div>
			<ul class="options">
				<li class="option" id="option1">A. Rectangle</li>
				<li class="option" id="option2">B. Circle</li>
				<li class="option" id="option3">C. Triangle</li>
				<li class="option" id="option4">D. Hexagon</li>
			</ul>

			<div class="correct-answer-popup">
				<div class="left">
					<h3>Great</h3>
					<h4>You Got The Right Answer</h4>
				</div>
				<div class="right">
					<font-awesome-icon icon="check-circle"></font-awesome-icon>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HeroMedia',
		components: {},
		data: () => {
			return {
				showQuiz: true,
			}
		},
		methods: {
			restartAnimation() {
				this.showQuiz = true
			},
			animationEnd: function (data) {
				if (data.animationName == 'fadeOut') {
					this.showQuiz = false
					this.$refs.heroDemo.style.minHeight = 0
				}
			},
		},
		mounted() {
			this.$refs.heroDemo.style.minHeight = this.$refs.heroDemo.offsetHeight
		},
	}
</script>

<style>
	.controls {
		align-self: flex-end;
	}
	.hero-demo {
		padding: 24px;
		background: #f2f6fc;
		box-shadow: 0px 2.5px 2.5px rgba(0, 0, 0, 0.25);
		/* box-shadow: 10px 10px 60px rgb(0 0 0 / 20%); */
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		align-items: center;
		flex-direction: column;
		position: relative;
	}
	.victory-tick {
		font-size: 72px;
		color: #21b186;
	}
	.text-content {
		text-align: center;
		/* position: absolute;
		top: 0; */
	}
	.winnings-text {
		margin-top: 4px;
	}
	.congratulations {
		font-size: 18px;
		font-weight: 700;
	}
	.money-won {
		font-size: 24px;
		font-weight: 700;
	}
	.won-image {
		max-width: 252px;
		margin-top: 18px;
	}
	.quiz {
		padding: 24px;
		position: relative;
	}
	.question {
		text-align: center;
	}
	.game-name {
		font-size: 24px;
		font-weight: 700;
	}
	.option {
		border: 0.2px solid rgba(0, 0, 0, 0.25);
		padding: 12px;
		margin-bottom: 12px;
		border-radius: 8px;
		font-size: 14px;
		background: #fff;
	}

	.option:last-of-type {
		margin-bottom: 0;
	}

	.shape {
		font-size: 96px;
	}

	.correct-answer-popup {
		position: absolute;
		background: linear-gradient(90deg, #02aab0, #00cdac);
		left: 0px;
		right: 0px;
		padding: 4px 8px;
		bottom: 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		border-radius: 4px;
	}

	.correct-answer-popup h3 {
		font-size: 12px;
	}
	.correct-answer-popup h4 {
		font-size: 14px;
	}
	.correct-answer-popup .right {
		font-size: 18px;
	}

	/* animations */

	.option,
	.correct-answer-popup {
		transform: translateY(1000px);
		/* opacity: 0; */
	}

	.hero-demo {
		animation: fadeIn 0.5s forwards;
	}

	.quiz .question {
		opacity: 0;
		animation: fadeIn 0.5s forwards;
		animation-delay: 500ms;
	}

	#option1 {
		animation: fadeInAndChangeBackground 3s forwards;
		animation-delay: 500ms;
	}
	#option2 {
		animation: fadeInFromBelow 1s forwards;
		animation-delay: 600ms;
	}
	#option3 {
		animation: fadeInFromBelow 1s forwards;
		animation-delay: 700ms;
	}
	#option4 {
		animation: fadeInFromBelow 1s forwards;
		animation-delay: 800ms;
	}

	.correct-answer-popup {
		animation: fadeInFromBelow 1s forwards;
		animation-delay: 3000ms;
	}

	.quiz {
		animation: fadeOut 0.25s forwards;
		animation-delay: 5000ms;
	}

	.text-content {
		transform-origin: center;
		opacity: 0;
		animation: fadeIn 0.75s forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 100%;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 100%;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fadeInFromBelow {
		from {
			opacity: 0;
			transform: translateY(1000px);
		}
		to {
			opacity: 100%;
			transform: translateY(0px);
		}
	}

	@keyframes bounceIn {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeInAndChangeBackground {
		0% {
			opacity: 0;
			transform: translateY(1000px);
		}
		25% {
			opacity: 100%;
			transform: translateY(0px);
			background: #fff;
		}
		50% {
			opacity: 100%;
			transform: translateY(0px);
			background: #fff;
			color: #000;
		}
		100% {
			transform: translateY(0px);
			background: #21b186;
			color: #fff;
		}
	}
</style>

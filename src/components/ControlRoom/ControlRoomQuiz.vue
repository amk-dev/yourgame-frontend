<template>
	<div class="quiz-wrapper">
		<div class="columns">
			<div class="column is-12">
				<div class="remaining-time">
					<h2>Question 5</h2>
					<h1>30 Sec</h1>
				</div>
				<div class="quiz">
					<div class="question">
						<h3 class="game-name">
							നിങ്ങളുടെ മുന്നിൽ കാണുന്ന ഷേപ്പ് ഏതാണെന്നു പറയുക
						</h3>
						<div class="shape">
							<font-awesome-icon
								icon="square-full"
							></font-awesome-icon>
						</div>
					</div>
					<ul class="options mt-5">
						<li class="option" id="option1">A. Rectangle</li>
						<li class="option" id="option2">B. Circle</li>
						<li class="option" id="option3">C. Triangle</li>
						<li class="option" id="option4">D. Hexagon</li>
					</ul>
				</div>
				<div class="quiz-buttons mt-5">
					<primary-button>Next Question</primary-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'

	export default {
		components: { PrimaryButton },
		name: 'ControlRoomQuiz',
	}
</script>

<style>
	.quiz {
		padding: 24px;
		box-shadow: 0px 2.5px 2.5px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
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
		border: 0.2px solid rgba(0, 0, 0, 0.25);
		padding: 12px;
		margin-bottom: 12px;
		border-radius: 8px;
		font-size: 18px;
		background: #fff;
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
	.remaining-time {
		color: #fff;
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
</style>

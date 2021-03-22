<template>
	<div class="faq-wrapper">
		<h1 class="faq-header has-text-centered">Frequently Asked Questions</h1>

		<div class="faq-body mt-5">
			<faq-question
				class="mt-4"
				v-for="(faq, index) in questionsAndAnswers"
				:key="index"
				:question="faq.question"
				:answer="faq.answer"
			></faq-question>
		</div>

		<!-- <div class="still-have-questions mt-6">
			<h2>Still Have Questions or Need Help ?</h2>
			<p class="mt-3">
				Please send us a message on instagram. we will help you out.
			</p>
			<a
				href="https://www.instagram.com/yourgame.live/"
				class="unstyled-anchor"
			>
				<black-button class="mt-3">
					<font-awesome-icon
						:icon="['fab', 'instagram']"
					></font-awesome-icon>
					<span class="ml-2">Instagram</span>
				</black-button>
			</a>
		</div> -->
	</div>
</template>

<script>
	import FaqQuestion from './FaqQuestion.vue'

	export default {
		components: { FaqQuestion },
		name: 'FAQ',
		data: function () {
			return {
				questionsAndAnswers: [
					{
						question: 'What is YourGame ?',
						answer:
							'Yourgame is a live gameshow where you can answer simple questions asked by your host and compete with others to win a pool of prize money.',
					},
					{
						question: 'How Winners Are Decided ?',
						answer:
							'The winners are decided based on the number of right answers and time taken to answer the questions. ',
					},
					{
						question: 'Can i win real money on Your Game ?',
						answer: 'Yes. you can win real money on yourgame. ',
					},
					{
						question: 'How Can I Withdraw my winnings ?',
						answer: 'You Can Withdraw Your Money Via UPI',
					},
				],
			}
		},
	}
</script>

<style>
	.faq-header {
		font-size: 24px;
		font-weight: 700;
	}
	.still-have-questions {
		font-size: 18px;
	}
	.still-have-questions h2 {
		font-weight: 700;
	}
	.unstyled-anchor {
		color: #fff;
	}
</style>

<template>
	<div class="faq-block-wrapper" @click="showAnswer = !showAnswer">
		<h2 class="faq-question">
			<span>{{ question }}</span>
			<span v-if="showAnswer">
				<font-awesome-icon icon="chevron-down"></font-awesome-icon>
			</span>
			<span v-if="!showAnswer">
				<font-awesome-icon icon="chevron-right"></font-awesome-icon>
			</span>
		</h2>
		<yg-transtion name="fade">
			<p class="faq-answer" v-show="showAnswer">{{ answer }}</p>
		</yg-transtion>
	</div>
</template>

<script>
	import YgTranstion from './../Transitions/YgTransition.vue'
	export default {
		name: 'FaqQuestion',
		props: ['question', 'answer'],
		components: {
			YgTranstion,
		},
		data: function() {
			return {
				showAnswer: false,
			}
		},
	}
</script>

<style>
	.faq-block-wrapper {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		cursor: pointer;
	}
	.faq-question {
		font-weight: 700;
		background: #fff;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
		display: flex;
		justify-content: space-between;
	}
	.faq-answer {
		background: #fafafa;
		border-bottom-right-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.faq-question,
	.faq-answer {
		padding: 18px;
		font-size: 18px;
	}
</style>

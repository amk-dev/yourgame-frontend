<template>
	<div class="answer-buttons">
		<div class="answer-buttons-header mb-3">
			<h2 class="answer-buttons-text">Choose Your Answer</h2>
		</div>

		<default-button
			class="answer-button is-a"
			:disabled="isAnsweringQuestion"
			@click.native="
				() => {
					submitAnswer('A')
				}
			"
			>A</default-button
		>
		<default-button
			class="answer-button is-b"
			:disabled="isAnsweringQuestion"
			@click.native="
				() => {
					submitAnswer('B')
				}
			"
			>B</default-button
		>
		<default-button
			class="answer-button is-c"
			:disabled="isAnsweringQuestion"
			@click.native="
				() => {
					submitAnswer('C')
				}
			"
			>C</default-button
		>
		<default-button
			class="answer-button is-d"
			:disabled="isAnsweringQuestion"
			@click.native="
				() => {
					submitAnswer('D')
				}
			"
			>D</default-button
		>

		<div class="notification-wrapper">
			<transition-group name="from-down">
				<feedback-notification
					class="mb-1"
					v-for="notification in notifications"
					:key="notification.id"
					:type="notification.type"
					:message="notification.message"
				>
				</feedback-notification>
			</transition-group>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import DefaultButton from './../Generic/Button/DefaultButton.vue'
	import FeedbackNotification from './FeedbackNotification.vue'

	export default {
		name: 'AnswerButtons',
		components: {
			DefaultButton,
			FeedbackNotification,
		},
		methods: {
			submitAnswer(option) {
				this.$store.dispatch('answerQuestion', {
					answer: option,
					contestId: this.$route.params.contestId,
				})
			},
		},
		computed: {
			...mapGetters(['notifications', 'isAnsweringQuestion']),
		},
	}
</script>

<style>
	.answer-buttons {
		background: #fff;
		color: #000;
		padding: 24px;
		font-size: 18px;
		height: 100%;
		/* box-shadow: 0px 16px 16px rgba(0, 0, 0, 0.1); */
		border-radius: 8px;
		position: relative;
	}
	.answer-buttons .answer-buttons-text {
		font-weight: 700;
	}
	.answer-button {
		min-width: 0;
		height: 64px;
		border-radius: 4px !important;
		margin-right: 4px;
		color: #fff !important;
		display: block;
		width: 100%;
		margin-bottom: 4px;
	}
	.answer-button:last-of-type {
		margin-right: 0px;
	}

	.answer-button:disabled {
		cursor: not-allowed !important;
	}
	.is-a {
		background: #d01937 !important;
	}
	.is-b {
		background: #008ce3 !important;
	}
	.is-c {
		background: #7721ba !important;
	}
	.is-d {
		background: #37c5ab !important;
	}
	.is-a:disabled {
		background: #f28d9e !important;
	}
	.is-b:disabled {
		background: #80ceff !important;
	}
	.is-c:disabled {
		background: #c593ec !important;
	}
	.is-d:disabled {
		background: #9ce3d6 !important;
	}
	.notification-wrapper {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin-left: 24px;
		margin-right: 24px;
		padding: 12px;
		overflow: hidden;
	}
	.from-down-enter-active,
	.from-down-leave-active {
		transition: transform 0.3s;
		transition-timing-function: ease-in-out;
		will-change: transform;
	}
	.from-down-enter,
	.from-down-leave-to {
		transform: translateY(100px);
	}
	.from-down-move {
		transition: transform 0.6s;
	}

	@media screen and (max-width: 786px) {
		.answer-buttons {
			background: #f2f6fc;
		}
		.notification-wrapper {
			position: fixed;
		}
	}
</style>

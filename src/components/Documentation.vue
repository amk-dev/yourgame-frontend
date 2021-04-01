<template>
	<skelton>
		<div class="columns is-gapless is-centered is-marginless">
			<div class="column mt-5 mb-5">
				<div class="documentation-content">
					<slot></slot>
				</div>
			</div>
		</div>
	</skelton>
</template>

<script>
	import Skelton from './Skelton.vue'

	export default {
		name: 'Home',
		components: {
			Skelton,
		},
	}
</script>

<style>
	.is-marginless {
		margin: 0 !important;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		justify-content: flex-start;
	}
	.documentation-container {
		min-height: 100vh;
	}

	.documentation-content h2,
	.documentation-content h3,
	.documentation-content h4 {
		font-weight: 700;
	}

	.documentation-content h2,
	.documentation-content h3,
	.documentation-content p,
	.documentation-content ul,
	.documentation-content h4,
	.documentation-content li {
		margin-bottom: 12px;
	}

	.documentation-content h2 {
		font-size: 24px;
	}

	.documentation-content h3 {
		font-size: 18px;
	}

	.documentation-content ul,
	.documentation-content ol {
		padding-left: 24px;
		list-style-type: decimal;
	}

	@media screen and (max-width: 786px) {
		/* .home-container {
			padding: 0px 12px;
		} */
	}
</style>

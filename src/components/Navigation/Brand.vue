<template>
	<div class="brand">
		<h1 class="yg-logo">
			<router-link class="no-style-anchor" to="/">
				<font-awesome-icon icon="cube" />
				yourgame
			</router-link>
		</h1>
	</div>
</template>

<script>
	export default {
		name: 'Brand',
	}
</script>

<style scoped>
	.yg-logo {
		font-size: 24px;
		font-weight: 900;
	}

	.no-style-anchor {
		color: #000;
	}

	/* @media screen and (max-width: 786px) {
		.yg-logo {
			font-size: 18px;
		}
	} */
</style>

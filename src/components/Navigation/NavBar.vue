<template>
	<div class="yg-navbar">
		<div class="brand-with-menu is-flex is-align-items-center">
			<!-- <font-awesome-icon icon="bars"></font-awesome-icon> -->
			<Brand></Brand>
		</div>
		<Menu></Menu>
	</div>
</template>

<script>
	import Brand from './Brand.vue'
	import Menu from './Menu.vue'

	export default {
		name: 'Navbar',
		components: {
			Brand,
			Menu,
		},
	}
</script>

<style>
	.yg-navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 0;
	}

	/* @media screen and (max-width: 786px) {
		.yg-navbar {
			padding: 24px;
		}
	} */
</style>

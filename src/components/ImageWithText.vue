<template>
	<figure class="image-with-text image is-4by3">
		<img :src="require(`../assets/${img}.svg`)" :alt="alt" />
		<figcaption class="mt-4">{{ text }}</figcaption>
	</figure>
</template>

<script>
	export default {
		name: 'ImageWithText',
		props: {
			img: {
				type: String,
				required: true,
			},
			alt: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
		},
	}
</script>

<style>
	.image-with-text figcaption {
		text-align: center;
		font-size: 24px;
		font-weight: 700;
	}
</style>

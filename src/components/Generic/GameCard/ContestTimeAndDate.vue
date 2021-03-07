<template>
	<div class="contest-time-and-date">
		<h3>
			<font-awesome-icon :icon="['far', 'clock']"></font-awesome-icon>
			{{ contestTime }}
		</h3>
		<h3>
			<font-awesome-icon :icon="['far', 'calendar']"></font-awesome-icon>
			{{ contestDate }}
		</h3>
	</div>
</template>

<script>
	export default {
		name: 'ContestTimeAndDate',
		props: ['contestTime', 'contestDate'],
	}
</script>

<style></style>

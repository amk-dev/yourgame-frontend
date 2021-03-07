<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div class="box">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'YgModal',
	}
</script>

<style></style>

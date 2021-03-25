<template>
	<div class="referred-people">
		<div class="referred-people-title mb-4">People You Referred</div>
		<div
			class="name-and-avatar mb-2"
			v-for="referral in referrals"
			:key="referral._id"
		>
			<figure class="image profile-picture is-24x24">
				<img
					class="is-rounded"
					:src="referral.picture"
					:alt="`${referral.displayName} profile image`"
				/>
			</figure>
			<h3 class="name">{{ referral.displayName }}</h3>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ReferredPeople',
		props: ['referrals'],
	}
</script>

<style>
	.referred-people {
		background: #fff;
		padding: 24px;
	}
	.referred-people-title {
		font-size: 16px;
		font-weight: 700;
	}
</style>

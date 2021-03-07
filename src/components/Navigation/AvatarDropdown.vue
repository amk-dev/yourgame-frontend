<template>
	<div class="dropdown" :class="{ 'is-active': isActive }">
		<div class="dropdown-trigger">
			<div class="name-and-avatar" @click="toggleDropdown">
				<figure class="image is-32x32">
					<img
						class="is-rounded"
						:src="profilePicture"
						alt="Profile Picture"
					/>
				</figure>
				<span class="name">
					{{ displayName }}
				</span>
				<font-awesome-icon
					class="ml-2 avarar-dropdown-icon"
					icon="caret-down"
				></font-awesome-icon>
			</div>
		</div>

		<div class="dropdown-menu mt-2" id="dropdown-menu" role="menu">
			<div class="dropdown-content yg-dropdown-content">
				<router-link to="/games/all">
					<div class="yg-dropdown-link mt-2">
						All Games
					</div>
				</router-link>
				<router-link to="/games/joined">
					<div class="yg-dropdown-link mt-2">
						Joined Games
					</div>
				</router-link>
				<router-link to="/yourmoney">
					<div class="yg-dropdown-link mt-2">
						Your Money
					</div>
				</router-link>
				<div class="yg-dropdown-link mt-2" @click="signout">
					Signout
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Router from 'vue-router'
	const { isNavigationFailure, NavigationFailureType } = Router

	export default {
		name: 'AvatarDropdown',
		props: ['isActive', 'displayName', 'profilePicture'],
		methods: {
			toggleDropdown() {
				this.$emit('toggleDropdown')
			},
			async signout() {
				await this.$store.dispatch('signout')
				this.$router.push('/').catch((error) => {
					if (
						isNavigationFailure(
							error,
							NavigationFailureType.duplicated
						)
					) {
						console.log('Navigation Duplicated')
					}
				})
			},
		},
	}
</script>

<style>
	.dropdown-menu {
		left: auto !important;
		right: 0 !important;
	}

	.yg-dropdown-link {
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		.name {
			display: none;
		}
	}
</style>

<template>
	<div class="dropdown" :class="{ 'is-active': isActive }">
		<div class="dropdown-trigger">
			<div class="name-and-avatar" @click="toggleDropdown">
				<figure class="image is-32x32">
					<img
						class="is-rounded"
						:src="profilePicture"
						alt="Profile Picture"
						referrerpolicy="no-referrer"
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
				<div
					class="yg-dropdown-link mt-2"
					@click="hideDropdownAndGoToRoute('/games/all')"
				>
					All Games
				</div>

				<div
					class="yg-dropdown-link mt-2"
					@click="hideDropdownAndGoToRoute('/games/joined')"
				>
					Joined Games
				</div>

				<div
					class="yg-dropdown-link mt-2"
					@click="hideDropdownAndGoToRoute('/yourmoney')"
				>
					Your Money
				</div>

				<div
					class="yg-dropdown-link mt-2"
					@click="hideDropdownAndGoToRoute('/referrals')"
				>
					Referrals
				</div>

				<div class="yg-dropdown-link mt-2" @click="signout">
					Signout
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { captureException } from '@sentry/browser'

	export default {
		name: 'AvatarDropdown',
		props: ['isActive', 'displayName', 'profilePicture'],
		methods: {
			hideDropdownAndGoToRoute(route) {
				this.toggleDropdown()
				this.$router.push(route).catch((error) => {
					captureException(error)
				})
			},

			toggleDropdown() {
				this.$emit('toggleDropdown')
			},
			async signout() {
				await this.$store.dispatch('signout')
				this.$router.push('/').catch((error) => {
					captureException(error)
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

	.name-and-avatar {
		display: flex;
		align-items: center;
	}

	.name {
		margin-left: 8px;
		font-weight: 700;
	}

	@media screen and (max-width: 768px) {
		.dropdown .name {
			display: none;
		}
	}
</style>

<template>
	<ul class="yg-navbar-menu">
		<li class="yg-navbar-menu-item" v-if="!isAuthenticated">
			<router-link to="/signin">
				<white-button>Sign In</white-button>
			</router-link>
		</li>
		<li class="yg-navbar-menu-item" v-if="!isAuthenticated">
			<router-link to="/signin">
				<primary-button>Register</primary-button>
			</router-link>
		</li>

		<li class="yg-navbar-menu-item" v-if="isAuthenticated">
			<AvatarDropdown
				:displayName="displayName"
				:profilePicture="profilePictureURL"
				:isActive="showDropdown"
				@toggleDropdown="showDropdown = !showDropdown"
			></AvatarDropdown>
		</li>
	</ul>
</template>

<script>
	import WhiteButton from './../Generic/Button/WhiteButton.vue'
	import PrimaryButton from './../Generic/Button/PrimaryButton.vue'
	import AvatarDropdown from './../Navigation/AvatarDropdown.vue'

	import { mapGetters } from 'vuex'

	export default {
		name: 'Menu',
		components: {
			WhiteButton,
			PrimaryButton,
			AvatarDropdown,
		},
		data: function() {
			return {
				showDropdown: false,
			}
		},
		computed: {
			...mapGetters([
				'isAuthenticated',
				'displayName',
				'profilePictureURL',
			]),
		},
	}
</script>

<style>
	.yg-navbar-menu {
		display: inline-flex;
		font-size: 14px;
		font-weight: 700;
		align-items: center;
	}
	.yg-navbar-menu-item {
		margin-right: 12px;
		/* font-size: 18px; */
	}
	.yg-navbar-menu-item:last-of-type {
		margin-right: 0;
	}
	.yg-navbar-menu-item a {
		color: #000;
	}
	.yg-navbar-dropdown {
		cursor: pointer;
	}
	.avatar-drop-down-icon {
		font-size: 18px;
	}
	.yg-dropdown-content {
		padding: 12px;
	}
	/* .yg-dropdown-link {
		padding: 12px 24px;
	} */
	.name-and-avatar {
		cursor: pointer;
	}

	@media screen and (max-width: 786px) {
		.yg-navbar-menu-item {
			margin-right: 8px;
		}
	}
</style>

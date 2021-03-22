<template>
	<footer class="yg-footer footer">
		<div class="container">
			<div class="columns">
				<div class="column is-6">
					<div class="footer-branding">
						<brand></brand>
						<p class="footer-brand-description mt-2">
							Play Simple Games Hosted By Youtubers And Win Money
							Everyday
						</p>
						<p class="footer-brand-copyright mt-1">
							<font-awesome-icon
								:icon="['far', 'copyright']"
							></font-awesome-icon>
							<span> 2021 Akash Mohan </span>
						</p>
					</div>
				</div>
				<div class="column is-6">
					<div class="columns">
						<div class="column">
							<div class="footer-section">
								<div class="footer-section-title">
									Say Hello
								</div>
								<ul class="footer-list mt-4">
									<li class="mb-2">
										<a href="#">
											<font-awesome-icon
												:icon="['fab', 'instagram']"
											></font-awesome-icon>
											<span class="ml-1">
												Instagram
											</span>
										</a>
									</li>

									<li class="mb-2">
										<a href="#">
											<font-awesome-icon
												:icon="['fab', 'twitter']"
											></font-awesome-icon>
											<span class="ml-1"> Twitter </span>
										</a>
									</li>

									<li class="mb-2">
										<a href="#">
											<font-awesome-icon
												icon="envelope"
											></font-awesome-icon>
											<span class="ml-1">
												hello@yourgame.live
											</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="column">
							<div class="footer-section">
								<div class="footer-section-title">Legal</div>
								<ul class="footer-list mt-4">
									<li class="mb-2">
										<router-link to="/privacy-policy">
											Privacy Policy
										</router-link>
									</li>
									<li class="mb-2">
										<router-link to="/terms-of-service">
											Terms Of Service
										</router-link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import Brand from '../Navigation/Brand.vue'
	export default {
		components: { Brand },
		name: 'YgFooter',
	}
</script>

<style>
	.yg-footer {
		font-size: 18px;
	}
	.footer-section-title {
		font-weight: 700;
		font-size: 18px;
	}
	.footer-list {
		font-size: 18px;
	}
	.footer-list a {
		color: #000;
	}
	.footer-list a:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 786px) {
		.footer-section-title {
			margin-top: 24px;
		}
	}
</style>

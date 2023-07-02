<script lang="ts">
	import { http_host, API_BASE } from '$lib/xs/config.json';
	import { toast } from '@zerodevx/svelte-toast';
	import 'node-localstorage/register';
	import NavigatorMin from '$lib/Global/Navigator-Min.svelte';
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const VerifyToken = $page.url.searchParams.get('activation_token') || false;
	let content: HTMLDivElement;
	let activation_title: HTMLDivElement;
	let activation_message: HTMLDivElement;

	/** Transform the page if reset token found */

	onMount(() => {
		if (VerifyToken) {
			content.classList.remove('hidden');
			setTimeout(async () => {
				await RunActivation();
			}, 3000);
		}
	});
	/**  */

	// Run the reset
	async function RunActivation() {
		activation_message.innerText = 'Attempting to activate your account';
		fetch(`${http_host}${API_BASE}user/global/verify`, {
			headers: {
				Authorization: 'Bearer ' + VerifyToken.toString(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then((res) => res.json())
			.then(async (json) => {
				if (!json.status) {
					toast.push(`${json.message}`, {
						dismissable: false,
						theme: {
							'--toastBarBackground': 'yellow'
						}
					});
				}
				if (json.status == true) {
					activation_message.innerText = "Success! We'll switch you back to the login screen.";
					toast.push('Welcome to Iris.', {
						dismissable: false,
						theme: {
							'--toastBarBackground': 'blue'
						}
					});
				}
				if (json.status != false) {
					setTimeout(() => {
						window.location.href = '/auth';
					}, 3000);
				}
				console.log(json);
			})
			.catch(function (res) {
				console.log(res);
				let __toast;
				try {
					__toast = JSON.parse(res.message);
				} catch (e) {
					activation_message.innerText = 'You provided a bad token.';
					__toast = 'Oops! Looks like we ran into an issue. Try reloading the page and try again.';
				}
				const ToastMessage = __toast;

				toast.push(`${ToastMessage}`, {
					dismissable: false,
					theme: {
						'--toastBarBackground': 'red'
					}
				});
			});
	}
</script>

<main class="verify h-screen w-full overflow-hidden text-white">
	<div bind:this={content} class="content mx-16 flex hidden flex-wrap items-center justify-center">
		<NavigatorMin />
		<div class="data-collection flex w-full flex-wrap items-center justify-center">
			<!--- Originallly: #191B1F -->
			<div class="signup-card rounded-xl py-8 px-16 backdrop-opacity-50">
				<div class="credential-input-view">
					<div class="headline-greeting my-3 mt-7 inline-block text-left">
						<div class="text-md font-semibold uppercase" style="color: #0EC4DD">
							ACTIVATE YOUR ACCOUNT
						</div>
						<div
							bind:this={activation_title}
							class="my-2 text-5xl font-semibold text-white"
							style="width: 480px"
						>
							Account Activation
						</div>
					</div>
					<div bind:this={activation_message} class="notify">Preparing</div>
				</div>
			</div>
			<div class="dummy flex-1">&nbsp;</div>
		</div>
	</div>
</main>

<style>
	.verify {
		background-color: #191b1f; /* Fallback color */
		background-image: url('/images/login.png');
		background-position: center;
		background-size: cover;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}
	.verify::before {
		backdrop-filter: brightness(0.78) saturate(3);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}
</style>

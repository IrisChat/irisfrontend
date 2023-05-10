<script lang="ts">
	import { http_host, API_BASE } from '$lib/xs/config.json';
	import { toast } from '@zerodevx/svelte-toast';
	import 'node-localstorage/register';
	import NavigatorMin from '$lib/Navigator-Min.svelte';
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const ResetToken = $page.url.searchParams.get('reset_token') || false;
	let content: HTMLDivElement;
	let username_label: HTMLLabelElement;
	let username_input: HTMLInputElement;
	let reset_button: HTMLButtonElement;
	let reset_title: HTMLDivElement;
	let request_reset_button: HTMLButtonElement;
	let reset_subtitle: HTMLDivElement;

	/** Transform the page if reset token found */

	onMount(() => {
		if (ResetToken) {
			// content.innerHTML = "null";
			username_label.innerHTML = 'New Password';
			username_input.name = 'password';
			username_input.placeholder = 'supersecretphrase123';
			reset_button.classList.remove('hidden');
			request_reset_button.classList.add('hidden');
			reset_title.innerHTML = 'Reset Your Password';
			reset_subtitle.classList.add('hidden');
		}
	});
	/**  */

	let payload = {
		username: '',
		password: ''
	};

	// @ts-ignore
	const handleChange = (event) => {
		Object.defineProperty(payload, event.target.name, {
			value: event.target.value,
			// @ts-ignore
			writeable: true
		});
	};
	// @ts-ignore
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	// Request a reset
	async function Reset() {
		fetch(`${http_host}${API_BASE}user/global/forgotpassword`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then(async (json) => {
				console.log(json);
				toast.push(`${json.message}`, {
					dismissable: false,
					theme: {
						'--toastBarBackground': 'yellow'
					}
				});
				if (json.status != false) {
					setTimeout(() => {
						window.location.href = '/auth';
					}, 3000);
				}
			})
			.catch(function (res) {
				// console.log(res);
				let __toast;
				try {
					__toast = JSON.parse(res.message);
				} catch (e) {
					console.log(e);
					__toast = 'Oops! Looks like we ran into an issue. Try that one more time.';
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

	// Run the reset
	async function RunReset() {
		fetch(`${http_host}${API_BASE}user/global/forgotpassword`, {
			headers: {
				Authorization: 'Bearer ' + ResetToken.toString(),
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'PATCH',
			body: JSON.stringify(payload)
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
					toast.push('Your password has been reset.', {
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
					__toast = 'Oops! Looks like we ran into an issue. Try that one more time.';
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

<main class="reset h-screen w-full overflow-hidden text-white">
	<div bind:this={content} class="content mx-16 flex flex-wrap items-center justify-center">
		<NavigatorMin />
		<div class="data-collection flex w-full flex-wrap items-center justify-center">
			<!--- Originallly: #191B1F -->
			<div class="signup-card rounded-xl py-8 px-16 backdrop-opacity-50">
				<div class="credential-input-view">
					<div class="headline-greeting my-3 mt-7 inline-block text-left">
						<div class="text-md font-semibold uppercase" style="color: #0EC4DD">
							RESET YOUR PASSWORD
						</div>
						<div
							bind:this={reset_title}
							class="my-2 text-5xl font-semibold text-white"
							style="width: 480px"
						>
							Password Reset
						</div>
					</div>
					<form class="credential-form-field" on:submit={(event) => handleSubmit(event)}>
						<div
							class="field username my-4 flex items-center justify-center rounded-2xl px-2 py-1"
							style="background: #21222B"
						>
							<div class="username-widget inline-block flex-1">
								<label
									bind:this={username_label}
									for="username"
									class="basis-full px-2 text-xs"
									style="color: #525359">Username or Email</label
								>
								<input
									bind:this={username_input}
									class="h-6 w-full rounded-sm bg-transparent px-2 text-base opacity-50 focus:outline-0"
									style="color: #525359"
									type="text"
									placeholder="Array0x"
									name="username"
									on:change={(event) => handleChange(event)}
								/>
							</div>
							<Fa icon={faUser} size="16" class="mx-2 mb-1" />
						</div>

						<div bind:this={reset_subtitle} class="my-4 text-sm font-semibold text-white">
							A link will be sent to the email address you used to signup with.
						</div>
						<div
							class="action-buttons flex w-full flex-wrap items-center justify-between text-center"
						>
							<button
								bind:this={reset_button}
								on:click={async () => {
									await RunReset();
								}}
								class="create-account-button text-md hidden max-w-xs rounded-xl px-16 py-3 font-semibold hover:opacity-80"
								style="background: #2C70C0;">Reset</button
							>

							<button
								bind:this={request_reset_button}
								on:click={async () => {
									await Reset();
								}}
								class="create-account-button text-md max-w-xs rounded-xl px-16 py-3 font-semibold hover:opacity-80"
								style="background: #2C70C0;">Request a reset</button
							>
						</div>
					</form>
				</div>
			</div>
			<div class="dummy flex-1">&nbsp;</div>
		</div>
	</div>
</main>

<style>
	.reset {
		background-color: #191b1f; /* Fallback color */
		background-image: url('/images/login.png');
		background-position: center;
		background-size: cover;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}
	.reset::before {
		backdrop-filter: brightness(0.78) saturate(3);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}
</style>

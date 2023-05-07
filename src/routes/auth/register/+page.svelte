<script>
	import { http_host, API_BASE } from '$lib/xs/config.json';
	import { toast } from '@zerodevx/svelte-toast';
	import NavigatorMin from '$lib/Navigator-Min.svelte';
	import Fa from 'svelte-fa';
	import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

	let payload = {
		email: '',
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

	function Register() {
		fetch(`${http_host}${API_BASE}auth/register`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then(function (json) {
				if (!json.status) {
					return toast.push(`${json.message}`, {
						dismissable: false,
						theme: {
							'--toastBarBackground': 'red'
						}
					});
				}
				toast.push('Account Created. Redirecting to login page.');
				localStorage.setItem('token', json.token);
				window.location.href = '/auth/login';
			})
			.catch(function (res) {
				console.log(res);
			});
	}
</script>

<main class="register h-screen w-full overflow-hidden text-white">
	<div class="content mx-16 flex flex-wrap items-center justify-center">
		<NavigatorMin />
		<div class="data-collection flex w-full flex-wrap items-center justify-center">
			<!--- Originallly: #191B1F -->
			<div class="signup-card rounded-xl py-8 px-16 backdrop-opacity-50">
				<div class="credential-input-view">
					<div class="headline-greeting my-3 mt-7 inline-block text-left">
						<div class="text-md font-semibold uppercase" style="color: #0EC4DD">ARE YOU NEW?</div>
						<div class="my-2 text-5xl font-semibold text-white">Create a new account!</div>
						<div class="my-4 text-sm font-semibold text-white">
							Already have an account? <a
								href="/auth"
								class="hover:underline"
								style="color: #0094FF">Log in</a
							>
						</div>
					</div>
					<form class="credential-form-field" on:submit={(event) => handleSubmit(event)}>
						<div
							class="field username my-4 flex items-center justify-center rounded-2xl px-2 py-1"
							style="background: #21222B"
						>
							<div class="username-widget inline-block flex-1">
								<label for="username" class="basis-full px-2 text-xs" style="color: #525359"
									>Username</label
								>
								<input
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
						<div
							class="field email-address my-4 flex items-center justify-center rounded-2xl px-2 py-1"
							style="background: #21222B"
						>
							<div class="email-widget inline-block flex-1">
								<label for="email" class="basis-full px-2 text-xs" style="color: #525359"
									>Email Address</label
								>
								<input
									class="h-6 w-full rounded-sm bg-transparent px-2 text-base opacity-50 focus:outline-0"
									style="color: #525359"
									type="email"
									placeholder="you@mail.com"
									name="email"
									on:change={(event) => handleChange(event)}
								/>
							</div>
							<Fa icon={faEnvelope} size="16" class="mx-2 mb-1" />
						</div>
						<div
							class="field password my-4 flex items-center justify-center rounded-2xl px-2 py-1"
							style="background: #21222B"
						>
							<div class="password-widget inline-block flex-1">
								<label for="password" class="basis-full px-2 text-xs" style="color: #525359"
									>Password</label
								>
								<input
									class="h-6 w-full rounded-sm bg-transparent px-2 text-base opacity-50 focus:outline-0"
									style="color: #525359"
									type="password"
									placeholder="supersecretphrase123"
									name="password"
									on:change={(event) => handleChange(event)}
								/>
							</div>
							<Fa icon={faKey} size="16" class="mx-2 mb-1" />
						</div>

						<div
							class="action-buttons flex w-full flex-wrap items-center justify-between text-center"
						>
							<button
								on:click={() => {
									Register();
								}}
								class="create-account-button text-md max-w-xs rounded-xl px-8 py-3 font-semibold hover:opacity-80"
								style="background: #2C70C0;">Create Account</button
							>
							<button
								on:click={() => {
									// RegisterWithGoogle();
								}}
								class="google-signin-button flex max-w-xs items-center rounded-xl py-2 pl-1 pr-10 text-sm font-semibold hover:opacity-80"
								style="background: #191B1F; border: 1px solid #363A43"
							>
								<div class="google-icon mx-2 rounded-xl bg-white py-2 px-2">
									<img src="/images/google-g.svg" alt="Google" />
								</div>
								Sign in with Google</button
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
	.register {
		background-color: #191b1f; /* Fallback color */
		background-image: url('/images/register.png');
		background-position: center;
		background-size: cover;
		/* background-size: contain; */
		/* background-repeat: no-repeat; */
		/* border-radius: 1vw; */
	}

	.register::before {
		backdrop-filter: brightness(2) saturate(3);
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
	}
</style>

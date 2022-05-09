<script>
	// import logo from './assets/svelte.png'
	// import Counter from './lib/Counter.svelte'

	let dialog
	const showModal = () => {
		dialog.showModal()
	}
	const closeModal = () => {
		dialog.close()
	}

	const languages = [
		{ key: 'de-DE', name: 'deutsch', checked: false },
		{ key: 'en-US', name: 'englisch', checked: false },
		{ key: 'es-ES', name: 'spanisch', checked: false },
		{ key: 'fr-FR', name: 'französisch', checked: false },
		{ key: 'ru-RU', name: 'russisch', checked: false },
		{ key: 'pl-PL', name: 'polnisch', checked: false },
	]

	const formatDate = (date = null, key = 'de-DE') => {
		if (!date) return ''
		return new Date(date).toLocaleDateString(key, {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			weekday: 'long',
		})
	}
	let [dateInput] = new Date().toISOString().split('T')
	let localeDate = formatDate(dateInput)
	let dateTextArray = []

	const onSubmit = () => {
		dateTextArray = []
		languages.forEach(item => {
			if (item.checked) {
				dateTextArray.push(formatDate(dateInput, item.key))
			}
		})

		localeDate = dateTextArray.at(0) ?? formatDate(dateInput)
	}
</script>

<main class="mx-auto p-4 text-center">
	<!-- <img src={logo} alt="Svelte Logo" class="h-64 w-64" /> -->
	<h1
		class="my-8 mx-auto w-fit max-w-[14rem] border-[3px] border-[#ff3e00] py-4 px-8 text-[4rem] font-thin uppercase leading-[1.1] text-[#ff3e00]"
	>
		{localeDate}
	</h1>

	<pre class="my-4 whitespace-pre-line">{JSON.stringify(dateTextArray)}</pre>
	<form class="accent-[#ff3e00]" on:submit|preventDefault={onSubmit}>
		<div class="my-4">
			<input type="date" bind:value={dateInput} />
		</div>
		<div class="my-4">
			<div class="inline-flex gap-2">
				{#each languages as item}
					<label>
						<input type="checkbox" bind:checked={item.checked} />
						{item.name}
					</label>
				{/each}
			</div>
		</div>
		<div class="my-4">
			<button type="submit" class="h-12 rounded-3xl border-2 border-blue-600 px-4">Anwenden</button>
		</div>
	</form>

	<hr class="my-4" />

	<button type="button" class="h-12 rounded-3xl border-2 border-blue-600 px-4" on:click={showModal}>open modal</button>
	<dialog bind:this={dialog}>
		<header>
			<button type="button" on:click={closeModal}>x</button>
		</header>
		<h1>Hello world</h1>
	</dialog>

	<!-- <Counter /> -->

	<!-- <p class="my-4 mx-auto max-w-[14rem] leading-[1.35]">
		Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.
	</p> -->

	<!-- <p class="my-4 mx-auto max-w-[14rem] leading-[1.35]">
		Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for the officially supported framework, also
		powered by Vite!
	</p> -->
</main>

<style>
	/* :root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	} */

	/* main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	} */

	/* img {
		height: 16rem;
		width: 16rem;
	} */

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 2rem auto;
		max-width: 14rem;
	} */

	/* p {
		max-width: 14rem;
		margin: 1rem auto;
		line-height: 1.35;
	} */

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}

	dialog::backdrop {
		--s: 222px; /* control the size */
		--_g: #7f727b 10%, #d6b4c2 10.5% 19%, #0000 19.5% 80.5%, #d6b4c2 81% 89.5%, #baa0ab 90%;
		--_c: from -90deg at 37.5% 50%, #0000 75%;
		--_l1: linear-gradient(145deg, var(--_g));
		--_l2: linear-gradient(35deg, var(--_g));
		background: var(--_l1), var(--_l1) calc(var(--s) / 2) var(--s), var(--_l2), var(--_l2) calc(var(--s) / 2) var(--s),
			conic-gradient(var(--_c), #7f727b 0) calc(var(--s) / 8) 0,
			conic-gradient(var(--_c), #baa0ab 0) calc(var(--s) / 2) 0,
			linear-gradient(90deg, #baa0ab 38%, #7f727b 0 50%, #baa0ab 0 62%, #7f727b 0);
		background-size: var(--s) calc(2 * var(--s) / 3);
	}
</style>

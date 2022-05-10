<script>
	import html2canvas from 'html2canvas'
	import Canvas from './lib/Canvas.svelte'

	let dialog
	const showModal = () => {
		dialog.showModal()
	}
	const closeModal = () => {
		dialog.close()
	}

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

	let imagesGenerated = false
	let isPainting = false
	let files = []
	const languages = [
		{ key: 'de-DE', name: 'deutsch', checked: true },
		{ key: 'en-US', name: 'englisch', checked: false },
		{ key: 'es-ES', name: 'spanisch', checked: false },
		{ key: 'fr-FR', name: 'französisch', checked: false },
		{ key: 'ru-RU', name: 'russisch', checked: false },
		// { key: 'pl-PL', name: 'polnisch', checked: false },
	]

	const onSubmit = async () => {
		resetPage()
		const dateArray = []

		// run process
		for (const language of languages) {
			if (language.checked) {
				// dateArray.push(formatDate(dateInput, language.key))
				// localeDate = dateArray.at(-1)
				localeDate = formatDate(dateInput, language.key)
				dateArray.push(localeDate)
				await generateImage()
			}
		}

		// ready to be saved
		imagesGenerated = true
		console.log(files)
	}

	const generateImage = async () => {
		if (!isPainting) {
			isPainting = true
			window.scroll(0, 0)

			await new Promise(resolve => {
				requestAnimationFrame(async () => {
					try {
						const canvas = await html2canvas(document.querySelector('#canvas'), {
							backgroundColor: null,
							useCORS: false,
							logging: true,
						})
						const image = canvas.toDataURL('image/png')
						files.push(image)
					} catch (error) {
						console.error(error)
					} finally {
						isPainting = false
						resolve()
					}
				})
			})
		}
	}

	const resetPage = () => {
		imagesGenerated = false
		isPainting = false
		files = []

		window.scroll(0, 0)
		// navbar.focus()
	}
</script>

<main>
	<button type="button" class="h-12 rounded-3xl border-2 border-blue-600 px-4" on:click={showModal}>open modal</button>
	<hr class="my-4" />

	<form class="my-4 accent-[#ff3e00]" on:submit|preventDefault={onSubmit}>
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

	<Canvas {localeDate} />

	<dialog bind:this={dialog}>
		<header>
			<button type="button" on:click={closeModal}>x</button>
		</header>
		<h1>Hello world</h1>
	</dialog>

	<!-- <Counter /> -->
</main>

<style>
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

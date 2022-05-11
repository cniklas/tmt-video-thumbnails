<script>
	import html2canvas from 'html2canvas'
	import Canvas from './lib/Canvas.svelte'

	// templates
	import mockup from './assets/mockup.svg'
	const imageTemplates = [{ name: 'mockup', source: mockup }]
	let selectedTemplate

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

	let finished = false
	let isPainting = false
	let images = []
	let languages = [
		{ key: 'de-DE', name: 'deutsch', checked: true },
		{ key: 'en-US', name: 'englisch', checked: false },
		{ key: 'es-ES', name: 'spanisch', checked: false },
		{ key: 'fr-FR', name: 'französisch', checked: false },
		{ key: 'ru-RU', name: 'russisch', checked: false },
		// { key: 'pl-PL', name: 'polnisch', checked: false },
	]

	const resetPage = () => {
		;[dateInput] = new Date().toISOString().split('T')
		localeDate = formatDate(dateInput)

		finished = false
		isPainting = false
		images = []
		languages.map(item => (item.checked = item.name === 'deutsch' ? true : false))
		// https://svelte.dev/tutorial/updating-arrays-and-objects
		languages = languages

		window.scroll(0, 0)
	}

	const generateImage = async (fileName = 'download') => {
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
						images.push({ name: `${fileName}.png`, image })
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

	const onSubmit = async () => {
		// run process
		for (const language of languages) {
			if (language.checked) {
				localeDate = formatDate(dateInput, language.key)
				const fileName = `${dateInput} ${selectedTemplate.name} ${language.key.slice(0, 2)}`
				await generateImage(fileName)
			}
		}

		finished = true
		// https://svelte.dev/tutorial/updating-arrays-and-objects
		images = images
		if (images.length) showModal()
	}

	let dialog
	const showModal = () => {
		dialog.showModal()
		// document.body.classList.add('freeze')
	}
	const closeModal = () => {
		dialog.close()
		resetPage()
		// document.body.classList.remove('freeze')
	}
	// 🚩 TODO funktioniert browserübergreifend?
	// 🚩 TODO <dialog> -Element-Tutorial weiterlesen
	document.addEventListener('keydown', e => {
		// if (e.code === 'Escape') document.body.classList.remove('freeze')
		if (e.code === 'Escape' && dialog.getAttribute('open') !== null) resetPage()
	})
</script>

<main>
	<section class="flex justify-center">
		<form class="my-4 text-center accent-[#ff3e00]" on:submit|preventDefault={onSubmit}>
			<div class="mb-4">
				<select bind:value={selectedTemplate}>
					{#each imageTemplates as item}
						<option value={item}>{item.name}</option>
					{/each}
				</select>
			</div>
			<div class="mb-4">
				<input type="date" bind:value={dateInput} on:change={() => (localeDate = formatDate(dateInput))} />
			</div>
			<div class="mb-4 flex gap-2">
				{#each languages as item}
					<label>
						<input type="checkbox" bind:checked={item.checked} />
						{item.name}
					</label>
				{/each}
			</div>
			<div>
				<button type="submit" class="h-12 rounded-3xl border-2 border-blue-600 px-4">Bilder generieren</button>
			</div>
		</form>
	</section>

	<Canvas {localeDate} {selectedTemplate} />

	<dialog bind:this={dialog}>
		<header>
			<button type="button" on:click={closeModal}>x</button>
		</header>

		<h1>Bild{images.length > 1 ? 'er' : ''} speichern</h1>

		<ul>
			{#each images as item}
				<li>
					<a href={item.image} download={item.name} class="underline">{item.name}</a>
				</li>
			{/each}
		</ul>
	</dialog>

	<!-- <Counter /> -->
</main>

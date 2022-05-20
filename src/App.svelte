<script>
	import { onMount } from 'svelte'
	import html2canvas from 'html2canvas'
	import Canvas from './lib/Canvas.svelte'

	// templates
	import mockup from './assets/mockup.svg'
	const imageTemplates = [{ name: 'mockup', source: mockup }]
	let selectedTemplate

	let settingsEl
	let downloadsEl

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

	// let finished = false
	let isPainting = false
	let images = []
	let languages = [
		{ key: 'de-DE', name: 'deutsch', checked: true },
		{ key: 'en-US', name: 'englisch', checked: false },
		{ key: 'es-ES', name: 'spanisch', checked: false },
		{ key: 'fr-FR', name: 'französisch', checked: false },
		{ key: 'ru-RU', name: 'russisch', checked: false },
	]

	const resetPage = () => {
		// ;[dateInput] = new Date().toISOString().split('T')
		// localeDate = formatDate(dateInput)

		// finished = false
		images = []
		// languages.map(item => (item.checked = item.name === 'deutsch' ? true : false))
		// // https://svelte.dev/tutorial/updating-arrays-and-objects
		// languages = languages

		window.scroll(0, 0)
	}

	const generateImage = async (fileName = 'download') => {
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
					resolve()
				}
			})
		})
	}

	const onSubmit = async () => {
		closeModal(null, settingsEl)

		// run process
		isPainting = true
		for (const language of languages) {
			if (language.checked) {
				localeDate = formatDate(dateInput, language.key)
				const fileName = `${dateInput} ${selectedTemplate.name} ${language.key.slice(0, 2)}`
				await generateImage(fileName)
			}
		}

		isPainting = false
		// finished = true
		// https://svelte.dev/tutorial/updating-arrays-and-objects
		images = images
		if (images.length) showModal(null, downloadsEl)
	}

	const showModal = (_, dialog = settingsEl) => {
		// document.body.classList.add('freeze')
		dialog.showModal()
	}
	const closeModal = (_, dialog = settingsEl) => {
		dialog.close()
		if (dialog === downloadsEl) resetPage()
		// document.body.classList.remove('freeze')
	}
	onMount(() => {
		downloadsEl.addEventListener('close', () => {
			resetPage()
		})
		// showModal(null, settingsEl)

		// // https://www.stefanjudis.com/blog/a-look-at-the-dialog-elements-super-powers/#how-to-close-the-modal-on-%60%3A%3Abackdrop%60-click
		// dialog.addEventListener('click', event => {
		// 	if (event.target.nodeName === 'DIALOG') {
		// 		closeModal()
		// 	}
		// })
	})
</script>

<main>
	<Canvas {localeDate} {selectedTemplate} {isPainting} on:clicked={showModal} />

	<dialog class="dialog rounded-3xl p-6" bind:this={settingsEl}>
		<header class="flex items-center justify-between">
			<div class="text-2xl font-semibold">Einstellungen</div>
			<button
				type="button"
				class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-2xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
				on:click={e => closeModal(e, settingsEl)}
			>
				<span class="sr-only">schließen</span>
				<span class="close-icon" />
			</button>
		</header>

		<form class="my-4 text-center accent-blue-700" on:submit|preventDefault={onSubmit}>
			<div class="mb-4">
				<select
					bind:value={selectedTemplate}
					class="rounded-lg border border-current px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
				>
					{#each imageTemplates as item}
						<option value={item}>{item.name}</option>
					{/each}
				</select>
			</div>
			<div class="mb-4">
				<input
					type="date"
					bind:value={dateInput}
					class="rounded-lg border border-current px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
					on:change={() => (localeDate = formatDate(dateInput))}
				/>
			</div>
			<div class="mb-8 flex gap-2">
				{#each languages as item}
					<label>
						<input type="checkbox" bind:checked={item.checked} />
						{item.name}
					</label>
				{/each}
			</div>
			<div>
				<button
					type="submit"
					class="h-12 rounded-3xl bg-blue-700 px-12 text-lg font-medium uppercase tracking-wide text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
					>Bilder generieren</button
				>
			</div>
		</form>
	</dialog>

	<dialog class="dialog rounded-3xl p-6" bind:this={downloadsEl}>
		<header class="flex items-center justify-between">
			<div class="text-2xl font-semibold">Downloads</div>
			<button
				type="button"
				class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-2xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
				on:click={e => closeModal(e, downloadsEl)}
			>
				<span class="sr-only">schließen</span>
				<span class="close-icon" />
			</button>
		</header>

		<div class="my-4">
			<ul class="mb-8 list-disc pl-5 font-medium space-y-1">
				{#each images as item}
					<li>
						<a
							href={item.image}
							download={item.name}
							class="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
							>{item.name}</a
						>
					</li>
				{/each}
			</ul>
			<div class="text-center">
				<button
					type="button"
					class="h-10 rounded-3xl border-2 border-current bg-white px-10 text-lg font-medium tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
					on:click={e => closeModal(e, downloadsEl)}>schließen</button
				>
			</div>
		</div>
	</dialog>
</main>

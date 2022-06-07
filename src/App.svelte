<script>
	import { onMount } from 'svelte'
	import html2canvas from 'html2canvas'
	import Dialog from './lib/Dialog.svelte'
	import Canvas from './lib/Canvas.svelte'

	export let languages = []
	export let imageTemplates = []
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

	let isPainting = false
	let images = []

	const resetPage = () => {
		// ;[dateInput] = new Date().toISOString().split('T')
		// localeDate = formatDate(dateInput)

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
					const canvas = await html2canvas(document.querySelector('#js-canvas'), {
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
		closeModal(settingsEl)

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
		// https://svelte.dev/tutorial/updating-arrays-and-objects
		images = images
		if (images.length) showModal(downloadsEl)
	}

	const showModal = (dialogEl) => {
		// document.body.classList.add('freeze')
		dialogEl?.showModal()
	}
	const closeModal = (dialogEl) => {
		dialogEl?.close()
		if (dialogEl === downloadsEl) resetPage()
		// document.body.classList.remove('freeze')
	}
	onMount(() => {
		downloadsEl.addEventListener('close', () => {
			resetPage()
		})
		// showModal(settingsEl)

		// // https://www.stefanjudis.com/blog/a-look-at-the-dialog-elements-super-powers/#how-to-close-the-modal-on-%60%3A%3Abackdrop%60-click
		// dialog.addEventListener('click', event => {
		// 	if (event.target.nodeName === 'DIALOG') {
		// 		closeModal()
		// 	}
		// })
	})
</script>

<Canvas {localeDate} {selectedTemplate} {isPainting} on:clicked={() => showModal(settingsEl)} />

<Dialog title="Einstellungen" bind:el={settingsEl} on:close="{() => closeModal(settingsEl)}">
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
</Dialog>

<Dialog title="Downloads" bind:el={downloadsEl} on:close="{() => closeModal(downloadsEl)}">
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
				on:click={() => closeModal(downloadsEl)}>schließen</button
			>
		</div>
	</div>
</Dialog>

<script>
	import { createEventDispatcher } from 'svelte'

	export let localeDate
	export let selectedTemplate
	export let isPainting = false

	const dispatch = createEventDispatcher()
	const onClicked = () => {
		dispatch('clicked')
	}
</script>

<section id="canvas" class="image-dimensions relative mx-auto flex flex-col items-center">
	<img src={selectedTemplate?.source} alt={selectedTemplate?.name} />
	<h1
		class="google-font absolute top-[var(--text-box-top)] flex h-48 cursor-pointer items-center border-4 border-current px-8 text-[117px] font-semibold leading-none text-white"
		on:click|stopPropagation={onClicked}
	>
		<span class:h2c-offset={isPainting}>
			{localeDate}
		</span>
	</h1>
</section>

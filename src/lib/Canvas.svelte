<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let localeDate
	export let selectedTemplate
	export let isPainting = false
</script>

<section id="js-canvas" class="canvas relative mx-auto flex flex-col items-center">
	<img src={selectedTemplate?.source} alt={selectedTemplate?.name} width="1920" height="1080" />
	<h1
		class="canvas-text absolute flex h-48 cursor-pointer items-center border-4 border-current px-8 font-semibold leading-none text-white"
		on:click|stopPropagation={() => dispatch('clicked')}
	>
		<span class:h2c-offset={isPainting}>
			{localeDate}
		</span>
	</h1>
</section>

<style>
	:root {
		--text-top: 360px; /* tbd */
		--h2c-offset: 0; /* tbd */
	}

	.canvas {
		width: 1920px;
		height: 1080px;
	}

	.canvas-text {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 117px;
		top: var(--text-top);
	}

	.h2c-offset {
		transform: translateY(var(--h2c-offset));
	}
</style>

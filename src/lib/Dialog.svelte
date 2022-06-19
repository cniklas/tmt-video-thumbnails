<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	let el
	export let title
	export const open = () => {
		// document.body.classList.add('freeze')
		el.showModal()
	}
	export const close = () => {
		el.close()
		dispatch('closed')
		// document.body.classList.remove('freeze')
	}
</script>

<dialog class="dialog rounded-xl p-6" bind:this={el}>
	<header class="mb-6 flex items-center justify-between">
		<div class="text-2xl font-semibold">{title}</div>
		<button
			type="button"
			class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-2xl leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-opacity-80 focus-visible:ring-offset-2"
			on:click={close}
		>
			<span class="sr-only">schließen</span>
			<span class="close-icon" />
		</button>
	</header>

	<slot />
</dialog>

<style lang="postcss">
/* 	dialog::backdrop {
		--s: 222px;
		--_g: #7f727b 10%, #d6b4c2 10.5% 19%, #0000 19.5% 80.5%, #d6b4c2 81% 89.5%, #baa0ab 90%;
		--_c: from -90deg at 37.5% 50%, #0000 75%;
		--_l1: linear-gradient(145deg, var(--_g));
		--_l2: linear-gradient(35deg, var(--_g));
		background: var(--_l1), var(--_l1) calc(var(--s) / 2) var(--s), var(--_l2), var(--_l2) calc(var(--s) / 2) var(--s),
			conic-gradient(var(--_c), #7f727b 0) calc(var(--s) / 8) 0,
			conic-gradient(var(--_c), #baa0ab 0) calc(var(--s) / 2) 0,
			linear-gradient(90deg, #baa0ab 38%, #7f727b 0 50%, #baa0ab 0 62%, #7f727b 0);
		background-size: var(--s) calc(2 * var(--s) / 3);
	} */

	.dialog {
		backdrop-filter: blur(40px);
		background: linear-gradient(
			113.11deg,
			hsla(0, 0%, 100%, 0.6) 0.6%,
			hsla(0, 0%, 100%, 0.8) 0.61%,
			hsla(0, 0%, 100%, 0.2) 99.61%
		);
		box-shadow: 0px 2.8px 2.2px rgba(0, 0, 0, 0.02), 0px 6.7px 5.3px rgba(0, 0, 0, 0.028),
			0px 12.5px 10px rgba(0, 0, 0, 0.035), 0px 22.3px 17.9px rgba(0, 0, 0, 0.042),
			0px 41.8px 33.4px rgba(0, 0, 0, 0.05), 0px 100px 80px rgba(0, 0, 0, 0.07);
		outline: 2px solid hsl(0deg 0% 100% / 10%);
		outline-offset: -2px;

		@supports not (backdrop-filter: blur()) {
			background: linear-gradient(
				113.11deg,
				hsla(0, 0%, 96%, 0.96) 0.6%,
				hsla(0, 0%, 96%, 0.98) 0.61%,
				hsla(0, 0%, 96%, 0.92) 99.61%
			);
		}
	}

	.dialog::backdrop {
		background: none;
	}

	.close-icon {
		@apply relative h-3.5 w-0.5 rotate-45 bg-current text-gray-800;

		&::after {
			@apply absolute top-1.5 -left-1.5 h-0.5 w-3.5 bg-current;
			content: '';
		}
	}
</style>

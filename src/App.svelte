<script>
	import logo from './assets/svelte.png'
	import Counter from './lib/Counter.svelte'
</script>

<main class="mx-auto p-4 text-center">
	<img src={logo} alt="Svelte Logo" class="h-64 w-64" />
	<h1 class="my-8 mx-auto max-w-[14rem] text-[4rem] font-thin uppercase leading-[1.1] text-[#ff3e00]">
		Hello world!
	</h1>

	<Counter />

	<p class="my-4 mx-auto max-w-[14rem] leading-[1.35]">
		Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.
	</p>

	<p class="my-4 mx-auto max-w-[14rem] leading-[1.35]">
		Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for the officially supported framework, also
		powered by Vite!
	</p>
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
</style>

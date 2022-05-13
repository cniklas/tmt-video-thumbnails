<script>
	export let localeDate
	export let selectedTemplate
	export let isPainting = false
</script>

<section id="canvas" class="image-dimensions relative mx-auto flex flex-col items-center">
	<img src={selectedTemplate?.source} alt={selectedTemplate?.name} />
	<h1
		class="google-font absolute top-[var(--text-box-top)] flex h-48 items-center border-4 border-current px-8 text-[117px] font-semibold leading-none text-white"
	>
		<span class:h2c-offset={isPainting}>
			{localeDate}
		</span>
	</h1>
</section>

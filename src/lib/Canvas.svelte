<script>
	import mockup from '../assets/mockup.svg'

	export let localeDate
</script>

<section id="canvas" class="image-dimensions relative mx-auto flex flex-col items-center">
	<img src={mockup} alt="Mockup" />
	<h1
		class="absolute top-[var(--text-box-top)] border-4 border-current py-4 px-8 text-[4rem] font-thin uppercase leading-[1.1] text-white"
	>
		{localeDate}
	</h1>
</section>

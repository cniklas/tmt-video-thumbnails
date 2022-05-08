<script>
	let count = 0
	const increment = () => {
		count += 1
	}
</script>

<button
	class="w-48 cursor-pointer rounded-[2rem] border-2 border-transparent bg-[#ff3e00] bg-opacity-10 py-4 px-8 font-[inherit] text-base text-[#ff3e00] outline-none focus:border-[#ff3e00] active:bg-opacity-20"
	on:click={increment}
>
	Clicks: {count}
</button>

<style>
	button {
		/* font-family: inherit;
		font-size: inherit;
		padding: 1em 2em;
		color: #ff3e00;
		background-color: rgba(255, 62, 0, 0.1);
		border-radius: 2em;
		border: 2px solid rgba(255, 62, 0, 0);
		outline: none;
		width: 200px; */
		font-variant-numeric: tabular-nums;
		/* cursor: pointer; */
	}

	/* button:focus {
		border: 2px solid #ff3e00;
	} */

	/* button:active {
		background-color: rgba(255, 62, 0, 0.2);
	} */
</style>

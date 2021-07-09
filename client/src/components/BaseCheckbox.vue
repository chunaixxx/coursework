<template>
	<label class="label">
		<input
			class="hidden-checkbox"
			type="checkbox"
			hidden
			v-bind:value="value"
			v-on:input="$emit('input', $event.target.value)"
		/>
		<div class="checkbox"></div>
		<svg
			class="icon"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			id="mdi-check"
			width="18"
			height="18"
			viewBox="0 0 24 24"
		>
			<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
		</svg>
	</label>
</template>

<script>
export default {
	props: ['value'],
};
</script>

<style scoped lang="scss">
.label {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.checkbox {
	border-radius: 50%;
	border: 1px solid #1e1e1e;
	width: 25px;
	height: 25px;

	display: flex;
	justify-content: center;
	align-items: center;

	position: relative;
	transition: background-color 0.25s ease;
}

.icon {
	position: absolute;
	transition: transform 0.25s ease;
	transform: scale(0);
}

.hidden-checkbox:checked + .checkbox {
	background-color: #f1f1f1;
}

.hidden-checkbox:checked + .checkbox + .icon {
	transform: scale(1);
}
</style>

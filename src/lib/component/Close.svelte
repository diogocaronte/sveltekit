<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>

<div class="close-button" on:click={ () => dispatch("close") }>X</div>

<style>
    .close-button {
        cursor: pointer;
    }

    .close-button:hover {
        transform: scale(1.3);
    }
</style>
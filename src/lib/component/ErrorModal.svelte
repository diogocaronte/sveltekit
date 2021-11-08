<script>
    import Close from "./Close.svelte";

    export let title = "";
    export let message = "";
</script>

<div class="error-modal">
    <h3>{ title }</h3>
    <p>{ message }</p>
    <Close on:close />
</div>

<style>
    div {
        border: 1px solid;
        padding: 1em;
        box-sizing: border-box;

        font-size: .8em;

        background-color: #fffc;
    }

    :global(.close-button) {
        position: absolute;
        top: 1em;
        right: 1em;
    }
</style>
<script context="module">
    import PostController from "$lib/controller/PostController";

    const controller = new PostController();
</script>

<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let message;
</script>

<div class="post-form">
    <textarea type="text" bind:value={ message } placeholder="Em que você está pensando"></textarea>
    <button id="post" on:click={ () => {
        controller.create(message)
            .then(data => dispatch('sucess', data))
            .catch(data => dispatch('error', data));
        message = "";
    }}>Postar</button>
</div>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
    }

    textarea {
        width: 100%;
        height: 10em;

        resize: none;
        padding: 1em;

        box-sizing: border-box;
    }
    
    button {
        position: absolute;
        right: 1.5em;
        bottom: 1.5em;
        padding: .25em;
    }
</style>
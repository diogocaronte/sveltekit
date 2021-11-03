<script context="module">
    import AuthController from "$lib/controller/AuthController";

    const controller = new AuthController();
</script>

<script>
    import Credential from "$lib/model/Credential";

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let credential = new Credential();

    function register() {
        controller.register(credential)
            .then(data => dispatch('sucess', data))
            .catch();
    }
</script>

<div>
    <h3>Register</h3>
    <input type="text" bind:value={ credential.username }/>
    <input type="password" bind:value={ credential.password }/>
    <button on:click={ register }>Register</button>
</div>

<style>
    div {
         font-family: sans-serif;
        
        display: flex;
        flex-direction: column;
        gap: .5em;
        color:#12182c;
        background-color: #d3d8ff;

        padding: .5em;

        text-align: center;
    }
</style>
<script context="module">
    import AuthController from "$lib/controller/AuthController";

    const controller = new AuthController();
</script>

<script>
    import Credential from '$lib/model/Credential';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let credential = new Credential();

    function login() {
        controller.login(credential)
            .then(data => dispatch('sucess', data))
            .catch(data => dispatch('error', data));
    }
</script>

<div>
    <h3>Login</h3>
    <input minlength="5" type="text" bind:value={ credential.username }/>
    <input type="password" bind:value={ credential.password }/>
    <button on:click={ login }>Login</button>
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
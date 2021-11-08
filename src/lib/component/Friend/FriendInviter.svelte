<script context="module">
    import FriendController from "$lib/controller/FriendController";

    const controller = new FriendController();
</script>

<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let friend;
</script>

<section>
    <input type="text" bind:value={ friend } placeholder="username"/>
    <button id="invite" on:click={ () => {
        controller.add(friend)
            .then(data => dispatch("sucess", data))
            .catch(data => dispatch("error", data));
        friend = "";
    }}>Convidar amigo</button>
</section>

<style>
    input, button {
        box-sizing: border-box;
        width: 100%;
    }
</style>
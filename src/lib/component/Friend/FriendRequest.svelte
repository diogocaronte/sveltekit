<script context="module">
    import FriendController from "$lib/controller/FriendController";
    import hash_image from "$lib/hash_image";

    const controller = new FriendController();
</script>

<script>
    import { createEventDispatcher } from "svelte";

    export let inviter;
    
    let text = "Olá, vamos ser amigos no SwipeUP";
    let show_accept = true;

    const dispatch = createEventDispatcher();
</script>

<section class="request">
    <img width="100%" height="100%" src={ hash_image(inviter) } alt="no alt">
    <div>
        <h3>{inviter}</h3>
        <p>{text}</p>
        {#if show_accept}
            <h4 on:click={ () => {
                controller.add(inviter)
                    .then( data => {
                        dispatch('sucess', data)
                        text = "Vocês são amigos agora";
                        show_accept = false;
                    }).catch();
            }}>Aceitar</h4>
        {/if}
    </div>
</section>

<style>
    h4 {
        position: absolute;
        right: 1em;
        bottom: 1em;
        cursor: pointer;
    }

    img {
        width: 4em;
        height: 4em;
        object-fit: scale-down;
        border-radius: 100%;
    }

    section {
        position: relative;
        display: flex;
        flex-direction: row;

        box-sizing: border-box;

        background-color: #5C9ECF22;

        padding: 1em;

        box-sizing: border-box;
    }

    h3 { padding-bottom: .5em; }
    section > div { margin: 0 1em; }
</style>
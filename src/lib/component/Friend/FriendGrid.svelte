<script context="module">
    import hash_image from "$lib/hash_image";

    import FriendController from "$lib/controller/FriendController";

    const controller = new FriendController();

    export const ssr = false;
</script>

<script>
    export let username;

    let usernames;

    $: controller.listByUsername(username)
        .then(data => usernames = data);
</script>

<section>
    {#if usernames}
        {#if (usernames.length == 0)}
            <div></div>
            <span align='center'>Encontre novos amigos</span>
        {/if}
        {#each usernames.splice(0, 9) as username}
            <img width="100%" height="100%" src={ hash_image(username) } alt="no alt">
        {/each}
    {/if}
</section>

<style>
    div {
        position: relative;
        width: 100%;
        padding: 50% 0;
    }

    img {
        object-fit: contain;
        border-radius: 5px;
    }

    section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 2%;
        width: 100%;
        padding-bottom: 4%;

        border: 1px solid #0001;
    }
</style>
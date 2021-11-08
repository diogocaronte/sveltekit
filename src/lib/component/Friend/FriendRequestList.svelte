<script>
    import FriendRequest from "./FriendRequest.svelte";

    export let requests = [];
</script>

<article class="post-list">
    {#each requests as request}
        <FriendRequest inviter={ request } on:sucess/>
    {/each}
</article>
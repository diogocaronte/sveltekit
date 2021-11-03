<script>
    import Post from "./Post.svelte";

    export let posts = [];
</script>

<article class="post-feed">
    {#each posts as post}
        <Post {post} on:delete/>
    {/each}
</article>
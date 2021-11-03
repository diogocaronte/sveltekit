<script context="module">
    import PostController from "$lib/controller/PostController";
    import hash_image from "$lib/hash_image";

    const controller = new PostController();
</script>

<script>    
    import Close from "../Close.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let post;
</script>

<section class="post-component">
    <img src={ hash_image(post.author) } alt="">
    <div>
        <h3>{ post.author } <i>{ post.createdAt }</i></h3>
        <p>{ post.message }</p>
        <Close on:close={ () => {
            controller.delete(post._id)
                .then(data => dispatch("delete", post._id))
                .catch();
        }} />
    </div>
</section>

<style>
    img {
        width: 4em;
        height: 4em;
        object-fit: scale-down;
        border-radius: 100%;
        border: 1px solid;
    }

    :global(.close-button) {
        position: absolute;
        top: 1em;
        right: 1em;
    }

    section {
        position: relative;
        display: flex;
        flex-direction: row;

        box-sizing: border-box;

        background-color: #5C9ECF22;

        word-break: break-all;
        padding: 2em;
    }

    
    i { font-size: .5em; }
    h3 { padding-bottom: .5em; }
    section > div { margin: 0 1em; }
</style>
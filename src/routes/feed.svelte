<script context="module">
    export const ssr = false;

    import UserController from "$lib/controller/UserController";
    import PostController from "$lib/controller/PostController";

    import hash_image from "$lib/hash_image";

    const user_controller = new UserController();
    const post_controller = new PostController();

    export async function load({ session, fetch }) {
        if (!session.user.authenticated) {
            return {
                status: 302,
                redirect: '/'
            }
        }

        const user = await fetch('/api/v1/user.json').then(res => res.json());
        await Promise.all([user]);

        return {
            props: {
                user
            }
        }
    }
</script>

<script>
    import Box from "$lib/component/Box.svelte";
    import Form from "$lib/component/Post/Form.svelte";
    import FriendGrid from "$lib/component/Friend/FriendGrid.svelte";
    import { browser } from "$app/env";
    import PostList from "$lib/component/Post/PostList.svelte";

    export let user;

    let posts = [];
    if (browser) {
        post_controller.list().then(data => posts = data);
    }
</script>

<main>
    <Box>
        <img src={ hash_image(user.username) } width="100%" alt="no alt">
    </Box>
    
    <Box>
        <Form on:sucess={ data => {
            posts.unshift(data.detail.post)
            posts = posts;
        }}/>
        <br />
        <PostList {posts} on:delete={ data => {
            posts = posts.filter(post => post._id != data.detail)
        }}/>
    </Box>

    <div>
        <Box><FriendGrid username={ user.username }/></Box>
        <br />
        <Box>content</Box>
    </div>
</main>

<style>
    img {
        border-radius: .5em;
    }

    main {
        display: grid;
        grid-template-columns: 15% 1fr 25%;
        gap: 1em;

        margin: 0 auto;
        padding-top: 1em;
        width: 90%;
    }

    
    :global(.box-component) {
        flex-direction: column;
        height: max-content; /* min-content maybe */
    }
</style>

<svelte:head>
    <style>
        body {
            background-color: #D9E6F6;
            font-size: 1vw;
        }
    </style>
</svelte:head>
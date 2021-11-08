<script context="module">
    export const ssr = false;

    import PostController from "$lib/controller/PostController";
    import FriendController from "$lib/controller/FriendController";

    import hash_image from "$lib/hash_image";

    const post_controller = new PostController();
    const friend_controller = new FriendController();

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
    import { browser } from "$app/env";

    import Box from "$lib/component/Box.svelte";
    import Form from "$lib/component/Post/Form.svelte";
    import FriendGrid from "$lib/component/Friend/FriendGrid.svelte";
    import PostList from "$lib/component/Post/PostList.svelte";
    import FriendInviter from "$lib/component/Friend/FriendInviter.svelte";
    import FriendRequestList from "$lib/component/Friend/FriendRequestList.svelte";
    import ErrorModal from "$lib/component/ErrorModal.svelte";

    export let user;

    let posts = [];
    let friends = [];
    let friend_requests = [];
    if (browser) {
        post_controller.list().then(data => posts = data);
        friend_controller.listByUsername(user.username).then(data => friends = data);
        friend_controller.request_list(user.username).then(data => friend_requests = data);
    }

    let show_modal = false;
    let title = "Title";
    let message = "Message";

    function error(data) {
        show_modal = true;
        title = "Error";
        if (Array.isArray(data.detail.message)) {
            message = "";
            for (let i of data.detail.message) {
                message += `${i.stack}; `;
            }
        } else {
            message = data.detail.message;
        }
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
        }} on:error={ error }/>
        <br />
        <PostList {posts} on:delete={ data => {
            posts = posts.filter(post => post._id != data.detail)
        }}/>
    </Box>

    <div>
        <Box><FriendGrid usernames={ friends }/></Box>
        <br />
        <Box><FriendInviter on:sucess={ data => {
            console.log(data);
        }} on:error={ error }/></Box>
        <br />
        <Box><FriendRequestList requests={ friend_requests }/></Box>
    </div>
</main>
{#if show_modal}
    <ErrorModal { title } { message } on:close={ () => {
        show_modal = false;
    }}/>
{/if}

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

    :global(.post-component) {
        margin-top: 1em;
    }
    
    :global(.box-component) {
        flex-direction: column;
        height: max-content; /* min-content maybe */
    }

    :global(div.error-modal) {
        position: fixed;
        left: 1em;
        bottom: 1em;

        width: 30%;
        height: max-content;
        max-height: 20%;

        font-size: 1.6em;
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
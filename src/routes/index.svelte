<script>
    import { goto } from '$app/navigation';
    import Swapper from '$lib/component/auth/Swapper.svelte';
    import ErrorModal from '$lib/component/ErrorModal.svelte';

    let show_modal = false;
    let title = "Title";
    let message = "Message";

    function redirectToFeed() {
        goto('/feed'); window.location.reload(false);
    }
</script>

<main>
    <h2>Swipe<span>UP</span></h2>
    <br />
    <Swapper on:sucess={ redirectToFeed } on:error={ data => {
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
    }}/>
</main>
{#if show_modal}
    <ErrorModal { title } { message } on:close={ () => {
        show_modal = false;
    }}/>
{/if}

<style>
    span {
        color: blue
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    :global(div.error-modal) {
        position: fixed;
        left: 1em;
        bottom: 1em;

        width: 30%;
        height: max-content;
        max-height: 20%;
    }
</style>

<svelte:head>
    <style>
        body {
            background-color: #D9E6F6;
            font-size: 2vw;
        }
    </style>
</svelte:head>
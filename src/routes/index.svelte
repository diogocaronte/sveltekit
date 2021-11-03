<script>
    import { goto } from '$app/navigation';
    import Swapper from '$lib/component/auth/Swapper.svelte';

    function redirectToFeed() {
        goto('/feed'); window.location.reload(false);
    }
</script>

<main>
    <h2>Swipe<span>UP</span></h2>
    <br />
    <Swapper sucess={ redirectToFeed }/>
</main>

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
</style>

<svelte:head>
    <style>
        body {
            background-color: #D9E6F6;
            font-size: 2vw;
        }
    </style>
</svelte:head>
<script>
    import Login from '$lib/component/auth/Login.svelte';
    import Register from '$lib/component/auth/Register.svelte';

    let is_login = true;

</script>

<div class="swapper-component">
    {#if is_login}
        <Login on:sucess on:error/>
    {:else}
        <Register on:sucess on:error/>
    {/if}
    <h5 on:click={ () => is_login = !is_login }>{ is_login ? "create a new account" : "you have an account?" }</h5>
</div>

<style>
    h5 {
        color: blue;
        cursor: pointer;
    }
</style>
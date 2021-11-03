<script>
    
</script>

<div id="div">
    <h3>{user.username}</h3>
    <h5 on:click={ redirectToFeed }>Continuar para o feed</h5>
    <h6>ou</h6>
    <h5 on:click={ () => authenticated = false }>Conectar com uma conta diferente</h5>
</div>
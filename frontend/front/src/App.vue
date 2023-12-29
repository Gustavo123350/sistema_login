<template>
  <div>
    <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
      <div class="bg-dark p-4">
        <h5 class="text-body-emphasis h4">Menu:<i class="bi bi-person"></i></h5>
        <!-- Links de navegação -->
        <ul>
          <li><router-link class="ct" to="/">Create:<i class="bi bi-person-plus-fill"></i></router-link></li>
          <li><router-link class="lg" to="/login">Login:<i class="bi bi-person-circle"></i></router-link></li>
          <li><router-link class="US" to="/users">Usuarios:<i class="bi bi-person-vcard"></i></router-link></li>
          <!-- Adicione outros links conforme necessário -->
        </ul>
        <!-- Fim dos links de navegação -->
        <span class="text-body-secondary"></span>
      </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </div>
   <RouterView />
</template>
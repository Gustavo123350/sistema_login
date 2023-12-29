<template>
  <div class="container2">
    <h2 class="titulo3">Login</h2>
    <br/>
    <br/>
    <form @submit.prevent="loginUser">
      <input type="email" class="emal" v-model="email" placeholder="Email:" required>
      <br/> 
      <input type="password" class="PS" v-model="password" placeholder="Password:" required>
      <br/>
      <button class="su" type="submit">Login:<i class="bi bi-person-plus-fill"></i></button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        // Se o login for bem-sucedido, o token JWT deve estar em 'data.token'
        // Você pode armazenar esse token em localStorage ou Vuex para uso futuro
        console.log(data); // Tratar a resposta do servidor

        // Se o login for bem-sucedido, exibe um alerta
        if (response.ok) {
          window.alert('Login feito com sucesso!');
          // Aqui você pode redirecionar o usuário para outra página ou fazer outras operações necessárias após o login bem-sucedido
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
  }
};
</script>

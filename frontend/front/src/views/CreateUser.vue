<template>
  <div class="container">
   <h2 class="titulo">Criar Usuário</h2>
   <br/>
   <br/>
    <form @submit.prevent="createUser">
      <input type="text" class="nm" v-model="name" placeholder="Nome:" required>
      <br/>
      <input type="email" class="el" v-model="email" placeholder="Email:" required>
      <br/>
      <input type="password"  class="pd" v-model="password" placeholder="Password:" required>
       <br/>
       <br/>
      <button type="submit" class="CS">Criar Usuário:<i class="bi bi-person-add"></i></button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });

        const data = await response.json();
        console.log('Novo usuário criado:', data);
        // Lógica adicional após a criação do usuário, se necessário
        if (response.ok) {
          window.alert('Usuário criado com sucesso');
        }
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
      }
    }
  }
};
</script>

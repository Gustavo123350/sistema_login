<template>
  <div>
    <h2 class="titulo2">Gerenciar Usuários</h2>

    <!-- Botão para carregar todos os usuários -->
    <button @click="fetchUsers">Obter Todos os Usuários</button>

    <!-- Tabela de usuários -->
    <table v-if="users.length > 0">
      <thead>
        <tr class="tabel">
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="UI">{{ user.id }}</td>
          <td class="UN">{{ user.name }}</td>
          <td class="UE">{{ user.email }}</td>
          <td>
            <button class="De" @click="fetchUserById(user.id)">Detalhes:<i class="bi bi-person-fill-exclamation"></i></button>
            <button class="Atu" @click="updateUser(user.id)">Atualizar:<i class="bi bi-person-fill-add"></i></button>
            <button class="Deta" @click="deleteUser(user.id)">Deletar<i class="bi bi-person-fill-x"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Detalhes do usuário selecionado -->
    <div v-if="selectedUser">
      <h3 class="DU" >Detalhes do Usuário:</h3>
      <p class="DI"  >ID: {{ selectedUser.id }}</p>
      <p class="NM"  >Nome: {{ selectedUser.name }}</p>
      <p class="EML" >Email: {{ selectedUser.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    async fetchUserById(userId) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        const data = await response.json();
        this.selectedUser = data;
      } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
      }
    },
    async updateUser(userId) {
      // Lógica para atualizar usuário
      // Implemente uma funcionalidade similar à criação do usuário usando o método PUT ou PATCH
    },
    async deleteUser(userId) {
      try {
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'DELETE'
        });
        // Atualizar a lista de usuários após a exclusão
        this.fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    },
    async fetchAuthenticatedUserDetails() {
      try {
        const token = localStorage.getItem('token'); // Supondo que o token está armazenado no localStorage
        const response = await fetch('http://localhost:3001/userDetails', {
          headers: {
            Authorization: token
          }
        });
        const data = await response.json();
        console.log('Detalhes do usuário autenticado:', data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do usuário autenticado:', error);
      }
    }
  }
};
</script>

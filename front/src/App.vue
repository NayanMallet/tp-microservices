<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Item {
  id: number;
  name: string;
}

const users = ref<User[]>([]);
const items = ref<Item[]>([]);
const userName = ref('');
const userEmail = ref('');
const itemName = ref('');

async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users');
  users.value = await res.json();
}

async function fetchItems() {
  const res = await fetch('http://localhost:3000/api/items');
  items.value = await res.json();
}

async function createUser() {
  await fetch('http://localhost:3002/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: userName.value, email: userEmail.value }),
  });
  fetchUsers();
  userName.value = '';
  userEmail.value = '';
}

async function createItem() {
  await fetch('http://localhost:3003/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: itemName.value }),
  });
  fetchItems();
  itemName.value = '';
}

onMounted(() => {
  fetchUsers();
  fetchItems();
});
</script>

<template>
  <div>
    <section>
      <h2>Users</h2>
      <form @submit.prevent="createUser">
        <input v-model="userName" placeholder="Name" required />
        <input v-model="userEmail" type="email" placeholder="Email" required />
        <button type="submit">Add User</button>
      </form>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.id }}: {{ user.name }} ({{ user.email }})
        </li>
      </ul>
    </section>
    <section>
      <h2>Items</h2>
      <form @submit.prevent="createItem">
        <input v-model="itemName" placeholder="Item Name" required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.id }}: {{ item.name }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
section {
  margin-bottom: 2rem;
}
</style>

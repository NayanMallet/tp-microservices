async function fetchUsers() {
  const res = await fetch('http://localhost:3000/api/users');
  const users = await res.json();
  const ul = document.getElementById('users');
  ul.innerHTML = '';
  users.forEach((u) => {
    const li = document.createElement('li');
    li.textContent = `${u.id}: ${u.name} (${u.email})`;
    ul.appendChild(li);
  });
}

async function fetchItems() {
  const res = await fetch('http://localhost:3000/api/items');
  const items = await res.json();
  const ul = document.getElementById('items');
  ul.innerHTML = '';
  items.forEach((u) => {
    const li = document.createElement('li');
    li.textContent = `${u.id}: ${u.name}`;
    ul.appendChild(li);
  });
}

document.getElementById('userForm').onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  await fetch('http://localhost:3002/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });
  fetchUsers();
};

document.getElementById('itemsForm').onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('item_name').value;
  await fetch('http://localhost:3003/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  fetchItems();
};

fetchUsers();
fetchItems();

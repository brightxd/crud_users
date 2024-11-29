const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Adiciona um novo usuário
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    });

    if (response.ok) {
        loadUsers();
        userForm.reset();
    }
});

// Carrega todos os usuários
async function loadUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    userList.innerHTML = users.map(user => `
        <li>
            ${user.username} (${user.email})
            <button onclick="deleteUser(${user.id})">Deletar</button>
        </li>
    `).join('');
}

// Deleta um usuário
async function deleteUser(id) {
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (response.ok) {
        loadUsers();
    }
}

// Inicializa a lista de usuários
loadUsers();

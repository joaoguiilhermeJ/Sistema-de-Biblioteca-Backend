const API_URL = 'http://localhost:3000';


const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mensagemDiv = document.getElementById('mensagem');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        
        if (tabName === 'clientes') {
            carregarClientes();
        } else if (tabName === 'livros') {
            carregarLivros();
        } else if (tabName === 'emprestimos') {
            carregarEmprestimos();
        }
    });
});


function exibirMensagem(texto, tipo = 'sucesso') {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `mensagem ${tipo}`;
    setTimeout(() => {
        mensagemDiv.textContent = '';
        mensagemDiv.className = 'mensagem';
    }, 4000);
}


document.getElementById('formCliente').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cliente = {
        nomeUsers: document.getElementById('clienteNome').value,
        cpf: document.getElementById('clienteEmail').value
    };
    
    try {
        const response = await fetch(`${API_URL}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Cliente cadastrado com sucesso!');
            document.getElementById('formCliente').reset();
            carregarClientes();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao cadastrar cliente'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
});

async function carregarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        const clientes = await response.json();
        
        const lista = document.getElementById('clientesList');
        
        if (clientes.length === 0) {
            lista.innerHTML = '<div class="lista-vazia">Nenhum cliente cadastrado</div>';
            return;
        }
        
        lista.innerHTML = clientes.map(cliente => `
            <div class="item">
                <div class="item-info">
                    <p><strong>ID:</strong> ${cliente.idusers}</p>
                    <p><strong>Nome:</strong> ${cliente.nomeusers}</p>
                    <p><strong>CPF:</strong> ${cliente.cpf}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-delete" onclick="deletarCliente(${cliente.idusers})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar clientes:', erro);
    }
}

async function deletarCliente(id) {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return;
    
    try {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Cliente deletado com sucesso!');
            carregarClientes();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao deletar cliente'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
}

// =============== LIVROS ===============
document.getElementById('formLivro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const livro = {
        titulo: document.getElementById('livroTitulo').value,
        autor: document.getElementById('livroAutor').value,
        quantidade: parseInt(document.getElementById('livroQuantidade').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/livros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Livro cadastrado com sucesso!');
            document.getElementById('formLivro').reset();
            carregarLivros();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao cadastrar livro'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
});

async function carregarLivros() {
    try {
        const response = await fetch(`${API_URL}/livros`);
        const livros = await response.json();
        
        const lista = document.getElementById('livrosList');
        
        if (livros.length === 0) {
            lista.innerHTML = '<div class="lista-vazia">Nenhum livro cadastrado</div>';
            return;
        }
        
        lista.innerHTML = livros.map(livro => `
            <div class="item">
                <div class="item-info">
                    <p><strong>ID:</strong> ${livro.idbook}</p>
                    <p><strong>Título:</strong> ${livro.titulo}</p>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Quantidade:</strong> ${livro.quantidade}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-action" onclick="adicionarQuantidade(${livro.idbook})">+ Qtd</button>
                    <button class="btn-delete" onclick="deletarLivro(${livro.idbook})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
    }
}

async function deletarLivro(id) {
    if (!confirm('Tem certeza que deseja deletar este livro?')) return;
    
    try {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Livro deletado com sucesso!');
            carregarLivros();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao deletar livro'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
}

async function adicionarQuantidade(id) {
    const quantidade = prompt('Quantas unidades deseja adicionar?');
    if (quantidade === null) return;
    
    try {
        const response = await fetch(`${API_URL}/livros/${id}/quantidade`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: parseInt(quantidade) })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Quantidade atualizada com sucesso!');
            carregarLivros();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao atualizar quantidade'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
}

// =============== EMPRÉSTIMOS ===============
document.getElementById('formEmprestimo').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emprestimo = {
        idUser: parseInt(document.getElementById('emprestimoClienteId').value),
        idBook: parseInt(document.getElementById('emprestimoLivroId').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emprestimo)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Empréstimo registrado com sucesso!');
            document.getElementById('formEmprestimo').reset();
            carregarEmprestimos();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao registrar empréstimo'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
});

document.getElementById('formDevolucao').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const devolucao = {
        idUser: parseInt(document.getElementById('devolucaoClienteId').value),
        idBook: parseInt(document.getElementById('devolucaoLivroId').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/emprestimos/devolucao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(devolucao)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            exibirMensagem('Devolução registrada com sucesso!');
            document.getElementById('formDevolucao').reset();
            carregarEmprestimos();
        } else {
            exibirMensagem(`Erro: ${data.erro || 'Erro ao registrar devolução'}`, 'erro');
        }
    } catch (erro) {
        exibirMensagem(`Erro na conexão: ${erro.message}`, 'erro');
    }
});

async function carregarEmprestimos() {
    try {
        const response = await fetch(`${API_URL}/emprestimos/abertos`);
        const emprestimos = await response.json();
        
        const lista = document.getElementById('emprestimosList');
        
        if (!emprestimos || emprestimos.length === 0) {
            lista.innerHTML = '<div class="lista-vazia">Nenhum empréstimo aberto</div>';
            return;
        }
        
        lista.innerHTML = emprestimos.map(emp => `
            <div class="item">
                <div class="item-info">
                    <p><strong>Cliente:</strong> ${emp.nomeusers}</p>
                    <p><strong>Livro:</strong> ${emp.titulo}</p>
                    <p><strong>Data de Empréstimo:</strong> ${new Date(emp.dataemprestimo).toLocaleDateString('pt-BR')}</p>
                    <p><strong>Dias em Mão:</strong> ${emp.diasemmao}</p>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar empréstimos:', erro);
    }
}

// Carregar clientes na inicialização
window.addEventListener('load', () => {
    carregarClientes();
});

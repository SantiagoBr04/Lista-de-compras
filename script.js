const input = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const itemList = document.getElementById('item-list');

let items = JSON.parse(localStorage.getItem('itensLista')) || [];

function salvarItens() {
  localStorage.setItem('itensLista', JSON.stringify(items));
}

function renderizarLista() {
  itemList.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.concluido) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = item.nome;

    const botoes = document.createElement('div');
    botoes.classList.add('actions');

    const btnToggle = document.createElement('button');
    btnToggle.innerHTML = '<i class="fas fa-check-circle"></i>';
    btnToggle.title = item.concluido ? 'Desconcluir' : 'Concluir';
    btnToggle.addEventListener('click', () => {
      items[index].concluido = !items[index].concluido;
      salvarItens();
      renderizarLista();
    });

    const btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = '<i class="fas fa-trash"></i>';
    btnExcluir.title = 'Excluir';
    btnExcluir.addEventListener('click', () => {
      items.splice(index, 1);
      salvarItens();
      renderizarLista();
    });

    botoes.appendChild(btnToggle);
    botoes.appendChild(btnExcluir);
    li.appendChild(span);
    li.appendChild(botoes);
    itemList.appendChild(li);
  });

  // Botão de apagar tudo
  if (items.length > 0) {
    const liLimpar = document.createElement('li');
    liLimpar.style.justifyContent = 'center';

    const btnLimpar = document.createElement('button');
    btnLimpar.innerHTML = '<i class="fas fa-trash-alt"></i> Apagar tudo';
    btnLimpar.className = 'clear-btn';
    btnLimpar.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja apagar toda a lista?')) {
        items = [];
        salvarItens();
        renderizarLista();
      }
    });

    liLimpar.appendChild(btnLimpar);
    itemList.appendChild(liLimpar);
  }
}

addBtn.addEventListener('click', () => {
  const texto = input.value.trim();
  if (texto) {
    items.push({ nome: texto, concluido: false });
    salvarItens();
    renderizarLista();
    input.value = '';
    input.focus();
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

renderizarLista();

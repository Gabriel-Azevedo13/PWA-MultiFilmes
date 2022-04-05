let conteudo = [];

onload = () => {
  const t = JSON.parse(localStorage.getItem('conteudo'));
  
  if (t) conteudo = t;
  exibirFilmes();
  document.querySelector('#inputNovoFilme').oninput = monitoraCampoAdic;
  document.querySelector('#inputNovoFilme2').oninput = monitoraCampoAdic;
  document.querySelector('#inputNovoFilme3').oninput = monitoraCampoAdic;

  document.querySelector('#inputAlteraFilme').oninput = monitoraCampoAlt;

  document.querySelector('#inputNovoFilme3').onkeypress = (enter) => {
    if (enter.key == 'Enter') adicionaTarefa();
  };
  document.querySelector('#inputAlteraFilme3').onkeypress = (enter) => {
    if (enter.key == 'Enter') alteraTarefa();
  };

  document.querySelector('#btnAdic').onclick = () => {
    document.querySelector('#btnInc').disabled = true;
    ativa('tela2');
    document.querySelector('#inputNovoFilme').focus();
    document.querySelector('#inputNovoFilme2').focus();
    document.querySelector('#inputNovoFilme3').focus();
  };

  document.querySelector('#btnCanc1').onclick = () => {
    document.querySelector('#inputNovoFilme').value = '';
    document.querySelector('#inputNovoFilme2').value = '';
    document.querySelector('#inputNovoFilme3').value = '';
    ativa('tela1');
  };

  document.querySelector('#btnCanc2').onclick = () => {
    let campo = document.querySelector('#inputAlteraFilme');
    campo.value = '';
    campo.removeAttribute('data-id');
    ativa('tela1');
  };

  document.querySelector('#btnInc').onclick = () => {
    adicionaTarefa();
  };

  document.querySelector('#btnAlt').onclick = () => {
    alteraTarefa();
  };

  document.querySelector('#btnDel').onclick = () => {
    apagaTarefa();
  };
};

const exibirFilmes = () => {
  const listaDeFilmes = document.querySelector('#listaDeFilmes');
  listaDeFilmes.innerHTML = '';
  conteudo.forEach((t) => {
    let elemTarefa = document.createElement('li');
    elemTarefa.innerHTML = t.titulo;
    elemTarefa.setAttribute('data-id', t.id);

    elemTarefa.onclick = () => {
      let campo = document.querySelector('#inputAlteraFilme');
      ativa('tela3');
      
      campo.value = t.titulo;
      campo.setAttribute('data-id', t.id);
      campo.focus();

      let campo2 = document.querySelector('#inputAlteraFilme2');
      campo2.value = t.genero;
      campo2.setAttribute('data-id', t.id);
   
      let campo3 = document.querySelector('#inputAlteraFilme3');
      campo3.value = t.duracao;
      campo3.setAttribute('data-id', t.id);
    };
    listaDeFilmes.appendChild(elemTarefa);
  });
  document.querySelector('#estado').innerText = conteudo.length;
  if (conteudo.length > 0) {
    listaDeFilmes.classList.remove('hidden');
    document.querySelector('#blank').classList.add('hidden');
  } else {
    listaDeFilmes.classList.add('hidden');
    document.querySelector('#blank').classList.remove('hidden');
  }
};

const ativa = (comp) => {
  let listaDeTelas = document.querySelectorAll('body > .component');
  listaDeTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector('#' + comp).classList.remove('hidden');
};

const adicionaTarefa = () => {
  let campo = document.querySelector('#inputNovoFilme');
  let campo2 = document.querySelector('#inputNovoFilme2');
  let campo3 = document.querySelector('#inputNovoFilme3');

  if (campo != '') {
    conteudo.push({
      id: Math.random().toString().replace('0.', ''),
      titulo: campo.value,
      genero: campo2.value,
      duracao: campo3.value,
    });

    campo.value = '';
    campo2.value = '';
    campo3.value = '';
    ativa('tela1');
    salvarFilmes();
    exibirFilmes();
  }
};

const monitoraCampoAdic = (e) => {
  let botao = document.querySelector('#btnInc');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const alteraTarefa = () => {
  let campo = document.querySelector('#inputAlteraFilme');
  let campo2 = document.querySelector('#inputAlteraFilme2');
  let campo3 = document.querySelector('#inputAlteraFilme3');
  
  let idTarefa = campo.getAttribute('data-id');
  

  let i = conteudo.findIndex((t) => t.id == idTarefa);
  conteudo[i].titulo = campo.value;
  conteudo[i].genero = campo2.value;
  conteudo[i].duracao = campo3.value;
  
  campo.value = '';
  campo2.value = '';
  campo3.value = '';

  campo.removeAttribute('data-id');
  
  ativa('tela1');
  salvarFilmes();
  exibirFilmes();
};

const apagaTarefa = () => {
  let campo = document.querySelector('#inputAlteraFilme');
  let campo2 = document.querySelector('#inputAlteraFilme2');
  let campo3 = document.querySelector('#inputAlteraFilme3');

  let idTarefa = campo.getAttribute('data-id');

  conteudo = conteudo.filter((t) => t.id != idTarefa);
  campo.value = '';
  campo2.value = '';
  campo3.value = '';

  campo.removeAttribute('data-id');

  ativa('tela1');
  salvarFilmes();
  exibirFilmes();
};

const monitoraCampoAlt = (e) => {
  let botao = document.querySelector('#btnAlt');
  if (e.target.value.length > 0) botao.disabled = false;
  else botao.disabled = true;
};

const salvarFilmes = () => {
  localStorage.setItem('conteudo', JSON.stringify(conteudo));
};

navigator.serviceWorker.register("./filmes-sw.js");
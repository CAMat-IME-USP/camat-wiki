/**
 * CAMat-Wiki!
 * Centro Acadêmico da Matemática, Estatística e Computação da Universidade de São Paulo
 * https://camat.ime.usp.br/
 * 
 * Este é o javascript do modo noturno do site. Para armazenar a informação de modo (claro ou
 * escuro) é utilizado o localStorage, e para aplicar o modo de fato são utilizadas funções
 * que vão recursivamente aplicando as classes.
 * 
 * Há dois tipos de modo noturno: um escuro (#212121) e um mais escuro (#111). Essa diferenciação 
 * é feita em uma lista.
 */

// modo armazenado no localStorage. Utilizado na navegacao pelo site
let modoSessao = localStorage.getItem('modo');

// verifica se ja esta definido, e, se nao, define
let variavel_modo = modoSessao ? parseInt(modoSessao) : 0; 

// captura todos os botoes de modo escuro e de modo claro
let botoesNoturno = [...document.querySelectorAll(".modo-escuro")]
let botoesClaro = [...document.querySelectorAll(".modo-claro")]

// adiciona todos os elementos que devem receber o modo noturno
let elementosNoturno = [document.body];
[...document.body.children].map(el => {
    elementosNoturno.push(el);
    [...el.children].map(el2 => elementosNoturno.push(el2));
})

// estes sao as excecoes, que recebem um modo noturno mais escuro
let elementosNoturnoExcecoes = [
  document.querySelector('.l-nav'),
  document.querySelector('.menu-header'),
]
// se tiver algum modal, adiciona na lista
document.querySelector('.modal-content') ? elementosNoturnoExcecoes.push(document.querySelector('.modal-content')) : ''

// salva os elementos
Array.prototype.slice.call(document.querySelectorAll('.repasse')).map(el => elementosNoturnoExcecoes.push(el))
Array.prototype.slice.call(document.querySelectorAll('.arquivo-secao')).map(el => elementosNoturnoExcecoes.push(el))

Array.prototype.slice.call(document.querySelectorAll('.boletime-post-recomendacao')).map(el => elementosNoturnoExcecoes.push(el))

elementosNoturnoExcecoes.map(el => {
  [...el.children].map(el2 => {
      elementosNoturnoExcecoes.push(el2);
      [...el2.children].map(el3 => elementosNoturnoExcecoes.push(el3))
  })
})
elementosNoturnoExcecoes.push(document.querySelector('.menu'))

// listagem de todos os elementos
let elementos = [elementosNoturno, elementosNoturnoExcecoes]

// inicia o modo para caso ja haja alguma definicao
iniciarModo(elementos);

// para fazer os botoes de alternancia de modo funcionarem
[...document.querySelectorAll('.botao_alternar_modo_visao')].map(botao => botao.onclick = () => atualizarModo(elementos))

/* FUNCOES */
// funcao para iniciar determinado modo
function iniciarModo (elementos) {
  if (variavel_modo == 1) { // ativar modo noturno
      botoesNoturno.map(botao => botao.style.display = "none")
      botoesClaro.map(botao => botao.style.display = "unset")
      ativarNoturno(elementos)
  }
  else {
      botoesNoturno.map(botao => botao.style.display = "unset")
      botoesClaro.map(botao => botao.style.display = "none")
      // document.body.classList.remove('modo-noturno');
      desativarNoturno(elementos)
  }
}

// para alterar o modo
function atualizarModo (elementos) {
  if (variavel_modo == 0) { // ativar modo noturno
      botoesNoturno.map(botao => botao.style.display = "none")
      botoesClaro.map(botao => botao.style.display = "unset")
      ativarNoturno(elementos)
  }
  else {
      botoesNoturno.map(botao => botao.style.display = "unset")
      botoesClaro.map(botao => botao.style.display = "none")
      // document.body.classList.remove('modo-noturno');
      desativarNoturno(elementos)
  }
  variavel_modo = variavel_modo == 0 ? 1 : 0
  localStorage.setItem('modo', variavel_modo)
}

// auto-explicativo
function ativarNoturno (elementos) {
  noturnoBoletime(true)
  elementos[0].map(el => el.classList.add('modo-noturno'))
  elementos[1].map(el => el.classList.add('modo-noturno-excecao'))
}
// auto-explicativo
function desativarNoturno (elementos) {
  noturnoBoletime(false)
  elementos[0].map(el => el.classList.remove('modo-noturno'))
  elementos[1].map(el => el.classList.remove('modo-noturno-excecao'))
}

// modo noturno na pagina do BoletIME
function noturnoBoletime (ativado) {
  try {
      let imgClaro = document.getElementById("capa_claro_boletime")
      let imgNoturno = document.getElementById("capa_noturno_boletime")
      
      if (ativado) {
          imgNoturno.style.display = "unset";
          imgClaro.style.display = "none";
      }
      else {
          imgClaro.style.display = "unset";
          imgNoturno.style.display = "none";
      }
  }
  catch {}
}
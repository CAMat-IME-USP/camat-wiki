/**
 * CAMat-Wiki!
 * Centro Acadêmico da Matemática, Estatística e Computação da Universidade de São Paulo
 * https://camat.ime.usp.br/
 * 
 * Este é o javascript da página de RDs atuais do site. Para armazenar a informação dos RDs
 * é utilizado um JSON que está no diretório "/_data".
 * 
 * Há dois tipos de modo noturno: um escuro (#212121) e um mais escuro (#111). Essa diferenciação 
 * é feita em uma lista.
 */

const ANO = 2024

// diretório dos contatos
const DIR_CONTATOS = `/boletime_rds/rds/${ANO}/contatos.json`

// Captura o Modal
var modal = document.getElementById("modal_infoRD")

// Captura as informações do JSON usando uma Promise
function capturarInfos () {
  return new Promise(resolve => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
        resolve(this.responseText)
    }
    xhttp.open("GET", DIR_CONTATOS, true)
    xhttp.send()
  })
}

// formatação do número de contato
function formatarTelefone (numero) {
  let ddd = numero.slice(0,2)
  let primeiraParte = numero.slice(2,7)
  let segundaParte = numero.slice(7,11)

  return `(${ddd}) ${primeiraParte}-${segundaParte}`
}

function abrirModal () { modal.style.display = "flex" }

// substituindo as informações no modal
function atualizarModal (nome) {
  // foto
  let foto_rd = document.getElementById("foto_rd")
  foto_rd.src = `/images/rds/carometro/${ANO}/` + infos[nome]["foto"]

  // nome
  let nome_rd = document.getElementById("nome_rd")
  nome_rd.textContent = nome

  // curso
  let curso_rd = document.getElementById("curso_rd")
  curso_rd.textContent = infos[nome]["curso"]

  // cargos
  let cargos_rd = document.getElementById("cargos_rd")
  cargos_rd.innerHTML = ""
  infos[nome]["cargos"].map(cargo => {
      let li = document.createElement("li")
      li.textContent = cargo
      cargos_rd.appendChild(li)
  })

  // contato
  let celular_rd = document.getElementById("celular_rd")
  celular_rd.innerHTML = ""
  if (infos[nome]["celular"] != "") {
    celular_rd.href = "tel:" + infos[nome]["celular"]
    celular_rd.textContent = "☎️ " + formatarTelefone(infos[nome]["celular"])
  }

  let email_rd = document.getElementById("email_rd")
  email_rd.innerHTML = ""
  if (infos[nome]["email"] != "") {
    email_rd.href = "mailto:" + infos[nome]["email"]
    email_rd.textContent = "✉️" + infos[nome]["email"]
  }


  // abre o modal            
  abrirModal()
}

/* EXECUTANDO */

// onde são armazenadas as informações
var infos = {}
capturarInfos().then(res => {
  infos = JSON.parse(res)
})

// capturar as âncoras
var tds = document.getElementsByTagName('td')
var ancoras = []
for (let td of tds) {
  // se só tiver 1, provavelmente é esse que se busca
  if (td.children.length != 1) continue

  let p = td.children[0]
  let a = p.children[0]
  
  a.onclick = function() { atualizarModal(this.textContent) }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = () => modal.style.display = "none";

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    let foto_rd = document.getElementById("foto_rd")
    foto_rd.src = ""
  }
}

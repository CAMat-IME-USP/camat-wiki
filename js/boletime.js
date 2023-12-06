/**
 * CAMat-Wiki!
 * Centro Acadêmico da Matemática, Estatística e Computação da Universidade de São Paulo
 * https://camat.ime.usp.br/
 * 
 * Este é o javascript da página do BoletIME.
 */

// lista de edições
let divs_edicoes = document.querySelectorAll(".edicao_boletime")
let lista_edicoes = [...divs_edicoes]

// captura os ids das edições
let ids_edicoes = lista_edicoes.map(edicao => edicao.id)

lista_edicoes.map(div_edicao => {
    div_edicao.onclick = function() {
        document.getElementById(this.id + "_a").click()
    }
})
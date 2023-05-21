let foto_grande = document.querySelector(".foto_grande")
window.addEventListener('click', function(e) {
  if (foto_grande.contains(e.target) && !document.getElementById('foto_grande_img').contains(e.target)){
    foto_grande.style.display = "none";
    document.getElementById("foto_grande_img").src = ""
  }
})


const diretorio = dir + '/images/eventos/animeime_2023/';
const lista_todas_fotos = [
  "DSC00870","DSC00891","DSC00947","DSC00915","DSC00867","DSC00899","DSC00927","DSC00952","DSC00852","DSC01001","DSC00937","DSC00959","DSC00880","DSC00853","DSC00985","DSC00851","DSC00866","DSC00940","DSC00895","DSC00885","DSC00957","DSC00868","DSC00898","DSC01002","DSC00886","DSC00900","DSC00983","DSC00840","DSC00842","DSC00917","DSC00890","DSC00849","DSC00990","DSC00876","DSC00944","DSC00846","DSC00843","DSC00892","DSC00919","DSC00992","DSC00854","DSC00913","DSC00996","DSC00954","DSC00989","DSC00845","DSC00896","DSC00861","DSC00860","DSC00982","DSC00874","DSC00894","DSC00995","DSC00994","DSC00922","DSC00988","DSC00953","DSC00918","DSC00923","DSC00962","DSC00914","DSC00848","DSC00956","DSC00945","DSC00905","DSC00939","DSC00955","DSC00993","DSC00873","DSC00859","DSC00999","DSC00907","DSC00938","DSC00844","DSC00893","DSC00926","DSC00912","DSC00841","DSC00916","DSC00946","DSC00837","DSC00872","DSC00981","DSC01000","DSC00904","DSC00888","DSC00889","DSC00991","DSC00839","DSC00987","DSC00838","DSC00951","DSC00862","DSC00986","DSC00961","DSC00963","DSC00949","DSC00960","DSC00850","DSC00980","DSC00958","DSC00943","DSC00984","DSC00906","DSC00948","DSC00950","DSC00998", 'animeime2023_1', 'animeime2023_2', 'animeime2023_3', 'animeime2023_5', 'animeime2023_5', 'animeime2023_6'
];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var pagina = parseInt(urlParams.get('pag'))
if (isNaN(pagina)) pagina = 0;
else pagina = pagina - 1

var lista_fotos = []
let qntd = 12;
for (let i = 0; i < qntd; i++) {
  let foto = lista_todas_fotos[qntd*pagina + i]
  if (!foto) break
  lista_fotos.push(foto)
}

let qntdPaginas = Math.ceil(lista_todas_fotos.length / qntd)
for (let i = 0; i < qntdPaginas; i++) {
  let a = document.createElement("a")
  a.textContent = `${i+1}`
  a.href = `${dir}/eventos/animeime?pag=${i+1}`
  document.getElementById("paginas_baixo").appendChild(a)
}

const galeria = document.querySelector(".galeria");

lista_fotos.map(foto => {

  // div da foto
  let div = document.createElement("div")
  div.classList.add('foto')

  // imagem
  let image = document.createElement("img")
  image.src = diretorio + 'thumbnails/' + foto + '.jpg'

  div.appendChild(image)

  image.onclick = function(){
    document.getElementById("foto_grande_img").src = this.src.replace('thumbnails/', 'qualidade/').replace('.jpg', '.png')
    foto_grande.style.display = "flex"
  }

  galeria.appendChild(div)

})

document.querySelector(".botaoFechar").onclick = () => {
  foto_grande.style.display = 'none';
  document.getElementById("foto_grande_img").src = ""
}


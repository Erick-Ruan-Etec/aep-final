const $ = (id) => document.getElementById(id);

const voltar = $("back");
const image = $("img");
const link = $("link");
const proximo = $("next");
const counter = $("index");

let index = 1;

function renderImage() {
    counter.innerHTML = index;
    image.src = `images/grafico${index}.png`
    link.href = `images/grafico${index}.png`

    if (index == 1) {
        voltar.disabled = true;
        proximo.disabled = false;
    } else if (index == 5) {
        voltar.disabled = false;
        proximo.disabled = true;
    } else {
        voltar.disabled = false;
        proximo.disabled = false;
    }
}

voltar.addEventListener("click", () => {
    if (index > 0) {
        index--;
        renderImage();
    }
});

proximo.addEventListener("click", () => {
    if (index < 5) {
        index++;
        renderImage();
    }
});

renderImage();
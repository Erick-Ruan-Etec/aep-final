import { supabaseClient } from "../supabase.js";

const lista = document.getElementById("lista");
const nome = document.getElementById("nome");
const categs = document.querySelectorAll(".categorias input[type='radio']");

async function render() {
    const { data } = await supabaseClient
        .from("items")
        .select("*, categoria(nome)");

    const categoria = document.querySelector(".categorias input:checked")?.value;
    const busca = nome.value.toLowerCase().trim();

    const filtrados = data.filter(item =>
        (!categoria || categoria === "0" || item.categ == categoria) &&
        (!busca || item.name.toLowerCase().includes(busca))
    );

    lista.innerHTML = filtrados.map(item => `
        <div class="item">
            <div class="top">
                <img src="${item.image}" alt="${item.name}" loadinng="lazy">
            </div>

            <div class="bottom">
                <div class="left">
                    <p style="font-size: 15px; color: #00ffff">
                        ${item.categoria?.nome || ""}
                    </p>
                    <p style="font-size: 22px; font-weight: bold">
                        ${item.name}
                    </p>
                    <p style="font-size: 15px">
                        ${item.desc}
                    </p>
                </div>
            </div>
        </div>
    `).join("");
}

categs.forEach(radio => radio.addEventListener("change", render));
nome.addEventListener("input", render);

render();
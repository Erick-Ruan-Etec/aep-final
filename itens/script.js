import { supabaseClient } from "../supabase.js";

const lista = document.getElementById("lista");
const nome = document.getElementById("nome");
const categs = document.querySelectorAll(
    ".categorias input[type='radio']"
);

async function deleteItem(id) {
    const { data, error } = await supabaseClient
        .from("items")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Erro ao deletar:", error.message);
        return;
    }

    await render();
}

window.deleteItem = deleteItem;

async function render() {
    const { data, error } = await supabaseClient
        .from("items")
        .select("*, categoria(nome)");

    if (error) {
        console.error("Erro ao buscar itens:", error.message);
        return;
    }

    const categoria = document.querySelector(
        ".categorias input:checked"
    )?.value;

    const busca = nome.value.toLowerCase().trim();

    const filtrados = data.filter(item =>
        (!categoria || categoria === "0" || item.categ == categoria) &&
        (!busca || item.name.toLowerCase().includes(busca))
    );

    lista.innerHTML = filtrados.map(item => `
        <div class="item">
            <div class="top">
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >
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

                    <button
                        class="btn-deletar"
                        data-id="${item.id}"
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    const btnsDeletar = document.querySelectorAll(".btn-deletar");

    btnsDeletar.forEach(button => {
        button.addEventListener("click", () => {
            deleteItem(button.dataset.id);
        });
    });
}

categs.forEach(radio => {
    radio.addEventListener("change", render);
});

nome.addEventListener("input", render);

render();

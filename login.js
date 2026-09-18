import { supabaseClient } from "../supabase.js";

const btnLogin = document.getElementById("btnlogin");
const btnAdicionar = document.getElementById("btnAdicionar");
const modalItem = document.getElementById("modalItem");

if (btnLogin) {
    btnLogin.addEventListener("click", async () => {

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            console.log("Vixi:", error.message);
        } else {
            console.log("Usuario encontrado!");
            window.location.href = "itens.html";
        }
    });
}

async function isLogged() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (data.user) {
        return true;
    }

    return false;
}

window.isLogged = isLogged;

async function butao() {

    if (!btnAdicionar) return;

    const logado = await isLogged();

    if (logado) {
        btnAdicionar.style.display = "";
    } else {
        btnAdicionar.style.display = "none";
    }
}

butao();

if (btnAdicionar) {
    btnAdicionar.addEventListener("click", () => {
        modalItem.style.display = "flex";
    });
}

async function criarItem(name, desc, image, categ) {
    const { data, error } = await supabaseClient
        .from("items")
        .insert({
            name,
            desc,
            image,
            categ
        })
        .select();

    if (error) {
        console.log("Erro:", error.message);
        return false;
    }

    alert("Item criado!");

    return true;
}

if (modalItem) {
    modalItem.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("itemNome").value;
        const desc = document.getElementById("desc").value;
        const categ = document.getElementById("categ").value;
        const image = document.getElementById("imagem").value;

        try {
            const criado = await criarItem(
                name,
                desc,
                image,
                categ
            );

            if (!criado) return;

            modalItem.reset();
            modalItem.style.display = "none";

            if (typeof lista !== "undefined" && typeof render === "function") {
                lista.innerHTML = "";
                await render();
            }

        } catch (error) {
            console.log("Erro:", error.message);
            alert("Erro ao criar item!");
        }
    });
}


const fecharModal = document.getElementById("fecharModal");
function fechar() {
    modalItem.style.display = "none";
}

if (fecharModal) {
    fecharModal.addEventListener("click", fechar);
}

if (modalItem) {
    modalItem.addEventListener("click", (event) => {
        if (event.target === modalItem) {
            fechar();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fechar();
    }
});
"use strict";
var formPartida = document.getElementById("formPartida");
var tabelaPartida = document.getElementById("tbPartidas");
var selectCampeonato = document.getElementById("campeonato");
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");
function atualizarPartida() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p) => {
        const campeonato = campeonatos.find((c) => c.id === p.campeonatoId);
        tabelaPartida.innerHTML +=
            `
            <tr>
                <td>${p.timeCasa}</td>
                <td>${p.timeFora}</td>
                <td>${campeonato ? campeonato.nome : "N/A"}</td>
                <td>
                    <button onclick="editarPartida(${p.id})"> Editar </button>
                    <button onclick="removerPartida(${p.id})"> Excluir </button>
                </td>
            </tr>
        `;
    });
}
var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatosNoSelect() {
    const selectCampeonato = document.getElementById("campeonatoId");
    selectCampeonato.innerHTML = "<option value=''>Selecione</option>";
    campeonatos.forEach((c) => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.nome;
        selectCampeonato.appendChild(option);
    });
}
function salvarLocalStoragePartidas() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}
function editarPartida(id) {
    const partida = partidas.find((p) => p.id == id);
    if (!partida) {
        return;
    }
    else {
        document.getElementById("timeCasa").value = partida.timeCasa;
        document.getElementById("timeFora").value = partida.timeFora;
        document.getElementById("campeonatoId").value = partida.campeonatoId;
        //findIndex -> buscar o index do objeto
        const partIndex = partidas.findIndex((p) => p.id == id);
        //Validar se encontrou algum item
        if (partIndex !== -1) {
            //Remover da lista
            partidas.splice(partIndex, 1);
        }
        salvarLocalStoragePartidas();
        atualizarPartida();
    }
}
function removerPartida(id) {
    //findIndex -> buscar o index do objeto
    const partIndex = partidas.findIndex((p) => p.id == id);
    //Validar se encontrou algum item
    if (partIndex !== -1) {
        //Remover da lista
        partidas.splice(partIndex, 1);
        alert("Partida removida!");
    }
    salvarLocalStoragePartidas();
    atualizarPartida();
}
function salvarPartida(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novaPartida = {
        id: Date.now(),
        timeCasa: document.getElementById("timeCasa").value,
        timeFora: document.getElementById("timeFora").value,
        campeonatoId: parseInt(document.getElementById("campeonatoId").value)
    };
    partidas.push(novaPartida);
    atualizarPartida();
    salvarLocalStoragePartidas();
    formPartida.reset();
    alert('Cadastrado com sucesso!');
}
atualizarPartida();
carregarCampeonatosNoSelect();
formPartida.addEventListener("submit", salvarPartida);

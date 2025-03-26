"use strict";
//Variáveis globais
var formTimes = document.getElementById("formTime");
var tabelaTime = document.getElementById("tbTimes");
var times = JSON.parse(localStorage.getItem("times") || "[]");
function atualizarTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t) => {
        tabelaTime.innerHTML += `
      <tr>
           <td>${t.nome}</td>
           <td>${t.nomeCurto}</td>
           <td>
              <button onclick="editarTime(${t.id})"> Editar </button>
              <button onclick="removerTime(${t.id})"> Excluir </button>
           </td>
      </tr>
    `;
    });
}
function editarTime(id) {
    const time = times.find((t) => t.id == id);
    if (!time) {
        return;
    }
    else {
        document.getElementById("nome").value = time.nome;
        document.getElementById("nomeCurto").value = time.nomeCurto;
        //findIndex -> buscar o index do objeto
        const timeIndex = times.findIndex((t) => t.id == id);
        //Validar se encontrou algum item
        if (timeIndex !== -1) {
            //Remover da lista
            times.splice(timeIndex, 1);
        }
        salvarLocalTimes();
        atualizarTimes();
    }
}
function removerTime(id) {
    //findIndex -> buscar o index do objeto
    const timeIndex = times.findIndex((t) => t.id == id);
    //Validar se encontrou algum item
    if (timeIndex !== -1) {
        //Remover da lista
        times.splice(timeIndex, 1);
        alert("Time removido!");
    }
    salvarLocalTimes();
    atualizarTimes();
}
function salvarLocalTimes() {
    let timesSalvar = JSON.stringify(times);
    localStorage.setItem("times", timesSalvar);
}
function salvarTime(event) {
    event === null || event === void 0 ? void 0 : event.preventDefault(); //cancelar o disparo do evento
    const novoTime = {
        id: Date.now(),
        nome: document.getElementById("nome").value,
        nomeCurto: document.getElementById("nomeCurto").value
    };
    times.push(novoTime);
    atualizarTimes();
    salvarLocalTimes();
    formTimes.reset();
    alert('Cadastrado com sucesso!');
}
formTimes.addEventListener("submit", salvarTime);
atualizarTimes();

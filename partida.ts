var formPartida = document.getElementById(
    "formPartida"
) as HTMLFormElement;
var tabelaPartida = document.getElementById("tbPartidas") as HTMLElement;
var selectCampeonato = document.getElementById("campeonato") as HTMLSelectElement;
var partidas = JSON.parse(localStorage.getItem("partidas") || "[]");

interface Partida {
    id: number;
    timeCasa: string;
    timeFora: string;
    campeonatoId: number;
}

function atualizarPartida() {
    tabelaPartida.innerHTML = "";
    partidas.forEach((p: Partida) => {
        const campeonato = campeonatos.find((c: Campeonato) => c.id === p.campeonatoId)
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
    })
}


var campeonatos = JSON.parse(localStorage.getItem("campeonatos") || "[]");
function carregarCampeonatosNoSelect() {
    const selectCampeonato = document.getElementById("campeonatoId") as HTMLSelectElement;
    selectCampeonato.innerHTML = "<option value=''>Selecione</option>";
    campeonatos.forEach((c: Campeonato) => {
        const option = document.createElement("option");
        option.value = c.id.toString();
        option.text = c.nome;
        selectCampeonato.appendChild(option);
    })
}

function salvarLocalStoragePartidas() {
    localStorage.setItem("partidas", JSON.stringify(partidas));
}

function editarPartida(id: number) {
    const partida = partidas.find(
      (p: Partida) => p.id == id
    );
  
    if (!partida) {
      return;
    }
    else {
      (document.getElementById("timeCasa") as HTMLInputElement).value = partida.timeCasa;
      (document.getElementById("timeFora") as HTMLSelectElement).value = partida.timeFora;
      (document.getElementById("campeonatoId") as HTMLSelectElement).value = partida.campeonatoId;
  
  
      //findIndex -> buscar o index do objeto
      const partIndex = partidas.findIndex(
        (p: Partida) => p.id == id
      );
  
      //Validar se encontrou algum item
      if (partIndex !== -1) {
        //Remover da lista
        partidas.splice(partIndex, 1);
      }
  
      salvarLocalStoragePartidas();
      atualizarPartida();
    }
  }

  function removerPartida(id: number) {

    //findIndex -> buscar o index do objeto
    const partIndex = partidas.findIndex(
      (p: Partida) => p.id == id
    );
  
    //Validar se encontrou algum item
    if (partIndex !== -1) {
      //Remover da lista
      partidas.splice(partIndex, 1);
      alert("Partida removida!");
    }
  
    salvarLocalStoragePartidas();
    atualizarPartida();
  
  }

  function salvarPartida(event: Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novaPartida: Partida = {
      id: Date.now(),
      timeCasa: (document.getElementById("timeCasa") as HTMLInputElement).value,
      timeFora: (document.getElementById("timeFora") as HTMLInputElement).value,
      campeonatoId: parseInt((document.getElementById("campeonatoId") as HTMLSelectElement).value)
    };
    partidas.push(novaPartida)
    atualizarPartida()
    salvarLocalStoragePartidas()
    formPartida.reset()
    alert('Cadastrado com sucesso!')
  }

atualizarPartida();
carregarCampeonatosNoSelect();
formPartida.addEventListener("submit", salvarPartida)
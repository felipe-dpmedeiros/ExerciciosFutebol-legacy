//Variáveis globais
var formTimes = document.getElementById(
    "formTime"
  ) as HTMLFormElement;
var tabelaTime = document.getElementById("tbTimes") as HTMLElement;
var times = JSON.parse(localStorage.getItem("times") || "[]");

interface Time {
    id: number;
    nome: string;
    nomeCurto: string;
}

function atualizarTimes() {
    tabelaTime.innerHTML = "";
    times.forEach((t: Time) => {
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
    })
  }

  function editarTime(id: number) {
    const time = times.find(
      (t: Time) => t.id == id
    );
  
    if (!time) {
      return;
    }
    else {
      (document.getElementById("nome") as HTMLInputElement).value = time.nome;
      (document.getElementById("nomeCurto") as HTMLInputElement).value = time.nomeCurto;
  
  
      //findIndex -> buscar o index do objeto
      const timeIndex = times.findIndex(
        (t: Time) => t.id == id
      );
  
      //Validar se encontrou algum item
      if (timeIndex !== -1) {
        //Remover da lista
        times.splice(timeIndex, 1);
      }
  
      salvarLocalTimes();
      atualizarTimes();
    }
  }

  function removerTime(id: number) {

    //findIndex -> buscar o index do objeto
    const timeIndex = times.findIndex(
      (t: Time) => t.id == id
    );
  
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

  function salvarTime(event: Event) {
    event?.preventDefault(); //cancelar o disparo do evento
    const novoTime: Time = {
      id: Date.now(),
      nome: (document.getElementById("nome") as HTMLInputElement).value,
      nomeCurto: (document.getElementById("nomeCurto") as HTMLInputElement).value
    };
    times.push(novoTime)
    atualizarTimes()
    salvarLocalTimes()
    formTimes.reset()
    alert('Cadastrado com sucesso!')
  }
  
  formTimes.addEventListener("submit", salvarTime)
  atualizarTimes()
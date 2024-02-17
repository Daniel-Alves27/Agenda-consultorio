const btnPin = document.querySelector("#btn__pin");
const btnCamera = document.querySelector("#btn__camera");
const btnPlus = document.querySelector("#btn__plus");
const background = document.querySelector("#background");
const fecharForm = document.querySelector("#fechar");
const form = document.querySelector("#container__formulario");
let selecionarOpcao = document.querySelector("#select");

btnPlus.addEventListener("click", () => {
    if (btnPin.style.display === "none") {
        btnPin.style.display = "grid"
        background.style.background = "rgba(0, 0, 0, 0.500)"
        background.style.display = "block"
        
    } else {
        btnPin.style.display = "none"
        background.style.background = "none"
        background.style.display = "none"
    }

    if (btnCamera.style.display === "none") {
        btnCamera.style.display = "grid"
        btnCamera.style.transform = "none"
        background.style.background = "rgba(0, 0, 0, 0.500)"

    } else {
        btnCamera.style.display = "none"
        background.style.background = "none"
        background.style.display = "none"
    }
})

btnPin.addEventListener("click", () => {
    form.style.display = "block";
    selecionarOpcao.options[2].selected = true;
})

btnCamera.addEventListener("click", () => {
    form.style.display = "block";
    selecionarOpcao.options[1].selected = true;
})

fecharForm.addEventListener("click", () => {
    form.style.display = "none";
})

//_____________________________________________________________

const containerPacientes = document.querySelector("#container__pacientes");
const btnAgendar = document.querySelector("#btn__agendar");

let itens = JSON.parse(localStorage.getItem("agenda")) || [];
itens.forEach((elemento) => {
    novaConsultar(elemento)
});

function novaConsultar(dadosAgenda) {
    const pacienteItens = document.createElement("div");
    pacienteItens.classList.add("paciente__itens");

    const pacienteImg = document.createElement("img");
    pacienteImg.classList.add("paciente__img");
    pacienteImg.src = "/image/usuarioAvatar.png";

    const pacienteNome = document.createElement("h3");
    pacienteNome.classList.add("paciente__nome");
    pacienteNome.textContent = dadosAgenda.nome;


    const tipoConsulta = document.createElement("p");
    tipoConsulta.classList.add("tipo__consulta");
    tipoConsulta.innerHTML = `<img src="/image/icons/Camera.svg">${dadosAgenda.tipoConsulta}`

    const iconChat = document.createElement("img");
    iconChat.classList.add("icon__chat");
    iconChat.src = "/image/icons/Chatcirculo2.svg";


    pacienteItens.appendChild(pacienteImg);
    pacienteItens.appendChild(pacienteNome);
    pacienteItens.appendChild(tipoConsulta);
    pacienteItens.appendChild(iconChat);


    const containerContato = document.createElement("div");
    containerContato.classList.add("container__contato");

    const span = document.createElement("span");
    span.textContent = `${dadosAgenda.data} ás ${dadosAgenda.hora}`;

    const btnEndereco = document.createElement("button");
    const btnAudio = document.createElement("button");
    const btnVideo = document.createElement("button");

    switch (dadosAgenda.tipoConsulta) {
        case "presencial":
            btnEndereco.classList.add("btn__endereco");
            btnEndereco.textContent = "Ver endereço";
            break;

        case "remoto":
            btnVideo.classList.add("btn__chamada-video");
            btnVideo.textContent = "Ligar por vídeo";

            btnAudio.classList.add("btn__chamada-audio");
            btnAudio.textContent = "Ligar por áudio";
            break;
        default:
            //alert("Tipo de consulta inválido! Escolha outra opção.");
            break;
    }

    const containerObservacoes = document.createElement("div");
    containerObservacoes.classList.add("container__observacoes");
    const spanObservacao = document.createElement("span");
    spanObservacao.textContent = "observações:";
    const observacoesParagrafo = document.createElement("p");
    observacoesParagrafo.classList.add("observacoes__paragrafo");
    observacoesParagrafo.textContent = dadosAgenda.observacoes;

    const containerPacienteItens = document.createElement("div");
    containerPacienteItens.classList.add("container__pacientes--itens");

    containerContato.appendChild(span);
    containerObservacoes.appendChild(spanObservacao);
    containerObservacoes.appendChild(observacoesParagrafo);
    containerContato.appendChild(btnEndereco);
    containerContato.appendChild(btnVideo);
    containerContato.appendChild(btnAudio);
    pacienteItens.appendChild(containerContato);
    pacienteItens.appendChild(containerObservacoes);
    containerPacienteItens.appendChild(pacienteItens);
    containerPacientes.appendChild(containerPacienteItens);

    form.reset();
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nomeForm = document.querySelector("#nome").value;
    selecionarOpcao = document.querySelector("#select");
    selecionarOpcao.addEventListener("change", function () { })
    const dataConsulta = document.querySelector("#data").value;
    const dataFormatada = new Date(dataConsulta).toLocaleDateString("pt-BR")

    const horaConsulta = document.querySelector("#hora").value;
    const observacoesConsulta = document.querySelector("#observacao").value;


    const listaAgenda = {
        nome: nomeForm,
        tipoConsulta: selecionarOpcao.value,
        data: dataFormatada,
        hora: horaConsulta,
        observacoes: observacoesConsulta
    }

    itens.push(listaAgenda)
    localStorage.setItem("agenda", JSON.stringify(itens));
    novaConsultar(listaAgenda);
})
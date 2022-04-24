import store from "./store/configureStore.js";
import { completarAula, completarCurso, resetarCurso } from "./store/aulas.js";
import {
  incrementarTempo,
  reduzirTempo,
  modificarEmail,
} from "./store/aluno.js";

const render = () => {
  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const tempoRestante = document.querySelector("#tempoRestante");
  const aulasCompletas = document.querySelector("#aulasCompletas");

  nome.innerText = store.getState().aluno.nome;
  email.innerText = store.getState().aluno.email;
  tempoRestante.innerText = store.getState().aluno.diasRestantes + " dias";
  aulasCompletas.innerText = store
    .getState()
    .aulas.filter((aula) => aula.completa).length;
};
render();

store.subscribe(render);

const btnCompletarCurso = document.querySelector("#completarCurso");
const btnResetar = document.querySelector("#resetar");
const btnIncrementar = document.querySelector("#incrementar");
const btnReduzir = document.querySelector("#reduzir");
const formAula = document.querySelector("#formAula");
const formEmail = document.querySelector("#formEmail");

btnCompletarCurso.addEventListener("click", () =>
  store.dispatch(completarCurso())
);

btnResetar.addEventListener("click", () => store.dispatch(resetarCurso()));

btnIncrementar.addEventListener("click", () =>
  store.dispatch(incrementarTempo())
);

btnReduzir.addEventListener("click", () => store.dispatch(reduzirTempo()));

formAula.addEventListener("submit", (event) => {
  event.preventDefault();
  const aula = Number(event.target[0].value);
  store.dispatch(completarAula(aula));
});

formEmail.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  store.dispatch(modificarEmail(email));
  event.target.reset();
});

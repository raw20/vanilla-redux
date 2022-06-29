import { legacy_createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
let index = 0;

function addToDo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
function deleteToDo(id) {
  return {
    type: DELETE_TODO,
    id,
  };
}

function reducer(state = [], action) {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: index++ }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
}

function dispatchAddToDo(text) {
  store.dispatch(addToDo(text));
}
function disPatchDeleteToDo(e) {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}
function onSubmit(e) {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddToDo(todo);
}

function paintToDos() {
  const todos = store.getState();
  ul.innerHTML = "";

  todos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", disPatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.appendChild(li);
    li.appendChild(btn);
  });
}

const store = legacy_createStore(reducer);
store.subscribe(paintToDos);
form.addEventListener("submit", onSubmit);

import React, { useState, useEffect } from "react";

export default function App() {
  const [lista, agregar] = useState([]);

  function putApi() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(lista);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/jaqa",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function eliminar(index) {
    const nuevaLista = [...lista];
    nuevaLista.splice(index, 1);
    agregar(nuevaLista);
  }

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/jaqa")
      .then((respuesta) => respuesta.json())
      .then((data) => agregar(data));
  }, []);

  useEffect(()=>{
    putApi();
  }, [lista])

  return (
    <div className="App text-center">
      <h1>To Do List!</h1>
      <form
        onSubmit={(evento) => {
          evento.preventDefault()
          agregar([...lista, { label: evento.target[0].value, done: false }])
        }}
      >
        <input type="text" placeholder="Agregar Tarea" />
      </form>
      <ul>
        {lista.map((elm, index) => {
          return (
            <li key={index}>
              {elm.label}
              <button onClick={() => eliminar(index)}>X</button>
            </li>
          );
        })}
      </ul>
      <p className="my-5">Te faltan {lista.filter((item) => !item.done).length} tareas por terminar</p>
    </div>
  );
}



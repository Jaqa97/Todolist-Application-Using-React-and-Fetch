import React, {useState, useEffect} from "react";


export default function App() {

	const [lista, agregar] = useState([]);

	useEffect(()=>{
		fetch("http://assets.breatheco.de/apis/fake/todos/user/jaqa").then((respuesta) => respuesta.json()).then((data) => agregar(data));
		console.log(lista)
	}, []);
	return (
		<div className="App">
			<h1>To Do List!</h1>
			<form 
				onSubmit={(evento) => {
					alert(evento.target[0].value);
				}}
			>

				<input type="text" placeholder="Agregar Tarea"/>
			</form>
			{lista.map((elm, index)=>{
				return (<li>{elm.index}</li>);
			})}
			
		</div>
	);
};



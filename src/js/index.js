//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Home/>);

//pseudocodigo
//crear un componente de formulario
//por defecto tiene que de decir what needs to be done?
//crear un componente array
//hacer que las entradas del formulario se agreguen en el array y se vean como una lista
//hacer que se al pasarle el mouse por encima se visualice una x para eliminar el elemto de la lista
// crear un contador de los elementos de la lista creados
//darte estilo como el del ejemplo



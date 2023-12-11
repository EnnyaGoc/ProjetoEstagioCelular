import logo from './logo.svg';
import './App.css';
import { IoCloseOutline } from "react-icons/io5";
import { useState } from 'react';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/";


function App() {
  const [addSection, setAddSetion] = useState(false)
  const [formData, setFormData] = useState({
    marca : "",
    modelo : "",
    memoria : "",
    lancamento : ""
  })

  const handleOnChange = (e) => {
    const {value, name} = e.target
    setFormData((preve) => {
      return{
        ...preve,
        [name] : value
      }
    })
  }


  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    console.log('Código de sucesso atingido!');
    if(data.data.success){
      setAddSetion(false);
      alert(data.data.message);
    }
  }
  return (
    <>
    <div class="container">
      <button class="btn btn-add" onClick={() => setAddSetion(true)}>Add </button>

      {
        addSection &&(
          <div class="addContainer">
        
        <form onSubmit={handleSubmit}>
        <div class="close-btn" onClick={() => setAddSetion(false)}><IoCloseOutline /> </div>
          <label htmlFor="marca">Marca: </label>
          <input type="text" id="marca" name="marca" onChange={handleOnChange}/>

          <label htmlFor="modelo">Modelo: </label>
          <input type="text" id="modelo" name="modelo" onChange={handleOnChange}/>

          <label htmlFor="memoria">Memoria: </label>
          <input type="number" id="memoria" name="memoria" onChange={handleOnChange}/>

          <label htmlFor="lancamento">Lancamento: </label>
          <input type="text" id="lancamento" name="lancamento" onChange={handleOnChange}/>

          <button class="btn">Salvar</button>
        </form>
      </div>
        )
      }

     
       </div>
    </>
  );
}

export default App;

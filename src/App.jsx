import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [sex, setSex] = useState("");
  const [piece, setPiece] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState([]);
  const [season, setSeason] = useState("");
  const [color, setColor] = useState("");
  
  const submitForm = async () => {
    const requestedData = {
      prompt: `generate a realistic 3d model of a ${piece} with the predominant color ${color} destined to wear in the ${season} season for ${sex} with ${description} on it on a white 3d background`,
      n: 1,
      size: "1024x1024",
    };

    await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,

      },
      body:JSON.stringify(requestedData)
    }).then(async(res)=>{
      const data=await res.json();
      
      if (!res.ok) throw new Error("Eroare API");
     setResult(data.data)
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>
        <h1 id="text1">
          Preview your designs using AI. 
        </h1>
        </div>
       
        <div>
        <select
          name="sex"
          id="sex"
          onChange={(e) => {
            setSex(e.target.value);
          }}
        >
          <option value="select" id="selectSex">
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>

        <select
          name="season"
          id="season"
          onChange={(e) => {
            setSeason(e.target.value);
          }}
        >
          <option value="select" id="selectSeason">
            Select a season
          </option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
          <option value="winter">Winter</option>
        </select>

        <select
          name="piece"
          id="piece"
          onChange={(e) => {
            setPiece(e.target.value);
          }}
        >
          <option value="select" id="selectPiece">
            Select article of clothing
          </option>
          <option value="tshirt">T-shirt</option>
          <option value="blouse">Blouse</option>
          <option value="skirt">Skirt</option>
          <option value="hat">Hat</option>
          <option value="leggings">Leggings</option>
          <option value="jacket">Jacket</option>
          <option value="dress">Dress</option>
        </select>
        <input
          type="text"
          id="designinput"
          name="designinput"
          placeholder="Describe your desired design"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

          <input
          type="text"
          id="colorinput"
          name="colorinput"
          placeholder="Choose a predominant color"
          onChage={(e) =>{
            setColor(e.target.value);
          }}
          />

        <button id="submit" onClick={submitForm}>GENERATE</button>
        {result.map((img,idx)=>
           <img key={idx} src={img.url} id="imageOutput" />
        )}</div>
      </div>
      <div>
        <img src="public/images/placeholder.png" alt="Placeholder" id="placeholder"></img>
      </div>
    </div>
  );
}

export default App;
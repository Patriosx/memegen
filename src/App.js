import { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";

function App() {
  const imgMemes = [
    "aliens",
    "bikefall",
    "fire",
    "fry",
    "laughingleo",
    "matrix",
    "skepticalkid",
    "thinkaboutit",
    "unsettledtom",
  ];
  const [text, setText] = useState({ text1: "", text2: "" });
  const [selectedMeme, setSelectedMeme] = useState("");

  const onChangeImg = (e) => {
    console.log(e.target.value);
    setSelectedMeme(e.target.value);
    setText({ text1: "", text2: "" });
  };

  const textChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };
  const exportImg = (e) => {
    //uso de libreria html2canvas que hace un screenshot
    html2canvas(document.querySelector("#canva-meme")).then((canvas) => {
      //The HTMLCanvasElement.toDataURL() method returns a data URI containing a representation of the image in the format specified by the type parameter.
      let img = canvas.toDataURL("image/png");

      let link = document.createElement("a");
      link.download = `${selectedMeme}.png`;
      link.href = img;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  return (
    <div className="App">
      <h1>MEME Generator</h1>
      <div className="memes">
        <select name="" id="" onChange={onChangeImg}>
          <option value="">Memes</option>;
          {imgMemes.map((meme, i) => {
            return (
              <option key={i} value={meme}>
                {meme}
              </option>
            );
          })}
        </select>
        <br />
        <input
          name="text1"
          type="text"
          placeholder="line 1"
          value={text.text1}
          onChange={textChange}
        />
        <br />
        <input
          name="text2"
          type="text"
          value={text.text2}
          placeholder="line 2"
          onChange={textChange}
        />
        <br />
        <button onClick={exportImg}>Exportar</button>
      </div>
      <div className="show-memes" id="canva-meme">
        <p>{text.text1}</p>
        <p>{text.text2}</p>
        <img src={`./img/${selectedMeme}.png`} alt="" />
        {/* <img src={"./img/" + selectedMeme + ".png"} alt="foto" /> */}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./styles.css";
import he from "he";

export default function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#FAEBD7"
      }}
    >
      <br />
      <h2 style={{fontSize: 40}}>Animals Quiz</h2>
      <h4>By Alexander Stiles </h4>
      <Questions />
    </div>
  );
}

function Questions() {
  const [data, setData] = useState(null);
  const divStyle = {
    backgroundColor: "#FFE4B5",
    margin: "40px",
    border: "3px solid black",
    padding: 25,
    fontSize: 25
  };
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=15&category=27&type=multiple"
    )
      .then(res => res.json())
      .then(res => {
        const all = res.results;
        console.log(all);
        setData(all);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  if (!data) return <p>Loading data...</p>;
  return (
    <div>
      {data.map(ques => (
        <div style={divStyle}>
          <p1>{he.decode(ques.question)}</p1>
          <br />
          <br />
          <div style={{ display: "center" }}>
            <Button text={he.decode(ques.correct_answer)} color="green" />
            <br />
            <br />
            <Button text={he.decode(ques.incorrect_answers[0])} color="red" />
            <br />
            <br />
            <Button text={he.decode(ques.incorrect_answers[1])} color="red" />
            <br />
            <br />
            <Button text={he.decode(ques.incorrect_answers[2])} color="red" />
          </div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

function Button(props) {
  const [color, setColor] = useState("#BDB76B");
  return (
    <button
      style={{ background: color, padding: 8, width: 800, height: 90, border: "2px solid black", fontSize: 25 }}
      onClick={() => {
        setColor(props.color);
      }}
    >
      <b>{props.text}</b>
    </button>
  );
}

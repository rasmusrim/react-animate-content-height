import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { AnimateHeight } from "react-animate-content-height";

function App() {
  const [text, setText] = useState(generateText());

  return (
    <div
      className="App"
      style={{
        maxWidth: "30vw",
        border: "solid 1px black",
        padding: "10px",
        margin: "auto",
        marginTop: "10px",
      }}
    >
      <button onClick={() => setText(generateText())}>Change text</button>
      <AnimateHeight>{text}</AnimateHeight>
    </div>
  );
}

function generateText() {
  const paragraphs = Math.round(Math.random() * 5) + 1;

  const text = new Array(paragraphs).fill("").map(() => faker.lorem.text());

  return (
    <>
      {text.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
    </>
  );
}

export default App;

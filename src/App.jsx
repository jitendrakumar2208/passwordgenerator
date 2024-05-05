import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowd, seCharAllowed] = useState(false);

  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowd) {
      str += "`!@#$%^&*()_-+=";
    }

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length) + 1;

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowd, setPassword]);
  console.log(password);
  useEffect(() => {
    passwordGenerate();
  }, [length, charAllowd, numberAllowed, setPassword]);

  const passwordRef = useRef(null);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="container">
      <h2>password generator</h2>
      <div className="input_text">
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button onClick={copyPassword}>copy</button>
      </div>
      <div>
        <div className="range">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>length :{length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>include number</label>
        </div>
        <div>
          <input
            type="checkbox"
            defaultChecked={charAllowd}
            onChange={() => seCharAllowed((prev) => !prev)}
          />
          <label htmlFor="">include character</label>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // const passwordGenerator = useCallback(() => {
  //   let pass = "";
  //   let str = "";
  //   let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   let lower = "abcdefghijklmnopqrstuvwxyz";
  //   let num = "0123456789";
  //   let special = "!~`@#$%^&*()}{|<>?";

  //   if (upperCase) str += upper;
  //   if (lowerCase) str += lower;
  //   if (number) str += num;
  //   if (specialChar) str += special;

  //   for (let i = 1; i <= length; i++) {
  //     let randomIndex = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(randomIndex);
  //   }

  //   setPassword(pass);

  // }, [length, upperCase, lowerCase, number, specialChar, setPassword])

  //start here
  const passwordGenerator = () => {
    let pass = "";
    let str = "";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let special = "!~`@#$%^&*()}{|<>?";

    if (upperCase) str += upper;
    if (lowerCase) str += lower;
    if (number) str += num;
    if (specialChar) str += special;

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);

  };

  //end here

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [])

  return (
    <div className='flex justify-center items-center bg-slate-600 w-full h-screen'>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white font-bold text-2xl text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-sky-500 text-white px-3 py-0.5 shrink-0 hover:bg-sky-700'
          >Copy</button>
        </div>
        <div className='flex flex-col rounded-lg overflow-hidden '>
          <div className='flex flex-col items-center gap-x-1'>
            <label>Choose Password Length: {length}</label>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => { setLength(e.target.value) }}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className='cursor-pointer'
              type="checkbox"
              defaultChecked={upperCase}
              id="upperCaseInput"
              onChange={() => {
                setUpperCase((prev) => !prev);
              }}
            />
            <label htmlFor="upperCaseInput" className='cursor-pointer'>Upper Case</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              className='cursor-pointer'
              type="checkbox"
              defaultChecked={lowerCase}
              id="lowerCaseInput"
              onChange={() => {
                setLowerCase((prev) => !prev);
              }}
            />
            <label htmlFor="lowerCaseInput" className='cursor-pointer'>Lower Case</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              className='cursor-pointer'
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className='cursor-pointer'>Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              className='cursor-pointer'
              type="checkbox"
              defaultChecked={specialChar}
              id="specialCharInput"
              onChange={() => {
                setSpecialChar((prev) => !prev);
              }}
            />
            <label htmlFor="specialCharInput" className='cursor-pointer'>Special Char</label>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              className='cursor-pointer w-full bg-sky-500 text-white mt-3 py-2 text-bold text-xl hover:bg-sky-700'
              onClick={passwordGenerator}>Generate Password</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App

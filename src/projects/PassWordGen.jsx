import { useState,useCallback,useEffect,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
function PassWordGen() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [characterAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);
    const copyPassword = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password)
        toast.success("Password Copied to Clipboard");
    },[password])
   
   const PassWordGenarator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
        str+="0123456789"
    }

    if(characterAllowed){
        str+="!@#$%^&*()"
    }
    for(let i = 0; i < length; i++){
        const char = Math.floor( Math.random()*str.length);

        pass+=str.charAt(char)
    }
    setPassword(pass)
   },[length,numberAllowed,characterAllowed,setPassword])

   useEffect(() => {
    PassWordGenarator();
   }
   , [length, numberAllowed, characterAllowed, PassWordGenarator]);
   

  return (
    <>
<ToastContainer position="bottom-right" autoClose={1000} />
      
       <div>
       <h1 className='text-5xl animate-bounce font-semibold text-shadow-lg/20 text-purple-700'>Welcome to the Password Generator</h1>
       <br/>
       <div className="w-full bg-black/65 max-w-md mx-auto rounded-xl p-6 shadow-lg space-y-6">

<div className="flex items-center gap-2">
  <input
    type="text"
    value={password}
    readOnly
    placeholder="Password"
    ref={passwordRef}
    className="w-full border-2 border-purple-700 px-4 py-3 bg-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
  />
  <button onClick={copyPassword} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Copy</button>
</div>

{/* Length Slider */}
<div className="space-y-2">
  <label className="flex justify-between text-sm font-medium text-gray-300">
    <span>Length: {length}</span>
  </label>
  <input
    type="range"
    min={6}
    max={100}
    value={length}
    onChange={(e) => setLength(e.target.value)}
    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
  />
</div>

{/* Number Checkbox */}
<div className="flex items-center gap-3">
  <input
    type="checkbox"
    className="w-4 h-4 accent-blue-500 rounded"
    defaultChecked={numberAllowed}
    onChange={() => setNumberAllowed((prev) => !prev)}
  />
  <span className="text-gray-300">Include Numbers</span>
</div>

{/* Character Checkbox */}
<div className="flex items-center gap-3">
  <input
    type="checkbox"
    className="w-4 h-4 accent-blue-500 rounded"
    defaultChecked={characterAllowed}
    onChange={() => setCharacterAllowed((prev) => !prev)}
  />
  <span className="text-gray-300">Include Special Characters</span>
</div>
</div>
       </div>
      

  </>
  
  );
  
}

export default PassWordGen;

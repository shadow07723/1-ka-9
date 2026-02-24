import { useState } from "react";      
import { motion } from "framer-motion";      
import useSound from "use-sound";      

const initialImages = [      
  "🐼","🦁","🐰","🐯","🐵","🐸","🐻","🐶","🐱","🦊",      
  "🦝","🦄","🐮","🐷","🐔","🐧","🐤","🐺","🦖","🦓"      
];      

// Animal names in Hindi      
const animalNames = {      
  "🐼": "पांडा","🦁": "सिंह","🐰": "खरगोश","🐯": "बाघ","🐵": "बंदर",      
  "🐸": "मेंढक","🐻": "भालू","🐶": "कुत्ता","🐱": "बिल्ली","🦊": "लोमड़ी",      
  "🦝": "रैकून","🦄": "यूनिकॉर्न","🐮": "गाय","🐷": "सूअर","🐔": "मुर्गी",      
  "🐧": "पेंगुइन","🐤": "चूजा","🐺": "भेड़िया","🦖": "डायनासोर","🦓": "ज़ेब्रा",      
};      

const colors = ["bg-red-400","bg-blue-400","bg-yellow-400","bg-purple-400","bg-pink-400","bg-green-400","bg-orange-400","bg-teal-400"];      

export default function Game() {      
  const [images, setImages] = useState(initialImages.map((emoji) => ({ emoji, count: 0, color: null })));      
  const [selected, setSelected] = useState(null);      
  const [winner, setWinner] = useState(null);      
  const [points, setPoints] = useState(0);      
  const [message, setMessage] = useState("");  
  const [globalColor, setGlobalColor] = useState(null); // pehli click color fix      

  const [winSound] = useSound("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");      

  const selectImage = (emoji) => {      
    setSelected(emoji);  

    // Pehli bar click par color set
    if (!globalColor) {  
      const randomColor = colors[Math.floor(Math.random() * colors.length)];  
      setGlobalColor(randomColor);  
    }  

    setImages((prev) => prev.map((img) =>  
      img.emoji === emoji  
        ? { ...img, count: img.count + 1, color: globalColor || colors[Math.floor(Math.random() * colors.length)] }  
        : img  
    ));  
  };      

  const decreaseSelected = () => {      
    if (!selected) return alert("पहले कोई जानवर चुनें!");      
    setImages((prev) => prev.map((img) => img.emoji === selected ? { ...img, count: img.count > 0 ? img.count - 1 : 0 } : img));      
  };      

  const playGame = () => {      
    if (!selected) return alert("पहले कोई जानवर चुनें!");      
    const rand = images[Math.floor(Math.random() * images.length)];      
    setWinner(rand.emoji);      
    const multiplier = images.find((i) => i.emoji === rand.emoji).count;      
    setPoints(points + 100 * multiplier);      
    setMessage(`🎉 ${animalNames[rand.emoji]} ने जीत लिया है!`);      
    winSound();      
  };      

  const refreshPoints = () => {      
    setPoints(0);      
    setMessage("");      
    setWinner(null);      
    setSelected(null);      
    setGlobalColor(null); // reset color  
    setImages(initialImages.map((emoji) => ({ emoji, count: 0, color: null })));      
  };      

  return (      
    <div className="h-screen flex flex-col bg-gray-100 px-4 py-4 overflow-hidden">      

      {/* Points */}      
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Points:{points}</h1>      

      {/* Emoji grid with vertical scroll only */}      
      <div className="flex-1 w-full max-w-2xl mt-4 overflow-y-auto overflow-x-hidden">      
        <div className="grid grid-cols-5 gap-2 w-full">      
          {images.map((img, i) => (      
            <motion.div      
              whileHover={{ scale: 1.2 }}      
              whileTap={{ scale: 0.95 }}      
              key={i}      
              onClick={() => selectImage(img.emoji)}      
              className={`flex flex-col items-center justify-center cursor-pointer p-2 sm:p-3 rounded-2xl shadow-lg transition-all ${img.color ? img.color : "bg-white"}`}      
            >      
              <span className="text-sm sm:text-base font-semibold mb-1">{animalNames[img.emoji]}</span>      
              <span className="text-5xl sm:text-6xl">{img.emoji}</span>      
              <span className="text-sm mt-1">{img.count}</span>      
            </motion.div>      
          ))}      
        </div>      
      </div>      

      {/* Buttons */}      
      <div className="flex flex-row gap-2 w-full max-w-2xl justify-center mt-2">      
        <motion.button whileTap={{ scale: 0.95 }} onClick={playGame} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-2xl shadow-lg text-sm sm:text-base">Play</motion.button>      
        <button onClick={decreaseSelected} disabled={!selected} className={`flex-1 px-4 py-2 rounded-2xl text-sm sm:text-base ${selected ? "bg-red-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}>- </button>      
        <button onClick={refreshPoints} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-2xl text-sm sm:text-base">Refresh</button>      
      </div>      

      {/* Winner emoji */}      
      {winner && (      
        <motion.div initial={{ scale: 0, rotate: -360 }} animate={{ scale: 1.5, rotate: 0 }} transition={{ type: "spring", stiffness: 250 }} className="text-6xl sm:text-8xl mt-2 text-center">      
          {winner}      
        </motion.div>      
      )}      

      {/* Message */}      
      {message && (      
        <h2 className="mt-2 text-lg sm:text-xl font-semibold text-center">{message}</h2>      
      )}      
    </div>      
  );      
}
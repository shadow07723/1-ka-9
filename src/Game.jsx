import { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";

const initialImages = [
  "🐼","🦁","🐰","🐯","🐵","🐸","🐻","🐶","🐱","🦊",
  "🦝","🦄","🐮","🐷","🐔","🐧","🐤","🐺","🦖","🦓"
];

// Animal names mapping
const animalNames = {
  "🐼": "Panda",
  "🦁": "Lion",
  "🐰": "Rabbit",
  "🐯": "Tiger",
  "🐵": "Monkey",
  "🐸": "Frog",
  "🐻": "Bear",
  "🐶": "Dog",
  "🐱": "Cat",
  "🦊": "Fox",
  "🦝": "Raccoon",
  "🦄": "Unicorn",
  "🐮": "Cow",
  "🐷": "Pig",
  "🐔": "Chicken",
  "🐧": "Penguin",
  "🐤": "Chick",
  "🐺": "Wolf",
  "🦖": "Dinosaur",
  "🦓": "Zebra",
};

// Predefined colors for clicks
const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-green-400",
  "bg-orange-400",
  "bg-teal-400",
];

export default function Game() {
  const [images, setImages] = useState(
    initialImages.map((emoji) => ({ emoji, count: 0, color: null }))
  );
  const [selected, setSelected] = useState(null);
  const [winner, setWinner] = useState(null);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("");
  const [dark, setDark] = useState(false);

  const [winSound] = useSound(
    "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
  );

  const selectImage = (emoji) => {
    setSelected(emoji);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setImages((prev) =>
      prev.map((img) =>
        img.emoji === emoji
          ? { ...img, count: img.count + 1, color: randomColor }
          : img
      )
    );
  };

  const playGame = () => {
    if (!selected) return alert("Pehle emoji select karo!");
    const rand = images[Math.floor(Math.random() * images.length)];
    setWinner(rand.emoji);

    const winnerEmoji = images.find((i) => i.emoji === rand.emoji);
    const multiplier = winnerEmoji.count;
    setPoints(points + 100 * multiplier);
    setMessage(`🎉 ${rand.emoji} ne jeet liya hai is samay!`);
    winSound();
  };

  const refreshPoints = () => {
    setPoints("");
    setMessage("");
    setWinner(null);
    setSelected(null);
    setImages(initialImages.map((emoji) => ({ emoji, count: 0, color: null })));
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all px-4 py-6">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-5 right-5 px-3 py-2 bg-black text-white dark:bg-white dark:text-black rounded-xl text-sm sm:text-base"
        >
          Toggle Mode
        </button>

        {/* Points */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
          Points: {points}
        </h1>

        {/* Emoji grid */}
        <div className="grid grid-cols-5 gap-3 mb-6 w-full max-w-md sm:max-w-2xl">
          {images.map((img, i) => (
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              key={i}
              onClick={() => selectImage(img.emoji)}
              className={`flex flex-col items-center justify-center cursor-pointer p-3 sm:p-4 rounded-2xl shadow-lg transition-all ${
                img.color ? img.color : "bg-white dark:bg-gray-700"
              }`}
            >
              {/* Animal name */}
              <span className="text-sm sm:text-base font-semibold mb-1 dark:text-white">{animalNames[img.emoji]}</span>

              {/* Emoji */}
              <span className="text-6xl sm:text-5xl">{img.emoji}</span>

              {/* Count */}
              <span className="text-sm mt-1">{img.count}</span>
            </motion.div>
          ))}
        </div>

        {/* Play Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={playGame}
          className="px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-2xl shadow-xl text-sm sm:text-base"
        >
          Play
        </motion.button>

        {/* Winner emoji */}
        {winner && (
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1.5, rotate: 0 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="text-6xl sm:text-8xl mt-6"
          >
            {winner}
          </motion.div>
        )}

        {/* Dynamic Message */}
        {message && (
          <h2 className="mt-4 text-lg sm:text-xl font-semibold dark:text-white text-center">
            {message}
          </h2>
        )}

        {/* Refresh */}
        <button
          onClick={refreshPoints}
          className="mt-6 px-4 py-2 sm:py-3 bg-red-500 text-white rounded-xl text-sm sm:text-base"
        >
          Refresh Points
        </button>
      </div>
    </div>
  );
}
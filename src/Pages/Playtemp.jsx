import { useState } from "react"
import KeyBoard from "../components/KeyBoard"
import PlayerCard from "../components/PlayerCard"
import list1 from '../assets/tier1.json'
import list2 from '../assets/tier2.json'

const generateInitialPlayer = () => ({
    playerName: '',
    country: '',
    franchise: '',
    age: '',
    role: '',
    price: ''
});

const selectRandomPlayersForDay = (list) => {
  const randomPlayers = [];
  for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * list.length);
      randomPlayers.push(list[randomIndex]);
  }
  return randomPlayers;
}


const Play = () => {
    const [input, setInput] = useState('')
    const [players, setPlayers] = useState(Array.from({ length: 4 }, generateInitialPlayer));
    const date = new Date(); // Use the current date
    const randomPlayersForToday = selectRandomPlayersForDay(list1, date);
    // const randomPlayers1 = selectRandomPlayersForDay(list1);
    // const randomPlayers2 = selectRandomPlayersForDay(list2);
    console.log(randomPlayersForToday)
    

    const handleKeyPress = (event) => {
        const key = event;
        if(key === "Del" || key === 'Backspace') return setInput((prev) => prev.slice(0, -1))
        if(key === "Space") return setInput((prev) => prev + " ")
        if(key === "Guess") return (
            alert('You guessed: ' + input),
            setInput('')
        )
        if(key === "Hint") return (
            console.log('Hint')
        )
        setInput((prev) => prev + key)
    }

  return (
    <>
        <div className="flex flex-col justify-center">
        <div>{input?input:"Enter text here..."}</div>
      <KeyBoard onKeyPress={handleKeyPress}/>
      </div>
    </>
  )
}

export default Play

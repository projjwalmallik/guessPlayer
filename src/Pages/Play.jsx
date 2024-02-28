import { useState, useEffect, useCallback } from "react";
import { PLAYERS } from "../assets/players";
import data from "../assets/tier1.json";
import PlayerCard from "../components/PlayerCard";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const Play = ({ stats }) => {
  const [inputValue, setInputValue] = useState("");
  const [bestSuggestion, setBestSuggestion] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(false); // Track if suggestions should be shown
  const [allSuggestions, setAllSuggestions] = useState([]); // Track all suggestions
  const [player1, setplayer1] = useState({
    franchise: "",
    jerseyNumber: "",
    role: "",
    country: "",
    age: "",
    playerName: "",
  });
  const [player2, setplayer2] = useState({
    franchise: "",
    jerseyNumber: "",
    role: "",
    country: "",
    age: "",
    playerName: "",
  });
  const [player3, setplayer3] = useState({
    franchise: "",
    jerseyNumber: "",
    role: "",
    country: "",
    age: "",
    playerName: "",
  });
  const [player4, setplayer4] = useState({
    franchise: "",
    jerseyNumber: "",
    role: "",
    country: "",
    age: "",
    playerName: "",
  });
  const [guessPlayer1, setGuessPlayer1] = useState(false);
  const [guessPlayer2, setGuessPlayer2] = useState(false);
  const [guessPlayer3, setGuessPlayer3] = useState(false);
  const [guessPlayer4, setGuessPlayer4] = useState(false);
  const [done, setDone] = useState(false);
  const [LivesLeft, setLivesLeft] = useState(15);
  const [hintMode, setHintMode] = useState(false);
  //   console.log(data);
  const getInitialHints = () => {
    const hintsFromStorage = localStorage.getItem("hints");
    // Parse the value from localStorage. If not available, default to a specific value
    const initialHints = hintsFromStorage ? parseInt(hintsFromStorage, 10) : 3; // Default to 3 hints if not set
    return initialHints;
  };
  const [HintLeft, setHintLeft] = useState(getInitialHints());

  const incrementWin = (id) => {
    axios
      .post(`/updateWin/${id}`)
      .then((response) => {
        console.log(response.data);
        // Additional logic upon success
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };
  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const curDate = new Date();
  const curDay = curDate.getDate();
  function generatePlayer(day) {
    const selectedPlayer = [];
    for (let i = 0; i < 4; i++) {
      const index = (day + i * 2) % PLAYERS.length;
      selectedPlayer.push(PLAYERS[index]);
    }
    return selectedPlayer;
  }
  const hero = generatePlayer(curDay);
  //   console.log(hero);

  useEffect(() => {
    const player1Data = localStorage.getItem("player1");
    const player2Data = localStorage.getItem("player2");
    const player3Data = localStorage.getItem("player3");
    const player4Data = localStorage.getItem("player4");
    const lives = localStorage.getItem("lives");
    const hints = localStorage.getItem("hints");

    if (player1Data) {
      setplayer1(JSON.parse(player1Data));
      const res = JSON.parse(player1Data);
      if (res.name !== "") {
        if (res.playerName.toLowerCase() === hero[0].playerName.toLowerCase()) {
          setGuessPlayer1(true);
        }
      }
    }
    if (player2Data) {
      setplayer2(JSON.parse(player2Data));
      const res = JSON.parse(player2Data);
      if (res.name !== "") {
        if (res.playerName.toLowerCase() === hero[1].playerName.toLowerCase()) {
          setGuessPlayer2(true);
        }
      }
    }
    if (player3Data) {
      setplayer3(JSON.parse(player3Data));
      const res = JSON.parse(player3Data);
      if (res.name !== "") {
        if (res.playerName.toLowerCase() === hero[2].playerName.toLowerCase()) {
          setGuessPlayer3(true);
        }
      }
    }
    if (player4Data) {
      setplayer4(JSON.parse(player4Data));
      const res = JSON.parse(player4Data);
      if (res.name !== "") {
        if (res.playerName.toLowerCase() === hero[3].playerName.toLowerCase()) {
          setGuessPlayer4(true);
        }
      }
    }

    if (lives) {
      setLivesLeft(JSON.parse(lives));
    }
    if (hints) {
      setHintLeft(parseInt(hints));
    }
  }, [HintLeft]);

  const compareInput = useCallback(
    (inputValue) => {
      setLivesLeft((prevLives) => {
        if (prevLives === 0) {
          return 0;
        }
        return prevLives - 1;
      });
      localStorage.setItem("lives", JSON.stringify(LivesLeft));
      const guess = PLAYERS.find(
        (player) => player.playerName.toLowerCase() === inputValue.toLowerCase()
      );

      if (!guess) {
        alert("Player not found");
        return;
      }

      const setPlayerValue = (index, property, value) => {
        switch (index) {
          case 0:
            setplayer1((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage("player1", updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 1:
            setplayer2((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage("player2", updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 2:
            setplayer3((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage("player3", updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 3:
            setplayer4((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage("player4", updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          default:
            break;
        }
      };
      for (let i = 0; i < hero.length; i++) {
        if (guess.jerseyNumber === hero[i].jerseyNumber) {
          setPlayerValue(i, "jerseyNumber", guess.jerseyNumber);
        }
        if (guess.franchise === hero[i].franchise) {
          setPlayerValue(i, "franchise", guess.franchise);
        }
        if (guess.age === hero[i].age) {
          setPlayerValue(i, "role", guess.role);
        }
        if (guess.country.toLowerCase() === hero[i].country.toLowerCase()) {
          setPlayerValue(i, "country", guess.country);
        }
        if (guess.playerName === hero[i].playerName) {
          setPlayerValue(i, "playerName", guess.playerName);
          switch (i) {
            case 0:
              setGuessPlayer1(true);
              break;
            case 1:
              setGuessPlayer2(true);
              break;
            case 2:
              setGuessPlayer3(true);
              break;
            case 3:
              setGuessPlayer4(true);
              break;
            default:
              break;
          }
        }
      }

      if (guessPlayer1 && guessPlayer2 && guessPlayer3 && guessPlayer4) {
        alert("You have guessed all players");
        incrementWin(stats._id);
        setDone(true);
      }
    },
    [hero, player1, player2, player3, player4]
  );

  const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace"],
    ["Hint", "Space", "Enter"],
  ];
  const handleKeyPress = useCallback(
    (key) => {
      if (key === "Backspace") {
        if (inputValue === "") {
          setBestSuggestion("");
        }
        setInputValue((prevValue) => {
          const newValue = prevValue.slice(0, -1);
          updateBestSuggestion(newValue); // Update suggestion after updating inputValue
          return newValue;
        });
      } else if (key === "Space" || key === "Spacebar" || key === " ") {
        setInputValue((prevValue) => {
          const newValue = prevValue + " ";
          updateBestSuggestion(newValue); // Update suggestion after updating inputValue
          return newValue;
        });
      } else if (key === "Enter") {
        setInputValue(bestSuggestion);
        const value = bestSuggestion;
        compareInput(value);
        setInputValue("");
        setBestSuggestion("");
      } else if (key === "Hint") {
        toggleHintMode();
      } else {
        if (/^[a-zA-Z]$/.test(key)) {
          setInputValue((prevValue) => prevValue + key.toUpperCase());
        }
      }
      // For non-Backspace, non-Space, non-Enter keys, update suggestion after updating inputValue
      if (
        key !== "Backspace" &&
        key !== "Space" &&
        key !== "Spacebar" &&
        key !== "Enter"
      ) {
        updateBestSuggestion(inputValue + key);
      }
    },
    [inputValue, bestSuggestion, compareInput]
  ); // Add bestSuggestion as a dependency

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === "Hint") {
        if (HintLeft === 0) {
          alert("No hints left");
          return;
        }
        alert("Hint: " + hero[0].playerName);
        // setReveal(true);
        setHintLeft((prevHint) => prevHint - 1);
      }
      if (checkDisableButton(key)) {
        event.preventDefault(); // Prevent default action if the key is disabled
      } else {
        handleKeyPress(key);
      }
    };
    if (guessPlayer1 && guessPlayer2 && guessPlayer3 && guessPlayer4) {
      setDone(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  const updateBestSuggestion = (value) => {
    // Find the best suggestion from PLAYERS array
    const filteredPlayers = PLAYERS.filter((player) =>
      player.playerName.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredPlayers.length > 0) {
      const best = filteredPlayers[0].playerName; // Get the playerName of the first match
      const suggestions = filteredPlayers.map((player) => player.playerName); // Get all suggestions
      setAllSuggestions(suggestions);
      setBestSuggestion(best);
      //   setShowSuggestions(true);
    } else {
      setBestSuggestion("");
      setAllSuggestions([]);
      //   setShowSuggestions(false);
    }
  };

  const displayInputInSuggestion = () => {
    if (!inputValue) return;
    if (!bestSuggestion) return inputValue;
    const index = bestSuggestion
      .toLowerCase()
      .indexOf(inputValue.toLowerCase());
    if (index === -1) return bestSuggestion;
    const firstLetters = bestSuggestion.slice(0, index);
    const remainingLetters = bestSuggestion.slice(index + inputValue.length);
    return (
      <>
        <span style={{ opacity: 0.3 }}>{firstLetters.toUpperCase()}</span>
        <span style={{ opacity: 1 }}>{inputValue.toUpperCase()}</span>
        <span style={{ opacity: 0.3 }}>{remainingLetters.toUpperCase()}</span>
      </>
    );
  };

  const checkDisableButton = (key) => {
    if (!inputValue) {
      return false; // No input, keep button enabled
    }
    if (done) {
      return true;
    }
    const combination = (inputValue + key).toLowerCase();
    // Check if there's any suggestion that starts with the combination
    const hasFollowingSuggestion = allSuggestions.some((suggestion) =>
      suggestion.toLowerCase().includes(combination)
    );
    if (key === "Enter") return false;
    if (key === "Backspace") return false;
    if (key === "Hint") return false;

    // If the pressed key is a space and there's no following suggestion, disable the spacebar
    if (
      (key === "Space" || key === "Spacebar" || key === " ") &&
      !hasFollowingSuggestion
    ) {
      return false;
    }

    // Otherwise, disable the button if there's no following suggestion
    return !hasFollowingSuggestion;
  };

  const setPlayerValue = (index, property, value) => {
    switch (index) {
      case 0:
        setplayer1((prevValues) => {
          const updatedPlayer = { ...prevValues, [property]: value };
          updateLocalStorage("player1", updatedPlayer); // Update localStorage here
          return updatedPlayer;
        });
        break;
      case 1:
        setplayer2((prevValues) => {
          const updatedPlayer = { ...prevValues, [property]: value };
          updateLocalStorage("player2", updatedPlayer); // Update localStorage here
          return updatedPlayer;
        });
        break;
      case 2:
        setplayer3((prevValues) => {
          const updatedPlayer = { ...prevValues, [property]: value };
          updateLocalStorage("player3", updatedPlayer); // Update localStorage here
          return updatedPlayer;
        });
        break;
      case 3:
        setplayer4((prevValues) => {
          const updatedPlayer = { ...prevValues, [property]: value };
          updateLocalStorage("player4", updatedPlayer); // Update localStorage here
          return updatedPlayer;
        });
        break;
      default:
        break;
    }
  };
  const toggleHintMode = () => {
    if (HintLeft > 0) {
      setHintMode(!hintMode);
    }
  };

  const revealHint = (index, hintType, value) => {
    setPlayerValue(index, hintType, value);
    setHintMode(false);
    setHintLeft((prev) => {
      const newHintLeft = prev - 1;
      localStorage.setItem("hints", newHintLeft.toString());
      return newHintLeft;
    });
  };

  return (
    <>
      <div className="all">
        {/* <div className="subhead">
            <span className="text-lg md:text-xl lg:text-2xl">Hint</span>
            <p className="text-sm md:text-base lg:text-lg">Guess today&#39;s player</p>
            <span className="text-lg md:text-xl lg:text-2xl">Lives</span>
        </div> */}
        <div className="px-4 h-100 mt-20 flex justify-center items-center">
          <div className="w-25">
            <div className="px-4 h-100 mt-20 flex justify-between items-center">
              <div className="w-25 flex items-center justify-center">
                <h2 className="text-sm font-bold inline text-center">
                  <CiSearch />
                  {HintLeft}
                </h2>
              </div>
              <div className="w-25">
                {/* Center section for game panel */}
                <h2 className="text-xl font-bold mb-4 text-center">
                  Game Panel
                </h2>
              </div>
              <div className="w-25 text-right">
                {/* Right section for lives */}
                <h2 className="text-sm font-bold text-center">
                  <FaHeart />
                  {LivesLeft}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 text-center">
              <PlayerCard
                player={player1}
                hero={hero[0]}
                isGuessed={guessPlayer1}
                playerNumber={0}
                hintMode={hintMode}
                revealHint={revealHint}
              />
              <PlayerCard
                player={player2}
                hero={hero[1]}
                isGuessed={guessPlayer2}
                playerNumber={1}
                hintMode={hintMode}
                revealHint={revealHint}
              />
              <PlayerCard
                player={player3}
                hero={hero[2]}
                isGuessed={guessPlayer3}
                playerNumber={2}
                hintMode={hintMode}
                revealHint={revealHint}
              />
              <PlayerCard
                player={player4}
                hero={hero[3]}
                isGuessed={guessPlayer4}
                playerNumber={3}
                hintMode={hintMode}
                revealHint={revealHint}
              />
            </div>
          </div>
        </div>
        <div className={`input text-gray-600 relative`}>
          <span>
            {inputValue ? displayInputInSuggestion() : "Enter text here.."}
          </span>
        </div>
        <div className="keyboard ">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((key, keyIndex) => (
                <button
                  key={keyIndex}
                  onClick={() => handleKeyPress(key)}
                  className={key === "Space" ? "space-key" : ""}
                  disabled={checkDisableButton(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Play;

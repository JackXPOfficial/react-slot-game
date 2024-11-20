import { useState, useEffect } from "react";
import "./SlotBody.css";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";

function SlotBody() {
    const [slot1, setSlot1] = useState(img1);
    const [slot2, setSlot2] = useState(img2);
    const [slot3, setSlot3] = useState(img3);

    const [stake, setStake] = useState(100);
    const [bank, setBank] = useState(1000);

    const [gamesRunning, setGamesRunning] = useState(false);
    const [win, setWin] = useState(null);

    const images = [img1, img2, img3, img4];

    var audio = new Audio('./assets/slot_sound.mp3');

    
    //Start Programm if "Space" is pressed
    useEffect(() => {
        const handleKeyDown = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            runSlots();
        }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, [gamesRunning]);

    
    const increaseStake = () => {
        setStake((prev) => prev + 10);
    };

    const decreaseStake = () => {
        setStake((prev) => (prev > 10 ? prev - 10 : prev));
    };


    const randomNumber = () => Math.floor(Math.random() * images.length);

    //Random number with higher chance
    const weightedRandomNumber = () => {
        const probabilities = [10000, 10000, 10000, 1]; // Higher chance for numbers 1, 2, 3
        const total = probabilities.reduce((a, b) => a + b, 0);
        const randomIndex = Math.floor(Math.random() * total);
        let sum = 0;

        for (let i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
            if (randomIndex < sum) {
                return i; // Return 0, 1, 2, or 3 (corresponding to img indices)
            }
        }
        return 0;
    };

    //run Slot game
    const runSlots = () => {
        removeDisplayWin();
        if (bank <= 0 || gamesRunning) return;
        audio.load();
        audio.play();
        setGamesRunning(true);
        setBank((prevBank) => prevBank - stake);

        const animationInterval = 100; // Interval in milliseconds for each slot cycle
        const animationDuration = 1500; // Total duration in milliseconds

        const intervalId = setInterval(() => {
        setSlot1(images[randomNumber()]);
        setSlot2(images[randomNumber()]);
        setSlot3(images[randomNumber()]);
        }, animationInterval);

        setTimeout(() => {
        clearInterval(intervalId);

        // Final random results
        const finalSlot1 = images[weightedRandomNumber()];
        const finalSlot2 = images[weightedRandomNumber()];
        const finalSlot3 = images[weightedRandomNumber()];

        setSlot1(finalSlot1);
        setSlot2(finalSlot2);
        setSlot3(finalSlot3);

        setGamesRunning(false);
        audio.pause();
        checkForWin(finalSlot1, finalSlot2, finalSlot3);
        }, animationDuration);
    };

    const checkForWin = (finalSlot1, finalSlot2, finalSlot3) => {
        if (finalSlot1 === finalSlot2 && finalSlot1 === finalSlot3) {
        setBank((prevBank) => prevBank + stake * 5);
        displayWin(stake * 5);
        }
    };

    const displayWin = (winAmount) => {
        setWin(`Gewinn: ${winAmount}`);
    };

    const removeDisplayWin = () => {
        setWin(null);
    };

  
  
    return (
        <>
        <div className="slotBody">
            <img src={slot1} alt="slot1" />
            <img src={slot2} alt="slot2" />
            <img src={slot3} alt="slot3" />
        </div>
        <div className="slotButtons">
            <h3>Bank:</h3>
            <p>{bank}</p>
            <h3>Einsatz:</h3>
            <p>{stake}</p>
            <button onClick={increaseStake}>+</button>
            <button onClick={decreaseStake}>-</button>
            <button onClick={runSlots}>Spielen</button>
        </div>
        <div className="slotFooter">
            <p>{win}</p>
        </div>
        </>
    );
    }

    export default SlotBody;
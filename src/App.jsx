import { useState } from "react"
import pickWord from "./utils/words"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const KEYBOARD = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split("")
];

export default function App() {
    const [word, setWord] = useState(pickWord());
    const [history, setHistory] = useState([]);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [presentLetters, setPresentLetters] = useState([]);
    const [disabledLetters, setDisabledLetters] = useState([]);



    const autoFocus = (input) => {

        if (input.value === '') return;

        const nextInput = input.nextElementSibling;

        if (!nextInput || nextInput.value !== '') return document.getElementById("btn-check").focus();

        nextInput.value === '' ? input.nextElementSibling.focus() : input.nextElementSibling.nextElementSibling.focus();
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Backspace':
                if (e.target.value === '' && e.target.previousElementSibling) {
                    e.target.previousElementSibling.focus();
                }
                break;

            case 'ArrowRight':
                if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.focus();
                }
                break;

            case 'ArrowLeft':
                if (e.target.previousElementSibling) {
                    e.target.previousElementSibling.focus();
                }
                break;

            case 'ArrowDown':
                const btnCheck = document.getElementById("btn-check");
                if (btnCheck) btnCheck.focus();
                break;

            case 'ArrowUp':
                const inputsRow = document.getElementById("inputs-row");
                if (inputsRow) {
                    inputsRow.querySelectorAll("input")[0].focus();
                }
                break;

            default:
                break;
        }
    }



    const analyze = (values, secret) => {
        let result = values.map((char) => {
            return {
                char,
                style: 'disabled:bg-base-300',
                status: 'not-present'
            }
        })

        const copySecret = secret.split('');

        result.forEach((item, i) => {
            const char = item.char.toLowerCase();
            if (char === secret[i]) {
                item.style = 'disabled:bg-accent';
                item.status = 'correct';
                setCorrectLetters(prev => prev.includes(char) ? prev : [...prev, char]);
                copySecret[i] = null;
                return
            }
        })

        result.forEach((item, i) => {
            if (item.status !== 'not-present') return;

            const charLower = item.char.toLowerCase();
            const position = copySecret.indexOf(charLower);

            if (position == -1) return;

            item.style = 'disabled:bg-warning';
            item.status = 'present';
            setPresentLetters(prev => prev.includes(charLower) ? prev : [...prev, charLower]);
            copySecret[position] = null;
        })

        return result;
    }


    const checkEqualsWords = () => {
        const row = document.getElementById("inputs-row");
        const inputs = row.querySelectorAll("input");

        const secretWord = word.toLowerCase()
        const values = Array.from(inputs, input => input.value);

        if (values.includes('') || values.includes(null)) return alert("Preencha todos os campos!");

        const result = analyze(values, secretWord);
        console.log(result)

        saveWords(result);


        if (result.every(char => char.style === 'disabled:bg-accent')) {
            alert("Parabéns! Você acertou a palavra!");
            reset();
        }

        inputs.forEach(input => input.value = "");
        if (inputs.length > 0) inputs[0].focus();
    }

    const saveWords = (forSave) => {
        console.log(forSave);
        setHistory(prev => [...prev, forSave]);
    };

    const getLetterStyle = (letter) => {
        const charLower = letter.toLowerCase();
        if (correctLetters.includes(charLower)) return 'bg-green-500';
        if (presentLetters.includes(charLower)) return 'bg-warning';
        if (disabledLetters.includes(charLower)) return 'bg-error';
        return 'bg-base-100';
    };

    const reset = () => {
        setTimeout(() => {
            setWord(pickWord());
            setHistory([]);
            setCorrectLetters([]);
            setPresentLetters([]);
            setDisabledLetters([]);
        }, 2000)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            {history.map((phrase, index) => (
                <div key={index} className="flex flex-row gap-5">
                    {phrase.map((char, index) => (
                        <input
                            type="text"
                            className={`input w-12  text-2xl text-white ${char.style}`}
                            disabled
                            value={char.char}
                            key={index}
                        />
                    ))}
                </div>
            ))}

            < div id="inputs-row" className="flex flex-row gap-5">
                {word.split('').map((letter, index) => (
                    <input
                        type="text"
                        className="input w-12 text-2xl"
                        maxLength={1}
                        minLength={1}
                        key={index}
                        onChange={(e) => autoFocus(e.target)}
                        onKeyDown={handleKeyDown}
                    />
                ))}
            </div>

            <div className="flex flex-row gap-5">
                <button
                    id="btn-check"
                    onClick={() => checkEqualsWords()}
                    onKeyDown={handleKeyDown}
                    className="btn btn-primary btn-outline"
                >
                    Responder
                </button>

                <button
                    id="btn-check"
                    onClick={() => alert(word)}
                    onKeyDown={handleKeyDown}
                    className="btn btn-secondary btn-outline"
                >
                    Mostrar Palavra
                </button>
            </div>

            {/* Representação do Teclado */}
            <div className="flex flex-col items-center gap-2 mt-5">
                {KEYBOARD.map((row, i) => (
                    <div key={i} className="flex justify-center gap-2 w-full">
                        {row.map(letter => (
                            <div
                                key={letter}
                                className={`flex items-center justify-center w-10 h-10 rounded font-bold shadow-sm border border-gray-300 ${getLetterStyle(letter)}`}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            
            <Confetti  
                width={useWindowSize().width}
                height={useWindowSize().height}
                run={word.split('').every(char => correctLetters.includes(char))}
                style={{display: word.split('').every(char => correctLetters.includes(char)) ? 'block' : 'none'}}
                gravity={1}
            />
        </div >
    )
}

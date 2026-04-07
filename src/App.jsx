import { useState } from "react"
import pickWord from "./utils/words"

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
        if (input.value.length === 1) {
            if (input.nextElementSibling) {
                input.nextElementSibling.focus();
            } else {
                document.getElementById("btn-check").focus();
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && e.target.value === '') {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }

        if (e.key === 'ArrowRight') {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }
        }

        if (e.key === 'ArrowLeft') {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }

        if (e.key === 'ArrowDown') {
            document.getElementById("btn-check").focus();
        }

        if (e.key === 'ArrowUp') {
            document.getElementById("inputs-row").querySelectorAll("input")[0].focus();
        }
    }


    const analyze = (values, secret) => {
        // { char, style: 'disabled:bg-error', status: 'error' }
        // { char, style: 'disabled:bg-accent', status: 'correct' }
        // { char, style: 'disabled:bg-warning', status: 'present' }
        // { char, style: 'disabled:bg-base-300', status: 'repeat || not-present' }

        /*
        return values.map((char, i) => {

            if (char === '' || char === null) {
                return { char, style: 'disabled:bg-error', status: 'error' }
            };

            if (char.toLowerCase() === secret[i]) {
                setCorrectLetters(prev => [...prev, char.toLowerCase()]);
                return { char, style: 'disabled:bg-accent', status: 'correct' }
            };

            if (secret.includes(char.toLowerCase())) {
                

                setPresentLetters(prev => [...prev, char.toLowerCase()]);
                return { char, style: 'disabled:bg-warning', status: 'present' }
            };

            setDisabledLetters(prev => [...prev, char.toLowerCase()]);
            return { char, style: 'disabled:bg-base-300', status: 'not-present' };
        })
        */

        values.map((char, i) => {
            return {
                char,
                style: 'disabled:bg-base-300',
                status: 'not-present'
            }
        })
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

        /*
        if (result.every(char => char.style === 'disabled:bg-accent')) {
            alert("Parabéns! Você acertou a palavra!");
            reset();
        }
        */

        inputs.forEach(input => input.value = "");
        if (inputs.length > 0) inputs[0].focus();
    }

    const saveWords = (forSave) => {
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
        setWord(pickWord());
        setHistory([]);
        setCorrectLetters([]);
        setPresentLetters([]);
        setDisabledLetters([]);
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
        </div >
    )
}

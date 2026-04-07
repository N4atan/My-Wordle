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
    const [charCodeCorrect, setCharCodeCorrect] = useState([]);
    const [charCodePresent, setCharCodePresent] = useState([]);
    const [charDisabled, setCharDisabled] = useState([]);



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
        return values.map((char, i) => {

            if (char === '' || char === null) {
                return { char, style: 'disabled:bg-error' }
            };

            if (char.toLowerCase() === secret[i]) {
                setCharCodeCorrect(prev => [...prev, char.toLowerCase().charCodeAt(0)]);
                return { char, style: 'disabled:bg-accent' }
            };
            if (secret.includes(char.toLowerCase())) {
                setCharCodePresent(prev => [...prev, char.toLowerCase().charCodeAt(0)]);
                return { char, style: 'disabled:bg-warning' }
            };
            setCharDisabled(prev => [...prev, char.toLowerCase().charCodeAt(0)]);
            return { char, style: 'disabled:bg-error' };
        })
    }


    const checkEqualsWords = () => {
        const row = document.getElementById("inputs-row");
        const inputs = row.querySelectorAll("input");

        const secretWord = word.toLowerCase()
        const values = Array.from(inputs, input => input.value);

        if (values.includes('') || values.includes(null)) return alert("Preencha todos os campos!");

        saveWords(analyze(values, secretWord));

        inputs.forEach(input => input.value = "");
        if (inputs.length > 0) inputs[0].focus();
    }

    const saveWords = (forSave) => {
        setHistory(prev => [...prev, forSave]);
    };

    const getLetterStyle = (letter) => {
        const charCode = letter.toLowerCase().charCodeAt(0);
        if (charCodeCorrect.includes(charCode)) return 'bg-green-500';
        if (charCodePresent.includes(charCode)) return 'bg-warning';
        if (charDisabled.includes(charCode)) return 'bg-error';
        return 'bg-base-200';
    };

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
                                className={`flex items-center justify-center w-10 h-10 rounded font-bold shadow-sm ${getLetterStyle(letter)}`}
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

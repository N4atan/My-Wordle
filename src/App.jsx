import { useState } from "react"



export default function App() {
    const [word, setWord] = useState("hello");
    const [history, setHistory] = useState([]);


    const autoFocus = (input) => {
        if (input.value.length === 1 && input.nextElementSibling) {
            input.nextElementSibling.focus();
        }
    }


    const analyze = (values, secret) => {
        return values.map((char, i) => {

            if (char.toLowerCase() === secret[i]) return { char, style: 'disabled:bg-info' };
            if (secret.includes(char.toLowerCase())) return { char, style: 'disabled:bg-warning' };

            return { char, style: 'disabled:bg-error' };
        })
    }


    const checkEqualsWords = () => {
        const row = document.getElementById("inputs-row");
        const inputs = row.querySelectorAll("input");

        const secretWord = word.toLowerCase()
        const values = Array.from(inputs, input => input.value);

        saveWords(analyze(values, secretWord));

    }

    const saveWords = (forSave) => {
        setHistory(prev => [...prev, forSave]);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5">
            {history.map((phrase, index) => (
                <div key={index} className="flex flex-row gap-5">
                    {phrase.map((char, index) => (
                        <input
                            type="text"
                            className={`input w-12 text-2xl ${char.style}`}
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
                    />
                ))}
            </div>
            <button onClick={() => checkEqualsWords()} className="btn btn-primary btn-outline">Responder</button>
        </div >
    )
}

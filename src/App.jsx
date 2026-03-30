import { useState } from "react"

export default function App() {
    const [word, setWord] = useState("hello")

    // Modificamos a função para receber o elemento de input real
    const autoFocus = (input) => {
        // Checa se algum caractere foi digitado (tamanho 1) 
        // E checa se existe um próximo elemento irmão antes de saltar o foco.
        if (input.value.length === 1 && input.nextElementSibling) {
            input.nextElementSibling.focus();
        }
    }


    const checkEqualsWords = () => {
        const inputs = document.getElementById("inputs-row").children
        word.toLowerCase()

        for (let i = 0; i < inputs.length; i++) {
            if (!word.includes(inputs[i].value.toLowerCase())) {
                inputs[i].classList.add("input-error")
                break
            }

            let index = word.indexOf(inputs[i].value.toLowerCase())

            if (index === i) {
                inputs[i].classList.add("disabled:input-success")
            } else {
                inputs[i].classList.add("input-warning")
            }

        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">


            <div id="inputs-row" className="flex flex-row gap-5">
                {word.split('').map((letter, index) => (
                    <input
                        type="text"
                        className="input w-10"
                        maxLength={1}
                        minLength={1}
                        key={index}
                        // Em vez de 'this', passamos a tag <input> através do evento de onChange (e.target)
                        onChange={(e) => autoFocus(e.target)}
                    />
                ))}
                <button onClick={() => checkEqualsWords()} className="btn">Ver</button>
            </div>
        </div>
    )
}

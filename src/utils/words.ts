const words = [
    // 4 letras
    "voar", "amar", "usar", "agir", "cair", "sair", "suar", "orar",
    
    // 5 letras
    "falar", "comer", "andar", "beber", "bater", "jogar", "viver", 
    "dizer", "fazer", "saber", "obter", "poder", "ouvir", "fugir",
    
    // 6 letras
    "correr", "pensar", "cantar", "buscar", "gostar", "tentar",
    "vender", "dormir", "sentir", "perder", "deixar", "tornar",
    
    // 7 letras
    "brincar", "ensinar", "comprar", "estudar", "mostrar", "lembrar",
    "esperar", "decidir", "crescer", "receber", "parecer", "chamar",
    
    // 8+ letras
    "entender", "aprender", "resolver", "esconder", "trabalhar",
    "continuar", "precisar", "acontecer", "conseguir", "conversar",
    "perguntar", "agradecer", "conquistar", "transformar"
];



const pickWord = () => {
    return words[Math.floor(Math.random() * words.length)];
}

export default pickWord;
const imputQuestion = document.getElementById
("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) =>{
    if (inputQuestion.value && e.key === "Enter")
    SendQuestion();
});

const OPENAI_API_KEY =
"";

function SendQuestion(){
    var sQuestion = inputQuestion.value;


    fetch("https://api.openai.com/v1/completions",{
        method: "POST",
        headers: {
            Accept:"application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, //tamanho da resposta
            temperature: 0.5, // criatividade na resposta
        }),
    })
    .then((response)=> response.json())
    .then ((json) =>{
        if (result.value) result.value += "\n";

        if(json.error?.message){
            result.value += `Error: ${json.error.message}
            `;

        } else if (json.choice?.[0].text){
            var text =json.choice[0].text || "Sem resposta";

            result.value += "Chat GPT" + text;
        }
        result.scrollTop = result.scrollHeight;
    })

    if (result.value) result.value += "\n\n\n";

    result.value += ` Eu: ${sQuestion}`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;

    result.scrollTop = result.scrollHeight;

}
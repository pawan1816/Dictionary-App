const form=document.querySelector("form");
const resultDiv=document.querySelector(".result");

form.addEventListener("submit",(e)=>{
     e.preventDefault();
     getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word)=>{
    try{
        resultDiv.innerHTML="fetching data...";
    const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data= await response.json();
    let definations=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
        <h2><strong>Word: </strong> ${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning: </strong>${definations.definition===undefined?"Not found":definations.definition}</p>
        <p><strong>Example: </strong>${definations.example===undefined?"Not found":definations.example}</p>
        <p><strong>Antonymss:</strong></p>
    `;
    // fetching antonyms 
    if(definations.antonyms.length==0){
        resultDiv.innerHTML+=`<span>Not found</span>`;
    }else{
        for(let i=0;i<definations.antonyms.length;i++){
            resultDiv.innerHTML+=`<li>${definations.antonyms[i]}</li>`;
        }
    }
    resultDiv.innerHTML+=`<p>Synonyms: </p>`;
    // fetching syntonyms
    if(definations.synonyms.length==0){
        resultDiv.innerHTML+=`<span>Not found</span>`;
    }else{
        for(let i=0;i<definations.synonyms.length;i++){
            resultDiv.innerHTML+=`<li>${definations.synonyms[i]}</li>`;
        }
    }
    // adding Read more Button
    resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    
    console.log(data);
    }catch(error){ 
           resultDiv.innerHTML=`<p>Word Not Found!</p>`;
    }
}
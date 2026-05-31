function sendMessage() {

    const userInput =
    document.getElementById("userInput").value.trim();

    if(userInput === ""){
        return;
    }

    const chatBox =
    document.getElementById("chatBox");

    let bestMatch = null;
    let maxScore = 0;

    faqs.forEach(faq => {

        const score =
        similarity(
            userInput.toLowerCase(),
            faq.question.toLowerCase()
        );

        if(score > maxScore){
            maxScore = score;
            bestMatch = faq;
        }

    });

    chatBox.innerHTML += `
        <div class="user-message">
            ${userInput}
        </div>
    `;

    if(bestMatch && maxScore > 0.1){

        chatBox.innerHTML += `
            <div class="bot-message">
                ${bestMatch.answer}
            </div>
        `;

    } else {

        chatBox.innerHTML += `
            <div class="bot-message">
                Sorry, I don't know the answer to that question.
            </div>
        `;
    }

    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("userInput").value = "";
}

function similarity(str1, str2){

    const words1 =
    str1.toLowerCase().split(/\s+/);

    const words2 =
    str2.toLowerCase().split(/\s+/);

    let common = 0;

    words1.forEach(word => {

        if(words2.includes(word)){
            common++;
        }

    });

    return common /
    Math.max(words1.length, words2.length);
}

document
.getElementById("userInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});
function wait(ms=0){
    return new Promise(resolve=> setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
    popup.classList.remove("open");
    await wait(1000);
    // remove the popup entirely
    popup.remove()
    popup = null;
}

function ask (options) {
    return new Promise (async function(resolve){
        // First we need to create a popup with all the fields in it
        const popup = document.createElement("form"); // this will immediately return to us the DOM node, that allows us to add event listeners
        popup.classList.add("popup");
        popup.insertAdjacentHTML("afterbegin", 
        `<fieldset>
          <label>${options.title}</label>
          <input type="text" name="input"/>
          <button type="submit">Submit</button>
        </fieldset>`)
        // Check if they want a cancle button
        if(options.cancel) {
            const skipButton = document.createElement("button");
            skipButton.type = "button";
            skipButton.textContent = "Cancel";
            console.log(popup.firstChild)
            popup.firstElementChild.appendChild(skipButton)
            // TODO: listen for a click on that cancel button
            skipButton.addEventListener("click", function(){
                resolve(null);
                destroyPopup(popup);
            }, {once: true});
        }
        // listen for the submit event on the inputs
        popup.addEventListener("submit", function(e){
            e.preventDefault();
            console.log("submitted")
            resolve(e.target.input.value);
            //remove it from the DOM entirely
            destroyPopup(popup);
            
        }, { once: true});
        // when somone does submit it, resolve the data that was in the input box
        // Insert that popup into the dom
        document.body.appendChild(popup);
        // put a very small timeout before we add the open class
        await wait(50);
        popup.classList.add('open');
    })
}


// Select all buttons that have a question
async function askQuestion(e){
    const button = e.currentTarget;
    const cancel = "cancel" in button.dataset;

    const answer = await ask({title: button.dataset.question, cancel: cancel});
    console.log(answer);
}

const buttons = document.querySelectorAll("[data-question]");
buttons.forEach(button=>{button.addEventListener("click", askQuestion)})

const questions = [
    {title: "What is your name ?"},
    {title: "What is your age?", cancel: true},
    {title: "What is your dogs name?"},
];

async function asyncMap(array, callback) {
    // Make an array to store our results
    const results = [];
    // loop over our array
    for (const item of array) {
        results.push(await callback(item));
    }
    // When we are done the loop, return it
    return results;
}

async function go(){
    const answers = await asyncMap(questions, ask);
    console.log(answers)
}
go()

// async function askMany(){
//     for(const question of questions) {
//         const answer = await ask(question);
//         console.log(answer);
//     }
// }
// askMany()
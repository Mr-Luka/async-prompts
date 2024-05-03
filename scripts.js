function wait(ms=0){
    return new Promise(resolve=> setTimeout(resolve, ms));
}

function ask (options) {
    return new Promise (async function(resolve){
        // First we need to create a popup with all the fields in it
        const popup = document.createElement("form"); // this will immediately return to us the DOM node, that allows us to add event listeners
        popup.classList.add("popup");
        popup.insertAdjacentHTML("afterbegin", 
        `
        <fieldset>
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
        }
        // listen for the submit event on the inputs

        // when somone does submit it, resolve the data that was in the input box
        // Insert that popup into the dom
        document.body.appendChild(popup);
        // put a very small timeout before we add the open class
        await wait(50);
        popup.classList.add('open');
    })
}


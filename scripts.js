function ask (options) {
    return new Promise (function(resolve){
        // First we need to create a popup with all the fields in it
        const popup = document.createElement("form"); // this will immediately return to us the DOM node, that allows us to add event listeners
        popup.classList.add("popup");
        popup.insertAdjacentHTML("afterbegin", `
        <fieldset>
          <label>${options.title}</label>
        </fieldset>`)
        // Check if they want a cancle button

        // listen for the submit event on the inputs

        // when somone does submit it, resolve the data that was in the input box
        console.log(popup)
    })
}
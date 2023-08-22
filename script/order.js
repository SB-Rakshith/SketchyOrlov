// Function to update the total amount
function updateTotalAmount() {
    // Get selected values
    const numberOfFaces = document.getElementById("numOfFaces").value;
    const artType = document.getElementById("artType").value;
    const artSize = document.getElementById("sizeOption").value;

    // Calculate total amount (customize this calculation)
    let totalAmount = 0; // Initial amount

    if (numberOfFaces === "single") {
        totalAmount += 999; // Add additional amount based on selection
    } else if (numberOfFaces === "two") {
        totalAmount += 1199; // Add additional amount based on selection
    }

    if (artType === "normal-sketch") {
        totalAmount += 0; // Add additional amount based on selection
    } else if (artType === "realistic-charcoal-sketch") {
        totalAmount += 200; // Add additional amount based on selection
    } else if (artType === "coffee-portrait-painting") {
        totalAmount += 1299; // Add additional amount based on selection
    } else if (artType === "watercolor-painting") {
        totalAmount += 999; // Add additional amount based on selection
    } else if (artType === "colorpencil-sketch") {
        totalAmount += 799; // Add additional amount based on selection
    } else if (artType === "charcoal-sketch-on-wood") {
        totalAmount += 1999; // Add additional amount based on selection
    }

    if (artSize === "8x12") {
        totalAmount += 0; // No additional cost for this size
    } else if (artSize === "12x16") {
        totalAmount += 499; // Add additional amount based on selection
    } else if (artSize === "16x24") {
        totalAmount += 999; // Add additional amount based on selection
    }

    // Update the total amount text
    document.getElementById("totalPriceValue").textContent = "\u20B9" + totalAmount;
          
    // Update the total amount text in the delivery details section
    document.getElementById("totalPriceDelivery").textContent = "\u20B9" + totalAmount;
}

// Event listeners for input fields
document.getElementById("numOfFaces").addEventListener("change", updateTotalAmount);
document.getElementById("artType").addEventListener("change", updateTotalAmount);
document.getElementById("sizeOption").addEventListener("change", updateTotalAmount);

// Call the function initially to set the default total amount
updateTotalAmount();


// Function to handle the "Pay with UPI" button click
    function payWithUPI() {
        const totalAmount = document.getElementById("totalPrice").textContent.replace("₹", "");

        // Generate the UPI payment link
        const upiPaymentLink = `upi://pay?pa=9902462472@ybl&pn=rakshithsb&am=${totalAmount}`;

        // Redirect to the UPI payment link
        window.location.href = upiPaymentLink;
    }

    // Add event listeners to form elements for updating total amount
    const formElements = document.querySelectorAll("select");
    formElements.forEach((element) => {
        element.addEventListener("change", updateTotalAmount);
    });

    // Initial calculation
    updateTotalAmount();

    // Add event listener to the "Pay with UPI" button
    document.getElementById("payWithUpi").addEventListener("click", payWithUPI);
    // Function to handle the "Pay with UPI" button click
    function payWithUPI() {
        const totalAmount = document.getElementById("totalPriceDelivery").textContent.replace("₹", "");
        const upiPaymentLink = `upi://pay?pa=poojang147-1@oksbi&pn=SketchyOrlov&am=${totalAmount}`;

        // Create an anchor element to trigger the UPI payment link
        const anchor = document.createElement("a");
        anchor.href = upiPaymentLink;
        anchor.target = "_blank"; // Open the link in a new tab
       
      // Trigger a click event on the anchor element to open the UPI payment link
        const clickEvent = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        anchor.dispatchEvent(clickEvent);
    }

    // Add event listener to the "Pay with UPI" button
    document.getElementById("payWithUpi").addEventListener("click", payWithUPI);





// submitting data to google sheet.
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var form = e.target;
    var formData = new FormData(form);

    // Create a payload with the form data
    var payload = {};
    formData.forEach(function(value, key) {
        payload[key] = value;
    });

    // Get the total price value from the paragraph element
    var totalPriceValue = document.getElementById("totalPriceValue").textContent;
    payload["totalPrice"] = totalPriceValue;

    // Send the payload to the Google Apps Script web app
    fetch("https://script.google.com/macros/s/AKfycbyVRW5rionlgCqyNyij6vjRHOt1nvrcllagmLIFBBuSmJY72dgyfSpIbotjWRsFb9pk/exec", {
        method: "POST",
        body: JSON.stringify(payload)
    })
    .then(function(response) {
        if (response.ok) {
            alert("Order Sent Succesfully!");
            form.reset();
        } else {
            alert("An error occurred. Please try again.");
        }
    })
    .catch(function(error) {
        alert("An error occurred. Please try again.");
        console.error(error);
    });
});




// Get the elements
const numOfFacesInput = document.getElementById("numOfFaces");
const artTypeInput = document.getElementById("artType");
const sizeOptionInput = document.getElementById("sizeOption");
const orientationInput = document.getElementById("orientation");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const deliveryAddressInput = document.getElementById("deliveryAddress");
const pincodeInput = document.getElementById("pincode");
const switchToDelhiveryFormButton = document.getElementById("switchToDelhiveryForm");
const switchToSketchFormButton = document.getElementById("switchToSketchForm");
const submitButton = document.getElementById("submitButton");

// Function to check if the first four inputs are filled
function areFirstFourInputsFilled() {
    return (
        numOfFacesInput.value !== "" &&
        artTypeInput.value !== "" &&
        sizeOptionInput.value !== "" &&
        orientationInput.value !== ""
    );
}

// Add an event listener to check input validity and enable/disable the button
[numOfFacesInput, artTypeInput, sizeOptionInput, orientationInput].forEach((input) => {
    input.addEventListener("change", function() {
        if (areFirstFourInputsFilled()) {
            switchToDelhiveryFormButton.removeAttribute("disabled");
        } else {
            switchToDelhiveryFormButton.setAttribute("disabled", "disabled");
        }
    });
});

// Function to check if all form fields are filled
function areAllFieldsFilled() {
    return (
        numOfFacesInput.value !== "" &&
        artTypeInput.value !== "" &&
        sizeOptionInput.value !== "" &&
        orientationInput.value !== "" &&
        fullNameInput.value !== "" &&
        emailInput.value !== "" &&
        deliveryAddressInput.value !== "" &&
        pincodeInput.value !== ""
    );
}

// Add an event listener to check field validity and enable/disable the "Submit" button
document.getElementById("orderForm").addEventListener("input", function() {
    if (areAllFieldsFilled()) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "disabled");
    }
});

// Event listeners for switching between sections
switchToDelhiveryFormButton.addEventListener("click", function() {
    // Hide Sketch Details section
    document.getElementById("sketchDetailsSection").style.display = "none";

    // Show Delhivery Details section
    document.getElementById("deliveryDetailsSection").style.display = "block";

    // Show the "Previous" button and "Submit" button
    switchToSketchFormButton.style.display = "block";
    submitButton.style.display = "block";

    // Hide the "Next" button
    this.style.display = "none";
});

switchToSketchFormButton.addEventListener("click", function() {
    // Show Sketch Details section
    document.getElementById("sketchDetailsSection").style.display = "block";

    // Hide Delhivery Details section
    document.getElementById("deliveryDetailsSection").style.display = "none";

    // Show the "Next" button
    switchToDelhiveryFormButton.style.display = "block";

    // Hide the "Previous" button and "Submit" button
    this.style.display = "none";
});


// Get the modal and the button to open it
var qrModal = document.getElementById("qrModal");
var showQrButton = document.getElementById("showQrButton");
var closeButton = document.getElementsByClassName("close")[0];

// Show the modal when the button is clicked
showQrButton.addEventListener("click", function() {
    qrModal.style.display = "block";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", function() {
    qrModal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", function(event) {
    if (event.target == qrModal) {
        qrModal.style.display = "none";
    }
});

// Function to update the total amount
function updateTotalAmount() {
    // Get selected values
    const numberOfFaces = document.getElementById("numOfFaces").value;
    const artType = document.getElementById("artType").value;
    const artSize = document.getElementById("sizeOption").value;

    // Calculate total amount (customize this calculation)
    let totalAmount = 0; // Initial amount

    if (numberOfFaces === "Single") {
        totalAmount += 999; // Add additional amount based on selection
    } else if (numberOfFaces === "Two") {
        totalAmount += 1199; // Add additional amount based on selection
    }
    else if (numberOfFaces === "Multi") {
        totalAmount += 1299; // Add additional amount based on selection
    }

    if (artType === "Realistic Charcoal Sketch") {
        totalAmount += 0; // Add additional amount based on selection
    } else if (artType === "Realistic Graphite Sketch") {
        totalAmount += 299; // Add additional amount based on selection
    } else if (artType === "Artist Choice") {
        totalAmount += 200; // Add additional amount based on selection
    } else if (artType === "Colorpencil Sketch") {
        totalAmount += 799; // Add additional amount based on selection
    } else if (artType === "Charcoal Sketch on Wood") {
        totalAmount += 1999; // Add additional amount based on selection
    }

    if (artSize === "A4   (12 x 8 inches, Delivery in 5days)") {
        totalAmount += 0; // No additional cost for this size
    } else if (artSize === "A3   (12 x 18 inches, Delivery in 10days)") {
        totalAmount += 499; // Add additional amount based on selection
    } else if (artSize === "A5   (12 x 8 inches, Delivery in 6days)") {
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

//---------------------------------------------------------------------------SUBMISSION------------------------------.
 function submitForm(formData) {
    Swal.fire({
        title: 'Please Wait',
        text: 'Submitting your order...',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
    });

    // Calculate the total price
    var totalPriceElement = document.getElementById("totalPriceDelivery");
    var totalAmount = parseFloat(totalPriceElement.textContent.replace("₹", "").trim());

    // Include the ₹ symbol and total price in the form data
    formData.append("totalPriceDelivery", "₹" + totalAmount);

    // Specify the URL for form submission
    let url = "https://script.google.com/macros/s/AKfycbzmj-R3eAZBc5JKCPTZ36Grvdsh9gCm06k8_QAHUuC3uSC4gRcMJ_gdqkpzYUpbpDk/exec";

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
             Swal.close();
             Swal.fire({
                title: 'Success',
                text: 'Order submitted successfully. You will receive a confirmation email soon with order number. ',
                icon: 'success',
                showCancelButton: false, // Hide the "Cancel" button
                allowOutsideClick: false,
                confirmButtonText: 'OK', // Change the button text to "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById("orderForm").reset(); // Reset the form
                    window.location.reload(); // Reload the webpage
                }
            });
        } else {
            Swal.close();

                    // Show an error message
                    Swal.fire({
                        title: 'Error',
                        text: 'Error submitting order. Please try again.',
                        icon: 'error',
                    });
        }
    })
    .catch(function (error) {
        Swal.close();

                // Show an error message
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred. Please try again.',
                    icon: 'error',
                });
        console.error(error);
    });
}


// Add an event listener to the form submission
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'Cancel', // Change the cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            // If the user confirms, call the handleFileUploads function
            let url = "https://script.google.com/macros/s/AKfycbzmj-R3eAZBc5JKCPTZ36Grvdsh9gCm06k8_QAHUuC3uSC4gRcMJ_gdqkpzYUpbpDk/exec";
            let form = document.querySelector("#orderForm"); // Change to #orderForm to select the form element
            handleFileUploads(url, form);
            var formData = new FormData(e.target);
            submitForm(formData);
        } else {
            // If the user cancels, do nothing or provide feedback
            Swal.fire('Cancelled', 'Your order was not submitted.', 'info' );
        }
    });
});

// Function to handle file uploads
function handleFileUploads(url, form) {
    let fileInput1 = document.querySelector("#uploadPhoto");
    let fileInput2 = document.querySelector("#uploadPaymentRecipt");

    let fr1 = new FileReader();
    let fr2 = new FileReader();

    fr1.addEventListener('loadend', () => {
        let res1 = fr1.result;
        let spt1 = res1.split("base64,")[1];

        fr2.addEventListener('loadend', () => {
            let res2 = fr2.result;
            let spt2 = res2.split("base64,")[1];

            let obj1 = {
                base64: spt1,
                type: fileInput1.files[0].type,
                name: fileInput1.files[0].name
            };

            let obj2 = {
                base64: spt2,
                type: fileInput2.files[0].type,
                name: fileInput2.files[0].name
            };

            // Combine both objects into an array
            let objs = [obj1, obj2];

            fetch(url, {
                method: "POST",
                body: JSON.stringify(objs) // Send both objects as an array
            })
            .then(r => r.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });

        fr2.readAsDataURL(fileInput2.files[0]);
    });

    fr1.readAsDataURL(fileInput1.files[0]);
}



//--------------------------------------------------------------------------------------------------------------------------




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



 

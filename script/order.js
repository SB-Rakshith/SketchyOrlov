// Function to update the total amount
function updateTotalAmount() {
    // Get selected values
    const numberOfFaces = document.getElementById("numOfFaces").value;
    const artType = document.getElementById("artType").value;
    const artSize = document.getElementById("sizeOption").value;
    const frame = document.getElementById("frame").value;
    const frameType = document.getElementById("frameType").value;


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

    if (frame === "Yes") {
    if (frameType === "Fiber") {
        totalAmount += 250; // No additional cost for this size
    } else if (artSize === "Glass") {
        totalAmount += 499; // Add additional amount based on selection
    } 
    }

    // Update the total amount text
    document.getElementById("totalPriceValue").textContent = "\u20B9" + totalAmount;
          
    // Update the total amount text in the delivery details section
    document.getElementById("totalPriceDelivery").textContent = "\u20B9" + totalAmount;

    document.getElementById("qrTotalAmount").textContent = "\u20B9" + totalAmount;
}

// Event listeners for input fields
document.getElementById("numOfFaces").addEventListener("change", updateTotalAmount);
document.getElementById("artType").addEventListener("change", updateTotalAmount);
document.getElementById("sizeOption").addEventListener("change", updateTotalAmount);

// Call the function initially to set the default total amount
updateTotalAmount();


//------------------------------------------------------------------------PAYMENT AND QR ------------------


 document.addEventListener("DOMContentLoaded", function() {
    const generateQRCodeButton = document.getElementById("showQrButton");
    const qrCodeImage = document.getElementById("qrCodeImage");
    const qrModal = document.getElementById("qrModal");
    const closeButton = document.getElementsByClassName("close")[0];

    generateQRCodeButton.addEventListener("click", function() {
        const totalAmount = document.getElementById("totalPriceDelivery").textContent.replace("₹", "");
        const upiPaymentLink = `upi://pay?pa=poojang147-1@oksbi&pn=SketchyOrlov&am=${totalAmount}`;

        // Generate the QR code image URL
        const qrCodeImageUrl = generateQRCodeImage(upiPaymentLink);

        // Set the src attribute of the QR code image
        qrCodeImage.src = qrCodeImageUrl;

        // Show the QR code image
        qrCodeImage.style.display = "block";

        // Hide the "Generate QR Code" button
        generateQRCodeButton.style.display = "none";
        qrModal.style.display = "block";
    });

    window.addEventListener("click", function(event) {
    if (event.target == qrModal) {
        qrModal.style.display = "none";
    }
    });

    closeButton.addEventListener("click", function() {
    qrModal.style.display = "none";
    generateQRCodeButton.style.display = "block"
    });


    function generateQRCodeImage(data) {
        const size = 200; // Set the size of the QR code image
        return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}`;
    }

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

    // Add event listeners to form elements for updating total amount
    const formElements = document.querySelectorAll("select");
    formElements.forEach((element) => {
        element.addEventListener("change", updateTotalAmount);
    });

    // Initial calculation
    updateTotalAmount();

    // Add event listener to the "Pay with UPI" button
    document.getElementById("payWithUpi").addEventListener("click", payWithUPI);
});


//---------------------------------------------------------------------------SUBMISSION------------------------------.


 function submitForm(formData) {
    Swal.fire({
        title: 'Please Wait',
        text: 'Submitting your order details...',
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
    let url = "https://script.google.com/macros/s/AKfycbwyvapReMHoP6VdSr-wXJaa7rXcbwBdmBqcM2OHew_TNc06PcB6U8SEa2V3HtaLeaE/exec";

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
             Swal.update({
                        title: 'Please Wait',
                        text: 'Uploading your Photos...',
                        icon: 'info',
                        showConfirmButton: false,
                        allowOutsideClick: false,
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
        title: 'Confirm the order?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Confrim it!',
        cancelButtonText: 'Cancel', // Change the cancel button text
    }).then((result) => {
        if (result.isConfirmed) {
            // If the user confirms, call the handleFileUploads function
            let url = "https://script.google.com/macros/s/AKfycbwyvapReMHoP6VdSr-wXJaa7rXcbwBdmBqcM2OHew_TNc06PcB6U8SEa2V3HtaLeaE/exec";
            let form = document.querySelector("#orderForm"); // Change to #orderForm to select the form element
            handleFileUploads(url, form);
            var formData = new FormData(e.target);
            submitForm(formData);
        } else {
            // If the user cancels, do nothing or provide feedback
            Swal.fire('Cancelled', 'Your order was not Confrimed.', 'info' );
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
            .then(data => {
                if (data === 'Both Images Uploaded') {
                    Swal.close();
                    Swal.fire({
                        title: 'Order placed successfully',
                        text: 'You will receive a confirmation email soon with an order number',
                        icon: 'success',
                        showCancelButton: false,
                        allowOutsideClick: false,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            document.getElementById("orderForm").reset();
                            window.location.reload();
                        }
                    });
                } else {
                    Swal.close();
                    Swal.fire({
                        title: 'Error',
                        text: 'Some Images Failed to Upload. Please try again (if issue persists chat with us on Whatsapp.)',
                        icon: 'error',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                Swal.close();
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred uploading the photos. Please try again.',
                    icon: 'error',
                });
            });
        });

        fr2.readAsDataURL(fileInput2.files[0]);
    });

    fr1.readAsDataURL(fileInput1.files[0]);
}

// -----------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------------------------------------------------------------

// Get the select element for frame
var frameSelect = document.getElementById("frame");

// Get the container for frame type
var frameTypeContainer = document.getElementById("frameTypeContainer");

// Add an event listener to the frame select element
frameSelect.addEventListener("change", function () {
    if (frameSelect.value === "Yes") {
        frameTypeContainer.style.display = "block";
    } else {
        frameTypeContainer.style.display = "none";
    }
});



// Get the elements
const numOfFacesInput = document.getElementById("numOfFaces");
const artTypeInput = document.getElementById("artType");
const sizeOptionInput = document.getElementById("sizeOption");
const orientationInput = document.getElementById("orientation");
const frameInput = document.getElementById("frame");
const frameTypeInput = document.getElementById("frameType"); // Add this line
const totalPriceInput = document.getElementById("totalPrice"); // Add this line
const fullNameInput = document.getElementById("fullName");
const mobileNoInput = document.getElementById("mobileNo"); // Add this line
const emailInput = document.getElementById("email");
const deliveryAddressInput = document.getElementById("deliveryAddress");
const pincodeInput = document.getElementById("pincode");
const deliveryDateInput = document.getElementById("deliveryDate");
const agreeToShowcaseInput = document.getElementById("agreeToShowcase");
const uploadPhotoInput = document.getElementById("uploadPhoto");
const uploadReceiptInput = document.getElementById("uploadReceipt");

const switchToDelhiveryFormButton = document.getElementById("switchToDelhiveryForm");
const switchToSketchFormButton = document.getElementById("switchToSketchForm");
const submitButton = document.getElementById("submitButton");


function areInputsFilled() {
    return (
        numOfFacesInput.value !== "" &&
        artTypeInput.value !== "" &&
        sizeOptionInput.value !== "" &&
        orientationInput.value !== "" &&
        frameInput.value !== "" &&
        frameTypeInput.value !== "" && // Check if frame type is filled
        fullNameInput.value !== "" &&
        mobileNoInput.value !== "" && // Check if mobile number is filled
        emailInput.value !== "" &&
        deliveryAddressInput.value !== "" &&
        pincodeInput.value !== "" &&
        deliveryDateInput.value !== "" &&
        agreeToShowcaseInput.value !== "" 
    );
}

// Function to check if the first four inputs are filled
function areFirstFiveInputsFilled() {
    return (
        numOfFacesInput.value !== "" &&
        artTypeInput.value !== "" &&
        sizeOptionInput.value !== "" &&
        orientationInput.value !== "" &&
        frameInput.value !== ""
    );
}



// Add an event listener to check input validity and enable/disable the "Next to Delivery Detail" button
[numOfFacesInput, artTypeInput, sizeOptionInput, orientationInput, frameInput].forEach((input) => {
    input.addEventListener("change", function() {
        if (areFirstFiveInputsFilled()) {
            switchToDelhiveryFormButton.removeAttribute("disabled");
        } else {
            switchToDelhiveryFormButton.setAttribute("disabled", "disabled");
        }
    });
});


// Add an event listener to check field validity and enable/disable the "Submit" button
document.getElementById("orderForm").addEventListener("input", function() {
    if (areInputsFilled()  ) {
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

//-------------------------------------------------------------------------------------slidder--------------------------/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Automatically advance the slides every 2 seconds
setInterval(function () {
  plusSlides(1); // This will move to the next slide
}, 3000); // 2000 milliseconds (2 seconds)

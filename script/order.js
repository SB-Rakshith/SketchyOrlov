// Function to update the total amount
	function updateTotalAmount() {
	    // Get selected values
	    const numberOfFaces = document.getElementById("numberOfFaces").value;
	    const artType = document.getElementById("artType").value;
	    const artSize = document.getElementById("artSize").value;

	    // Calculate total amount (customize this calculation)
	    let totalAmount = 0; // Initial amount

	    if (numberOfFaces === "single") {
	        totalAmount += 999; // Add additional amount based on selection
	    } else if (numberOfFaces === "two") {
	        totalAmount += 1499; // Add additional amount based on selection
	    }

	    if (artType === "normal-sketch") {
	        totalAmount += 499; // Add additional amount based on selection
	    } else if (artType === "realistic-charcoal-sketch") {
	        totalAmount += 999; // Add additional amount based on selection
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
	    document.getElementById("totalPrice").textContent = "\u20B9" + totalAmount;
}


	// Function to update the "Pay with UPI" button state
	function updatePaymentButtonState() {
	    const numberOfFaces = document.getElementById("numberOfFaces").value;
	    const artType = document.getElementById("artType").value;
	    const artSize = document.getElementById("artSize").value;
	    const orientation = document.getElementById("orientation").value;
	    const fullName = document.getElementById("fullName").value;
	    const mobileNumber = document.getElementById("mobileNumber").value;
	    const deliveryAddress = document.getElementById("deliveryAddress").value;
	    const uploadPhoto = document.getElementById("uploadPhoto").value;

	    // Enable the "Pay with UPI" button if the first four inputs are selected
	    const payWithUpiButton = document.getElementById("payWithUpi");
	    payWithUpiButton.disabled = !(numberOfFaces && artType && artSize && orientation && fullName && mobileNumber && deliveryAddress);
	}

	// Function to update the "Submit Order" button state
	function updateSubmitButtonState() {
	    const fullName = document.getElementById("fullName").value;
	    const mobileNumber = document.getElementById("mobileNumber").value;
	    const deliveryAddress = document.getElementById("deliveryAddress").value;
	    const uploadPhoto = document.getElementById("uploadPhoto").value;
	    const uploadPaymentScreenshot = document.getElementById("uploadPaymentScreenshot").value;

	    // Enable the "Submit Order" button if all inputs are filled
	    const submitButton = document.getElementById("submitButton");
	    submitButton.disabled = !(fullName && mobileNumber && deliveryAddress && uploadPhoto && uploadPaymentScreenshot);
	}

	// Add event listeners to the first four inputs for updating the "Pay with UPI" button state
	const firstFourInputs = ["numberOfFaces", "artType", "artSize", "orientation"];
	firstFourInputs.forEach((inputId) => {
	    document.getElementById(inputId).addEventListener("change", updatePaymentButtonState);
	});

	// Add event listeners to all inputs for updating the "Submit Order" button state
	const allInputs = ["fullName", "mobileNumber", "deliveryAddress", "uploadPhoto", "uploadPaymentScreenshot"];
	allInputs.forEach((inputId) => {
	    document.getElementById(inputId).addEventListener("input", updateSubmitButtonState);
	});

	// Initial button states
	updatePaymentButtonState();
	updateSubmitButtonState();



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
	    const totalAmount = document.getElementById("totalPrice").textContent.replace("₹", "");
	    const upiPaymentLink = `upi://pay?pa=9902462472@ybl&pn=rakshithsb&am=${totalAmount}`;

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


document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = e.target;
  var formData = new FormData(form);

  var payload = {};
  for (var pair of formData.entries()) {
    payload[pair[0]] = pair[1];
  }

  showOverlay();

  fetch(
    "https://script.google.com/macros/s/AKfycby15MuAUfU3L2vZ46TIUBKDiM4cQIbHX1tdocg9dihoW_l9LuDhlDPpjjNvGh4fYR8/exec",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
    .then(function (response) {
      hideOverlay();
      if (response.ok) {
        showAlert("orderSubmittedMessage");
        form.reset();
      } else {
        showAlert("alertError");
      }
    })
    .catch(function (error) {
      hideOverlay();
      showAlert("alertError");
      console.error(error);
    });
});

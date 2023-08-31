document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.form-box');
        const sendButton = document.getElementById('w-c-s-bgc_p-1-dm-id');
        const inputFields = form.querySelectorAll('.input');
        const messageField = document.getElementById('i5vyy-2'); // Assuming this is the message input

        // Function to check if all required fields have values (except phone number)
        function areFieldsFilled() {
            for (const inputField of inputFields) {
                if (inputField.value.trim() === '' && inputField.getAttribute('name') !== 'PhoneNumber') {
                    return false;
                }
            }
            return messageField.value.trim() !== ''; // Check if the message field is filled
        }

        // Enable the button when required fields are filled
        form.addEventListener('input', function () {
            if (areFieldsFilled()) {
                sendButton.removeAttribute('disabled');
            } else {
                sendButton.setAttribute('disabled', 'true');
            }
        });
    });
document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contact-form");
  var sendButton = document.getElementById("w-c-s-bgc_p-1-dm-id");
  var formMessage = document.getElementById("form-message");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable the send button while submitting
    sendButton.disabled = true;

    var formData = new FormData(contactForm);

    // Show "Sending..." using SweetAlert
    Swal.fire({
      title: "Sending...",
      text: "Please wait...",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    fetch("https://script.google.com/macros/s/AKfycbxXzbjBf8SvNzbDmQxIV_L4JJXT4ahoSYf_jlOO1GW5UKwdZO4Jk_R-beN9MYO2w_o/exec", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          // Success, handle your success action here.
          Swal.fire({
            title: "Submitted Successfully",
            text: "We will get back to you shortly.",
            icon: "success",
            allowOutsideClick: false,
          });

          // Reset the form
          contactForm.reset();

          // Disable the button after success
          sendButton.disabled = true;
        } else {
          // Error, handle your error action here.
          Swal.fire({
            title: "Error",
            text: "Error submitting the form. Please try again.",
            icon: "error",
          });

          // Re-enable the button on error
          sendButton.disabled = false;
        }
      })
      .catch(function (error) {
        // Handle network errors.
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "An error occurred. Please try again later.",
          icon: "error",
        });

        // Re-enable the button on error
        sendButton.disabled = false;
      });
  });
});


//--------------------------------------------------------------------------------------FAQ-------------------------------------------------------//
const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

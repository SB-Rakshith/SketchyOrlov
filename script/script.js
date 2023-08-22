$("#search-icon").click(function() {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});


// -----------------------------------header image start--------------------------------- //



// Function to convert the Google Drive URL to the desired format
function convertDriveURL(url) {
  const fileId = url.match(/\/file\/d\/(.+?)\/view/)[1];
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

// Function to fetch the image URL from Google Sheets
async function fetchImageURL() {
  const apiKey = 'AIzaSyCxMZ_L50qNssIKZhPTWhbCPQYoDkbP8Es';
  const sheetId = '1hMf8jd8vvjvzvniDNwKa3pyWiOhMsuE7tnSHjwV4d48';
  const sheetName = 'Header Image';
  let desktopCell;
  let mobileCell;

  // Check if user is in mobile screen
  if (window.innerWidth < 768) {
    // Use B column for mobile
    mobileCell = 'B2';
  } else {
    // Use A column for desktop
    desktopCell = 'A2';
  }

  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!${desktopCell || mobileCell}?key=${apiKey}`;

  try {
    const response = await fetch(sheetURL);
    const data = await response.json();
    const imageURLs = data.values[0];

    let currentImageIndex = 0;
    const section = document.getElementById('headline-section');

    // Function to update the background image
    function updateBackgroundImage() {
      // Convert the Google Drive URL to the desired format
      const convertedURL = convertDriveURL(imageURLs[currentImageIndex]);

      // Set the converted URL as the background image of the section
      section.style.backgroundImage = `url(${convertedURL})`;

      // Increment the current image index
      currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
    }

    // Update the background image initially
    updateBackgroundImage();

    // Set a timer interval to update the background image every 3 seconds
    setInterval(updateBackgroundImage, 3000);
  } catch (error) {
    console.error('Error fetching image URL:', error);
  }
}

// Call the function to fetch the image URL and set the background image
fetchImageURL();



// ----------------------------------------------Header image ends ---------------------------------------------//

// ----------------------------------------------Sketch image starts ---------------------------------------------//
// URL of your Google Sheet (replace with your sheet's ID)
const googleSheetId = "1hMf8jd8vvjvzvniDNwKa3pyWiOhMsuE7tnSHjwV4d48";

// Sheet name in your Google Sheet
const sheetName = "Sketches";

// API Key from Google Cloud Console
const apiKey = "AIzaSyCxMZ_L50qNssIKZhPTWhbCPQYoDkbP8Es";

function convertDriveURL(url) {
    // Check if the URL matches either format
    const match = url.match(/\/file\/d\/(.+?)\/view|\/d\/(.+?)\/edit/);
    
    if (match && match.length >= 2) {
        const fileId = match[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } else {
        // Return the original URL if it doesn't match the expected patterns
        return url;
    }
}


// Function to fetch data from the Google Sheet using the API
async function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetId}/values/${sheetName}!A2:A?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Extract image URLs from the API response and convert them
    const imageURLs = data.values.flat().map(convertDriveURL);

    // Display the images on the webpage
    const imageContainer = document.getElementById("image-container");
    imageURLs.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.classList.add("image");
      imageContainer.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the fetchData function to populate the webpage with converted images
fetchData();

// ----------------------------------------------Sketch image ends ---------------------------------------------//


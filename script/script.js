$("#search-icon").click(function() {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});


// ----------------------------------- Fetch Banner Img URL --------------------------------- //
async function fetchImageURLsAndUpdateImages() {
  const apiKey = 'AIzaSyCxMZ_L50qNssIKZhPTWhbCPQYoDkbP8Es';
  const sheetId = '1hMf8jd8vvjvzvniDNwKa3pyWiOhMsuE7tnSHjwV4d48';
  const sheetName = 'Header Image';

  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

 try {
    const response = await fetch(sheetURL);
    const data = await response.json();

    // Assuming your Google Sheet has a single column of image URLs
    const imageURLs = data.values.map(row => row[0]);

    // Get all the existing img elements
    const imgElements = document.querySelectorAll('#banner-slidder img');
    let loadedImageCount = 0;

    // Function to track when individual images have loaded
    function onImageLoad() {
      loadedImageCount++;

      // Check if all images have loaded
      if (loadedImageCount === imgElements.length) {
        // All images have loaded, hide the loader
        document.getElementById('loader').style.display = 'none';
        document.getElementById('banner-slidder').style.display = 'block';

      }
    }

    // Update the src attribute of each img element
    imgElements.forEach((img, index) => {
      if (index < imageURLs.length) {
        img.src = imageURLs[index];
        img.alt = 'Image'; // You can set an alt text if needed

        // Attach an onload event handler to each image
        img.onload = onImageLoad;
      }
    });
  } catch (error) {
    console.error('Error fetching image URLs:', error);
  }
}

// Call the function to fetch image URLs and update the existing images
fetchImageURLsAndUpdateImages();
// ----------------------------------------------Header image ends ---------------------------------------------//



// ----------------------------------------------Sketch Gallary starts ---------------------------------------------//
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

    // Update the src attributes of the img elements based on their class names
    for (let i = 0; i < imageURLs.length; i++) {
      const className = `image${i + 1}`;
      const imgElement = document.querySelector(`.${className} img`);
      
      if (imgElement) {
        imgElement.src = imageURLs[i];
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


// Call the fetchData function to populate the webpage with converted images
fetchData();

// ----------------------------------------------Sketch gallery ends ---------------------------------------------//

//------------------------------------------------Reviews-----------------------------------------------------------//
// Add this script to your HTML file, preferably just before the closing </body> tag



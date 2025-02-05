// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'fb0bb0146bd5dbe22fbef6296250c239'; // Your OpenWeatherMap API Key

// Event listener for Generate button
document.getElementById('generate').addEventListener('click', async () => {
  const city = document.getElementById('zip').value; // Using the zip input as the city name
  const feelings = document.getElementById('feelings').value;

  try {
    // Fetch weather data from OpenWeatherMap
    const weatherData = await getWeatherData(city);

    // Prepare the data to send to the server
    const postData = {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
      name: city,
    };

    // Send data to the server
    await postDataToServer(postData);

    // Update the UI
    await updateUI(postData, weatherData);
  } catch (error) {
    console.error('Error:', error.message);
  }
});

// Function to GET weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const url = `${baseUrl}${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

// Function to POST data to the server
async function postDataToServer(data) {
  const response = await fetch('http://localhost:3000/add', { // Corrected URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to post data');
  }

  return response.json();
}

// const controller = new AbortController();
// const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

// try {
//   const response = await fetch('http://localhost:3000/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//     signal: controller.signal,
//   });

//   clearTimeout(timeoutId);

//   if (!response.ok) {
//     throw new Error('Failed to post data');
//   }

//   return response.json();
// } catch (error) {
//   if (error.name === 'AbortError') {
//     throw new Error('Request timeout');
//   }
//   throw error;
// }

// Function to update the UI
async function updateUI() {
  try {
    // Fetch the latest data from the app endpoint
    const response = await fetch('http://localhost:3000/all');
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from the server');
    }

    const data = await response.json();
    console.log('Fetched data:', data); // Debugging line

    // Update the UI with the fetched data
    // document.getElementById('city').textContent = `City: ${data.name || 'Unknown'}`;
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('temp').textContent = `Temperature: ${data.temperature}°C`;
    // document.getElementById('weather').textContent = `Weather: ${data.weather || 'Not available'}`;
    document.getElementById('content').textContent = `Feelings: ${data.userResponse}`;
  } catch (error) {
    console.error('Error updating UI:', error.message);
  }
}


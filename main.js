
import { callApi } from './api-calls.js';
import { exportTableToCSV, exportTableToGeoJSON } from './userOutput.js'



const apiVersionSelect = document.getElementById('api-version');
const form = document.getElementById('api-form');
const resultDiv = document.getElementById('api-result');

apiVersionSelect.addEventListener('change', (event) => {
  const apiVersion = event.target.value;

  // Show the form when a valid API version is selected
  if (apiVersion) {
    form.classList.remove('d-none');
  } else {
    form.classList.add('d-none');
  }

  // Show/Hide the relevant form fields based on the API version
  document.querySelectorAll('.form-field-group').forEach((element) => {
    element.classList.add('d-none');
  });

  if (apiVersion) {
    document.querySelector(`.form-fields-${apiVersion}`).classList.remove('d-none');
  }
});

// ...
form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const apiVersion = apiVersionSelect.value;
  
    // Filter out parameters without a value
    const formData = new FormData(form);
    const filteredParams = new URLSearchParams();
    formData.forEach((value, key) => {
      if (value) {
        filteredParams.append(key, value);
      }
    });
    const params = filteredParams.toString();
  
    if (apiVersion) {
      await callApi(apiVersion, params, resultDiv);
    } else {
      alert('Please select a valid API version.');
    }
});
  
// Clear Results
const clearResultsButton = document.getElementById('clear-results');

clearResultsButton.addEventListener('click', (event) => clearResults(event));

function clearResults(event) {
  event.preventDefault();
  resultDiv.innerHTML = '';
  document.getElementById('export-to-csv').style.display = 'none';
}

// Export Results
const exportToCsvButton = document.getElementById('export-to-csv');
exportToCsvButton.addEventListener('click', () => {
    exportTableToCSV(resultDiv);
});

const exportToGeoJsonButton = document.getElementById('export-to-geojson');
exportToGeoJsonButton.addEventListener('click', () => {
    exportTableToGeoJSON(resultDiv);
});

  



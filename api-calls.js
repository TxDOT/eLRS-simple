import { buildTable } from './userOutput.js';

export async function callApi(version, params, resultDiv) {
    const baseUrl = 'https://grid-sys.us-e1.cloudhub.io/api/elrs';
    console.log(params)
    const url = `${baseUrl}${version}?${params}`;

    // Call API and display the result
    const response = await fetch(url);
    const data = await response.json();

    // Clear the resultDiv before displaying the new result
    resultDiv.innerHTML = '';
    // Create a Bootstrap-styled table from the JSON data
    const table = buildTable(data);
    // Append the table to the resultDiv
    resultDiv.appendChild(table);
    // Show export button
    document.querySelector('#api-form .btn-group').style.display = 'inline-block';


}

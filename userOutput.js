export function buildTable(jsonData) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered', 'mx-auto');
  
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
  
    // Create table headers
    for (const key in jsonData[0]) {
      const th = document.createElement('th');
      th.textContent = key;
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
  
    // Create table rows
    const tbody = document.createElement('tbody');
    jsonData.forEach((row) => {
      const tr = document.createElement('tr');
      for (const key in row) {
        const td = document.createElement('td');
        td.textContent = row[key];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
  
    // Wrap the table in a div with class "table-responsive"
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';
    tableContainer.appendChild(table);
  
    return tableContainer;
}

export function exportTableToCSV(resultDiv) {
    // First, get the table element inside the resultDiv
    const table = resultDiv.querySelector('table');
    
    // If there's no table in the resultDiv, show an alert and return
    if (!table) {
      alert('No data available to export.');
      return;
    }
  
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    // Find the index of the MSG column
    // First, get all the header cells (th elements) from the first row
    const headerCells = rows[0].querySelectorAll('th');
    // Then, find the index of the header cell that has 'MSG' as its text content
    const msgColumnIndex = [...headerCells].findIndex(cell => cell.textContent === 'MSG');
  
    // Iterate through each row in the table
    for (const row of rows) {
      const rowData = [];
      // Get all the cells (th and td elements) in the current row
      const cells = row.querySelectorAll('th, td');
      
      // Iterate through each cell in the row, with its index
      for (const [index, cell] of cells.entries()) {
        // Get the text content of the current cell
        let cellText = cell.textContent;
  
        // Check if the current cell belongs to the MSG column (compare its index with msgColumnIndex)
        if (index === msgColumnIndex) {
          // If it's an MSG cell, remove all commas from the cell text
          cellText = cellText.replace(/,/g, '');
        }
  
        // Add the cell text (with commas removed for MSG cells) to the rowData array
        rowData.push(cellText);
      }
      
      // Join the rowData array using commas as the separator, and add it to the csv array
      csv.push(rowData.join(','));
    }
    
    // Join the csv array using newlines as the separator to create the final CSV string
    const csvString = csv.join('\n');
    
    // Create a download link with the CSV data
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
    link.download = 'table_data.csv';
    // Hide the link so it doesn't appear in the page
    link.style.display = 'none';
    
    // Add the link to the document, click it to trigger the download, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportTableToGeoJSON(table) {
    const headers = Array.from(table.querySelectorAll('thead th')).map(
      (th) => th.textContent
    );
    const rows = Array.from(table.querySelectorAll('tbody tr'));
  
    const features = rows.map((row) => {
      const properties = {};
  
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, index) => {
        properties[headers[index]] = cell.textContent;
      });
  
      return {
        type: 'Feature',
        properties,
      };
    });
  
    const geoJson = {
      type: 'FeatureCollection',
      features,
    };
  
    const geoJsonString = JSON.stringify(geoJson);
  
    const link = document.createElement('a');
    link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(geoJsonString);
    link.download = 'table_data.geojson';
    link.style.display = 'none';
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  
  
  
  
  
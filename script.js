document.addEventListener("DOMContentLoaded", function () {
  const companyNames = document.querySelectorAll("._section_86jzd_146 > div");

  const data = [];
  companyNames.forEach((name, number) => {
    const tags = name.querySelectorAll("._tagLink_86jzd_1023");
    const tagsArray = [];
    tags.forEach((tag) => {
      tagsArray.push(tag.innerText);
    });
    data.push({
      number: number + 1,
      logo: name.querySelector("img").src,
      description: name.querySelector("._coDescription_86jzd_478").innerText,
      name: name.querySelector("._coName_86jzd_453").innerText,
      location: name.querySelector("._coLocation_86jzd_469").innerText,
      tags: tagsArray.join(","),
      link: name
        .querySelector("a")
        .href.replace("http://[::]:8000/", "https://www.ycombinator.com/"),
    });
  });

  console.table(data);

  // Function to convert data to CSV
  function exportToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }

  // Trigger CSV download
  function downloadCSV(data) {
    const csvData = exportToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Call the download function
  downloadCSV(data);
});

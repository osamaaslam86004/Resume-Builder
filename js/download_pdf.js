
// Enable Users To Download Resume In Pdf Format
document.getElementById('download-pdf').addEventListener('click', () => {

    // Select the container with the resume content
    const element = document.getElementById('container');
    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
});

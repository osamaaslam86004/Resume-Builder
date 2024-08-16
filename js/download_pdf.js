
// Enable Users To Download Resume In Pdf Format
document.getElementById('download-pdf').addEventListener('click', () => {
    const element = document.querySelector('.container'); // Select the container with the resume content

    var opt = {
        margin: [10, 10, 10, 10], // top, left, bottom, right (in mm)
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 8, logging: true, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().from(document.querySelector('.container')).set(opt).save();



    html2pdf().from(element).set(options).save();
});

// Include jsPDF library in the script
(function() {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js';
    script.onload = extractUrlsAndGeneratePDF;
    document.head.appendChild(script);
})();

function extractUrlsAndGeneratePDF() {
    const { jsPDF } = window.jspdf;
    
    // Define a regular expression pattern to match the specific URL structure
    let pattern = /https:\/\/cdn\.okccdn\.com\/php\/load_okc_image\.php\/images\/225x225\/225x225\/\d+x\d+\/\d+x\d+\/2\/\d+\.jpeg/g;

    // Get the entire HTML content of the page
    let htmlContent = document.documentElement.innerHTML;

    // Find all matching URLs
    let matchingUrls = htmlContent.match(pattern) || [];

    // Remove duplicates, if any
    matchingUrls = [...new Set(matchingUrls)];

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add URLs to the PDF
    let lineHeight = 10;
    matchingUrls.forEach((url, index) => {
        if (index !== 0 && index % 25 === 0) {
            doc.addPage();
            lineHeight = 10;
        }
        doc.text(url, 10, lineHeight);
        lineHeight += 10;
    });

    // Save the PDF
    doc.save('okcdLikes.pdf');
}

let scanner = null;
let cameraPermissionGranted = false;

document.getElementById('btnScanBarcode').addEventListener('click', () => {
    if (scanner && scanner.isScanning()) {
        // Scanner is already active, do nothing
        return;
    }
    
    const scannerContainer = document.getElementById('scanner-container');
    scannerContainer.style.display = 'block';
    
    // Initialize scanner with back camera only
    scanner = new Html5QrcodeScanner('scanner-container', { 
        fps: 10,
        qrbox: 250,
        rememberLastUsedCamera: false, // Always use back camera
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    });

    // Start scanning with back camera
    const cameraConfig = {
        facingMode: "environment" // Force back camera
    };

    scanner.render(
        (barcode) => {
            // Success callback
            document.getElementById('etBarcode').value = barcode;
            stopScanner();
            fetchProductData(barcode);
        },
        (error) => {
            // Error callback
            console.error(error);
        },
        cameraConfig
    );
});

// Add a stop button to your scanner container in HTML
function stopScanner() {
    if (scanner) {
        scanner.clear().then(() => {
            document.getElementById('scanner-container').style.display = 'none';
            scanner = null; // Fully reset the scanner
        }).catch(err => {
            console.error("Failed to clear scanner", err);
        });
    }
}

// Add this to your HTML (inside scanner-container div)
<div id="scanner-container" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:black; z-index:1000;">
    <button onclick="stopScanner()" style="position:absolute; top:20px; right:20px; z-index:1001; background:red; color:white; border:none; padding:10px; border-radius:5px;">
        Stop Scanning
    </button>
    <div id="scanner"></div>
</div>
// Initialize scanner
let scanner;

// Scan Button Click
document.getElementById('btnScanBarcode').addEventListener('click', () => {
    const scannerContainer = document.getElementById('scanner-container');
    scannerContainer.style.display = 'block';
    
    scanner = new Html5QrcodeScanner('scanner-container', { 
        fps: 10,
        qrbox: 250 
    });

    scanner.render((barcode) => {
        document.getElementById('etBarcode').value = barcode;
        scannerContainer.style.display = 'none';
        fetchProductData(barcode);
    });
});

// Mock Data Fetch (Replace with your SQL Server API)
function fetchProductData(barcode) {
    // Example response structure - replace with your actual API call
    const mockData = {
        supplier: "Supplier Name",
        description: "Product Description",
        category: "Product Category",
        cost: "$10.00",
        profit: "$5.00",
        price: "$15.00",
        quantity: "5.00"
    };

    // Update first company section
    document.getElementById('tvSupplier').textContent = mockData.supplier;
    document.getElementById('tvDescription').textContent = mockData.description;
    document.getElementById('tvCategory').textContent = mockData.category;
    document.getElementById('tvCost').textContent = mockData.cost;
    document.getElementById('tvProfit').textContent = mockData.profit;
    document.getElementById('tvPrice').textContent = mockData.price;
    document.getElementById('tvQty').textContent = mockData.quantity;

    // Update second company section (with different mock data)
    document.getElementById('tvSupplier2').textContent = "Second Location Data";
    document.getElementById('tvDescription2').textContent = mockData.description;
    document.getElementById('tvCategory2').textContent = mockData.category;
    document.getElementById('tvCost2').textContent = "$12.00";
    document.getElementById('tvProfit2').textContent = "$3.00";
    document.getElementById('tvPrice2').textContent = "$15.00";
    document.getElementById('tvQty2').textContent = "3.50";
}

// Input Handling
document.getElementById('etBarcode').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchProductData(e.target.value);
    }
});

document.getElementById('etReference').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Handle reference input if needed
    }
});
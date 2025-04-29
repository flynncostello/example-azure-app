document.addEventListener('DOMContentLoaded', function() {
    const fetchBtn = document.getElementById('fetchBtn');
    const resultDiv = document.getElementById('result');
    
    fetchBtn.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/hello');
            const data = await response.json();
            
            resultDiv.textContent = data.message;
            resultDiv.style.display = 'block';
        } catch (error) {
            resultDiv.textContent = 'Error fetching data: ' + error.message;
            resultDiv.style.display = 'block';
        }
    });
});
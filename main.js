function generateInputs() {
        const numberOfInputs = document.getElementById('numberOfInputs').value;
        const form = document.getElementById('inputForm');
        form.innerHTML = ''; 
        // Clear previous inputs

        for (let i = 0; i < numberOfInputs; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';

            const itemName = document.createElement('input');
            itemName.type = 'text';
            itemName.name = 'itemName' + (i + 1);
            itemName.placeholder = 'Item ' + (i + 1) + ' Name';
            inputGroup.appendChild(itemName);

            const itemPrice = document.createElement('select');
            itemPrice.name = 'itemPrice' + (i + 1);
            for (let price = 100; price <= 10000; price += 100) {
                const option = document.createElement('option');
                option.value = price;
                option.text = price;
                itemPrice.appendChild(option);
            }
            inputGroup.appendChild(itemPrice);

            const itemQuantity = document.createElement('select');
            itemQuantity.name = 'itemQuantity' + (i + 1);
            for (let quantity = 1; quantity <= 100; quantity++) {
                const option = document.createElement('option');
                option.value = quantity;
                option.text = quantity;
                itemQuantity.appendChild(option);
            }
            inputGroup.appendChild(itemQuantity);

            form.appendChild(inputGroup);
        }
    }

    function calculateTotal() {
        const numberOfInputs = document.getElementById('numberOfInputs').value;
        let total = 0;
        let summaryHtml = '<h3>Summary of Items</h3><ul>';
        let tableHtml = '<table><thead><tr><th>S/N</th><th>Item</th><th>Quantity</th><th>Price</th><th>Total Amount</th></tr></thead><tbody>';

        for (let i = 0; i < numberOfInputs; i++) {
            const name = document.getElementsByName('itemName' + (i + 1))[0].value;
            const price = parseFloat(document.getElementsByName('itemPrice' + (i + 1))[0].value) || 0;
            const quantity = parseInt(document.getElementsByName('itemQuantity' + (i + 1))[0].value) || 0;

            if (!name || price <= 0 || quantity <= 0) {
                alert('Please make sure all fields are selected and valid.');
                return;
            }

            const totalPrice = price * quantity;
            total += totalPrice;

            tableHtml += `<tr><td>${i + 1}</td><td>${name}</td><td>${quantity}</td><td>#${price.toFixed(2)}</td><td>#${totalPrice.toFixed(2)}</td></tr>`;
            summaryHtml += `<li>${name}: #${price.toFixed(2)} x ${quantity} = #${totalPrice.toFixed(2)}</li>`;
        }

        tableHtml += `<tr><td colspan="4" style="text-align: right;"><strong>Total Amount:</strong></td><td><strong>#${total.toFixed(2)}</strong></td></tr>`;
        tableHtml += '</tbody></table>';
        summaryHtml += '</ul>';
        document.getElementById('summaryTable').innerHTML = tableHtml;
        document.getElementById('summary').innerHTML = summaryHtml;
    }

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add summary to the PDF
        const summaryHtml = document.getElementById('summary').innerText;
        doc.setFontSize(16);
        doc.text('Summary of Items', 10, 10); // Title
        doc.setFontSize(12);
        doc.text(summaryHtml, 10, 20); // Summary

        // Convert table HTML to an array of rows and columns
        const tableHtml = document.getElementById('summaryTable').innerHTML;
        const table = document.createElement('div');
        table.innerHTML = tableHtml;
        const rows = [];
        const headers = ['S/N', 'Item', 'Quantity', 'Price', 'Total Amount'];

        table.querySelectorAll('tbody tr').forEach((tr) => {
            const cells = tr.querySelectorAll('td');
            const row = [];
            cells.forEach(cell => row.push(cell.innerText));
            rows.push(row);
        });

        // Calculate the starting Y position for the table
        const summaryHeight = doc.getTextDimensions(summaryHtml).h;
        const startY = 30 + summaryHeight + 10; // Adjust start position with spacing

        // Add the table with spacing from summary
        doc.autoTable({
            head: [headers],
            body: rows,
            startY: startY, // Start table below the summary
            margin: { top: 10 }
        });

        // Add footer text
        const pageHeight = doc.internal.pageSize.height;
        const footerText = 'Powered by Awatech Digital World';
        doc.setFontSize(10);
        doc.text(footerText, 10, pageHeight - 10);

        // Save the PDF
        doc.save('summary.pdf');
    }

    window.onload = generateInputs;
    
    
    // splash screen
    let about=document.getElementById("about").innerHTML=`ShopEase is a versatile and Customer-friendly web application designed to simplify shopping management. With its intuitive interface, customers can easily select the number of items they want to purchase and input their details. The application dynamically generates input fields based on customer selection, allowing them to specify item names, prices, and quantities.`;
    //.onclick window to cancel splash screen 
    window.onclick=(e)=>{
    let spalsh=document.getElementById("splash");
    if (e.target ===splash) {
        splash.style.display="none";
    }
   }
   // countdown for spash screen
   let num=4;
   let interval=setInterval(()=>{
       num --;
       if(num ===0){
        clearInterval(interval);
       document.getElementById("splash").style.display="none";
       }
   },1000)
   
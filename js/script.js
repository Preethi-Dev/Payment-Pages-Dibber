const primary = document.querySelector(".fee-details__primary");
const secondary = document.querySelector(".fee-details__secondary");

const fetchFeesData = async () => {
  const data = await fetch("./data/db.json");
  const json = await data.json();
  return json;
};

//fetch and store the fees data
fetchFeesData()
  .then((data) => {
    console.log(data);
    const productLineItems = data.fees.ProductLineItems;
    const netPrice = productLineItems.reduce((total, item) => {
      const price = Number(item.NetPrice.slice(1));
      return total + price;
    }, 0);
    const tableRows = productLineItems
      .map(
        (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.Category}</td>
            <td>${item.CategoryType}</td>
            <td>${item.CategorySubtype}</td>
            <td>${item.Product}</td>
            <td>${item.Quantity}</td>
            <td>${item.NetPrice}</td>
        </tr>`
      )
      .join("");
    primary.innerHTML = `
    <div class="data-container">
        <p class="data"><span>Parent Name:</span> <span>${data.fees.CustomerName}</span></p>
        <p class="data"><span>Academic Year:</span> <span>${data.fees.AcademicYear}</span></p>
        <p class="data"><span>Dibber Unit Name:</span> <span>${data.fees.BusinessUnitName}</span></p>
        <p class="data"><span>Payment Plan:</span> <span>${data.fees.PaymentPlan}</span></p>
        <p class="data"><span>Receiver Name:</span> <span>${data.fees.LegalEntityName}</span></p>
        <p class="data"><span>Total Payable:</span> <span>${data.fees.TotalInvoiceValue}</span></p>
        <p class="data"><span>Child ID:</span> <span>${data.fees.ChildId}</span></p>
    </div>`;

    secondary.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Sl no</th>
                <th>Category</th>
                <th>Category Type</th>
                <th>Category Subtype</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Net Price</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
            <tr>
                <td colspan="6" style="text-align: center;">Total Inclusive GST</td>
                <td>₹${netPrice}</td>
            </tr>
        </tbody>
    </table>
    `;
  })
  .catch((e) => {
    console.log(e.message);
  });

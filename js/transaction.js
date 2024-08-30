const container = document.querySelector(".transaction-container");

const fetchTransactionInfo = async () => {
  const response = await fetch("./data/transaction.json");
  const data = await response.json();
  //tweak the status code for rendering different components
  return { ...data, status: 200 };
};

//return the promise
fetchTransactionInfo().then((data) => {
  let heading;
  let status_IMG;
  if (data.status === 200) {
    heading = "Transaction Successful";
    status_IMG = "./assets/images/successful.svg";
  } else if (data.status === 400) {
    heading = "Transaction Failed";
    status_IMG = "./assets/images/failed.svg";
  } else {
    heading = "Transaction Pending";
    status_IMG = "./assets/images/pending.svg";
  }

  container.innerHTML += `
    <h1>${heading}</h1>
    <div><img src="${status_IMG}" alt="illustrate the payment status" /></div>
    <div class="data-container">
        <div class="data">
            <span>Transaction ID: </span>
            <span>${data.transaction.transactionId}</span>
        </div>
        <div class="data">
            <span>Authorisation status: </span>
            <span>${data.transaction.authorizationStatus}</span>
        </div>
        <div class="data">
            <span>Transaction made on: </span>
            <span>${data.transaction.transactionDate}</span>
        </div>
        <div class="data">
            <span>Payment type: </span>
            <span>${data.transaction.paymentType}</span>
        </div>
        <div class="data">
            <span>Bank ref no.: </span>
            <span>${data.status ? data.transaction.bankRefNo : "------"}</span>
        </div>
    </div>
    `;
});

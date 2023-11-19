import { useState } from "react";
//import myDB from "../db/myMongoDB.js";

export function MainSc() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Handle form submission logic
    const formData = new FormData(event.target);
    const formObject = {
      account_number: formData.get("account_number"),
      balance: formData.get("balance"),
      currency: formData.get("currency"),
      opening_date: formData.get("opening_date"),
      last_transaction_date: formData.get("last_transaction_date"),
      interest_rate: formData.get("interest_rate"),
      account_type: formData.get("account_type"),
      credit_limit: formData.get("credit_limit"),
      is_active: formData.get("is_active"),
      expenses: formData.get("expenses"),
      earnings: formData.get("earnings"),
      ownerId: "replace_with_owner_id",
    };
    try {
      // Send form data to the server
      const response = await fetch("/api/bankAccs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      console.log("Response status:", response.status);
      console.log("Response body:", await response.json());
      if (response.ok) {
        console.log("Form data successfully submitted to the server");
        event.target.reset();
        setShowForm(false);
      } else {
        console.error("Failed to submit form data to the server");
        // Handle error scenario
      }
    } catch (error) {
      console.error("An error occurred while submitting form data", error);
    } finally {
      setLoading(false);
    }
  };
  const handleButtonClick = () => {
    setShowForm(true);
  };
  return (
    <>
      <button onClick={handleButtonClick} disabled={loading}>
        Create a new Bank account Info
      </button>
      {showForm && (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="account_number">Account Number:</label>
              <input
                type="text"
                id="account_number"
                name="account_number"
                required
              />
            </div>
            <div>
              <label htmlFor="balance">Balance:</label>
              <input type="text" id="balance" name="balance" required />
            </div>
            <div>
              <label htmlFor="currency">Currency:</label>
              <input type="text" id="currency" name="currency" required />
            </div>
            <div>
              <label htmlFor="opening_date">Opening Date:</label>
              <input
                type="text"
                id="opening_date"
                name="opening_date"
                required
              />
            </div>
            <div>
              <label htmlFor="last_transaction_date">
                Last Transaction Date:
              </label>
              <input
                type="text"
                id="last_transaction_date"
                name="last_transaction_date"
                required
              />
            </div>
            <div>
              <label htmlFor="interest_rate">Interest Rate:</label>
              <input
                type="text"
                id="interest_rate"
                name="interest_rate"
                required
              />
            </div>
            <div>
              <label htmlFor="account_type">Account Type:</label>
              <input
                type="text"
                id="account_type"
                name="account_type"
                required
              />
            </div>
            <div>
              <label htmlFor="credit_limit">Credit Limit:</label>
              <input
                type="text"
                id="credit_limit"
                name="credit_limit"
                required
              />
            </div>
            <div>
              <label htmlFor="is_active">Is Active:</label>
              <input type="text" id="is_active" name="is_active" required />
            </div>
            <div>
              <label htmlFor="expenses">Expenses:</label>
              <input type="text" id="expenses" name="expenses" required />
            </div>
            <div>
              <label htmlFor="earnings">Earnings:</label>
              <input type="text" id="earnings" name="earnings" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}

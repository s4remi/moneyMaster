// EditPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    account_number: "",
    balance: "",
    currency: "",
    opening_date: "",
    last_transaction_date: "",
    interest_rate: "",
    account_type: "",
    credit_limit: "",
    is_active: "",
    expenses: "",
    earnings: "",
  });

  useEffect(() => {
    // Fetch the bank object with the provided ID
    const fetchBankObject = async () => {
      try {
        const response = await fetch(`/api/bankAccs/${id}`);
        if (response.ok) {
          const bankObject = await response.json();
          // Set the form data with the fetched bank object
          setFormData({ ...bankObject });
        } else {
          console.error(`Error fetching bank object with ID ${id}.`);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching bank object data",
          error
        );
      }
    };

    fetchBankObject();
  }, [id]);

  const handleCancel = () => {
    console.log("Cancel button clicked");
    navigate("/");
  };

  const handleSave = async () => {
    console.log("Save button clicked");

    // Example: Update the bank object on the server
    try {
      const response = await fetch(`/api/bankAccs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(`Bank object with ID ${id} updated successfully.`);
        navigate("/");
      } else {
        console.error(`Error updating bank object with ID ${id}.`);
      }
    } catch (error) {
      console.error("An error occurred while updating bank object data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <h2>Edit Bank Account</h2>

      <form>
        <div>
          <label htmlFor="account_number">Account Number:</label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            value={formData.account_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="balance">Balance:</label>
          <input
            type="text"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="opening_date">opening_date:</label>
          <input
            type="text"
            id="opening_date"
            name="opening_date"
            value={formData.opening_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_transaction_date">last_transaction_date:</label>
          <input
            type="text"
            id="last_transaction_date"
            name="last_transaction_date"
            value={formData.last_transaction_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="interest_rate">interest_rate:</label>
          <input
            type="text"
            id="interest_rate"
            name="interest_rate"
            value={formData.interest_rate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="account_type">account_type:</label>
          <input
            type="text"
            id="account_type"
            name="account_type"
            value={formData.account_type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="credit_limit">credit_limit:</label>
          <input
            type="text"
            id="credit_limit"
            name="credit_limit"
            value={formData.credit_limit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="is_active">is_active:</label>
          <input
            type="text"
            id="is_active"
            name="is_active"
            value={formData.is_active}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expenses">expenses:</label>
          <input
            type="text"
            id="expenses"
            name="expenses"
            value={formData.expenses}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="earnings">earnings:</label>
          <input
            type="text"
            id="earnings"
            name="earnings"
            value={formData.earnings}
            onChange={handleInputChange}
            required
          />
        </div>
      </form>

      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

export default EditPage;

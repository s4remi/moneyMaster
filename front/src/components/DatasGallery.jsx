import PropTypes from "prop-types";
import "./DatasGallery.css";

export function DatasGallery({ datas, showButtons = false, onEdit, onDelete }) {
  console.log("👏🏻 Render DatasGallery datas=", datas);

  function renderDatas() {
    function renderData(data) {
      return (
        <div className="col-4" key={data._id}>
          <div>Account number:{data.account_number} </div>
          <div>Balance: {data.balance}</div>
          <div>Currency: {data.currency}</div>
          <div>Opening date: {data.opening_date}</div>
          <div>Last transaction date: {data.last_transaction_date}</div>
          <div>Interest rate: {data.interest_rate}</div>
          <div>Account type: {data.account_type}</div>
          <div>Credit limit: {data.credit_limit}</div>
          <div>Active: {data.is_active}</div>
          <div>Expenses: {data.expenses}</div>
          <div>Earnings: {data.earnings}</div>
          {showButtons && (
            <div>
              <button onClick={() => onEdit(data._id)}>Edit</button>
              <button onClick={() => onDelete(data._id)}>Delete</button>
            </div>
          )}
          <hr />
        </div>
      );
    }

    return datas.map(renderData);
  }

  return <div className="row">{renderDatas()}</div>;
}

DatasGallery.propTypes = {
  datas: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      account_number: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      opening_date: PropTypes.string.isRequired,
      last_transaction_date: PropTypes.string.isRequired,
      interest_rate: PropTypes.string.isRequired,
      account_type: PropTypes.string.isRequired,
      credit_limit: PropTypes.string.isRequired,
      is_active: PropTypes.string.isRequired,
      expenses: PropTypes.string.isRequired,
      earnings: PropTypes.string.isRequired,
    })
  ),
  showButtons: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

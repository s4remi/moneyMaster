import PropTypes from "prop-types";

export function DatasGallery({ datas }) {
  console.log("👏🏻 Render DatasGallery datas=", datas);

  function renderDatas() {
    function renderData(data) {
      return (
        <div className="col-4" key={data._id}>
          <div>account_number:{data.account_number} </div>
          <div>balance: {data.balance}</div>
          <div>currency: {data.currency}</div>
          <div>opening_date: {data.opening_date}</div>
          <div>last_transaction_date: {data.last_transaction_date}</div>
          <div>interest_rate: {data.interest_rate}</div>
          <div>account_type: {data.account_type}</div>
          <div>credit_limit: {data.credit_limit}</div>
          <div>is_active: {data.is_active}</div>
          <div>expenses: {data.expenses}</div>
          <div>earnings: {data.earnings}</div>
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
};

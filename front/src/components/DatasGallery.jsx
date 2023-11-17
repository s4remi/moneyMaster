import PropTypes from "prop-types";

export function DatasGallery({ datas }) {
  console.log("👏🏻 Render DataGallery datas=", datas);

  function renderDatas() {
    function renderData(data) {
      return (
        <div className="col-4" key={data._id}>
          <div>{data.account_holder}</div>
          <div>{data.account_number} </div>
          <div>{data.balance}</div>
          <div>{data.currency}</div>
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
      account_holder: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ),
};

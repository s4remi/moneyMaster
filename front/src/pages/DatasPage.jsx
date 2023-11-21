import { useContext } from "react";
//import { ButtonVote } from "../components/ButtonVote";
import { useState, useEffect } from "react";
import { DatasGallery } from "../components/DatasGallery";
//import { RangeWidth } from "../components/RangeWidth";
import { SearchBar } from "../components/SearchBar";
import BasePage from "./BasePage";
import { ErrorContext } from "../main";
import { useGetUser } from "../hooks/useGetUser";
import { MainSc } from "../components/MainSc";
import { useNavigate } from "react-router-dom";

export default function DatasPage() {
  const { setError } = useContext(ErrorContext);
  const { user } = useGetUser();
  const [query, setQuery] = useState("");
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  // setup an effect that fetches data exactly once (empty array as secondary argument)
  useEffect(() => {
    async function fetchDatas() {
      console.log("⭐️Fecthing Datas...");
      const response = await fetch(`/api/datas?query=${query}`);
      if (!response.ok) {
        console.log("Error fetching datas", response);
        setDatas([]);
        setError({ msg: "Error fetching datas", type: "danger" });
        return;
      }
      const _datas = await response.json();

      console.log("🤙🏼 Got Datas", _datas);

      setDatas(_datas.datas);
      setError({ msg: "", type: "" });
    }

    fetchDatas();
  }, [user, query, setError]);

  const handleDelete = async (id) => {
    console.log(`delete clicked for data with id ${id}`);
    try {
      const response = await fetch(`/api/bankAccs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedDatas = datas.filter((data) => data._id !== id);
        setDatas(updatedDatas);
        console.log(`Bank account with ID ${id} deleted successfully.`);
      } else {
        console.error(`Error deleting bank account with ID ${id}.`);
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the bank account.",
        error
      );
    }
  };

  const handleEdit = async (id) => {
    console.log(`Edit clicked for data with id ${id}`);
    navigate(`/edit/${id}`);
  };
  return (
    <BasePage>
      <h1>MoneyMaster Application</h1>

      {user ? (
        <>
          {/* <RangeWidth /> */}
          <MainSc />
          <SearchBar query={query} setQuery={setQuery} />
          <DatasGallery
            datas={datas
              // .filter((d) => d.caption.includes(query))// front end filtering
              .slice(0, 20)}
            showButtons={query !== ""}
            onEdit={handleEdit}
            onDelete={handleDelete}
          ></DatasGallery>

          {/* <ButtonVote name="Biden" /> */}
          {/* <ButtonVote name="Trump" /> */}
        </>
      ) : (
        <div>Not logged in</div>
      )}
    </BasePage>
  );
}

/*
// Implement delete logic using the id in front not in the back
    console.log(`Delete clicked for data with id ${id}`);
    const dataIndex = datas.findIndex((data) => data._id === id);
    if (dataIndex !== -1) {
      // Create a copy of the datas array
      const updatedDatas = [...datas];

      // Remove the data at the found index
      updatedDatas.splice(dataIndex, 1);

      // Update the state with the modified datas array
      setDatas(updatedDatas);
    }
*/

/*
editing the data in place
const handleEdit = async (id) => {
    console.log(`Edit clicked for data with id ${id}`);
    try {
      const response = await fetch(`/api/bankAccs/${id}`, {
        method: "PUT",
      });
      if (response.ok) {
        const data = await response.json();
        setEditData(data);
        console.log(`Editing bank account with ID ${id}`);
      } else {
        console.error(
          `Error fetching details for editing bank account with ID ${id}.`
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching details for editing the bank account.",
        error
      );
    }
  };
*/

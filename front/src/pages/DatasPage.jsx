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

export default function DatasPage() {
  const { setError } = useContext(ErrorContext);

  const { user } = useGetUser();

  const [query, setQuery] = useState("");
  const [datas, setDatas] = useState([]);

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

  const handleEdit = (id) => {
    // Implement edit logic using the id
    console.log(`Edit clicked for data with id ${id}`);
  };
  const handleDelete = (id) => {
    // Implement delete logic using the id
    console.log(`Delete clicked for data with id ${id}`);
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

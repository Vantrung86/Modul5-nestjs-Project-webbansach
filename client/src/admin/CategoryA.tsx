import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import publicAxios from "../config/publicAxios";
// import tokenAxios from '../config/privateAxios'
import { success } from "../Until/Until";

export type Cate = {
  categoryId?: number;
  categoryName: string;
};
export default function CategoryA() {
  const [catergorys, serCatergory] = useState<Array<Cate>>([]);
  const [cate, setCate] = useState<Cate>({ categoryName: "" });
  const [flag, setFlag] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  //lay catergory
  const getByCatergory = async () => {
    try {
      let response = await publicAxios.get("/api/v1/category");
      serCatergory(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getByCatergory();
  }, [flag]);
  //them catergory
  const handleAddCatergory = async () => {
    try {
      let response = await publicAxios.post("/api/v1/category", cate);
      success(response.data);
      setFlag(!flag);
      setCate({ categoryName: "" });
    } catch (error) {
      console.log(error);
    }
  };
  //xoa
  const handleDeleteCatergory = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xoá?")) {
      try {
        let response = await publicAxios.delete(`/api/v1/category/${id}`);
        success(response.data);
        setFlag(!flag);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //Edit
  const handleEditCatergory = (item: Cate) => {
    setCate(item);
    setCheck(true);
  };
  //Update
  const handleUpdateCatergory = async () => {
    try {
      let response = await publicAxios.patch(
        `api/v1/category/${cate.categoryId}`,
        cate
      );
      success(response.data);
      setFlag(!flag);
      setCheck(false);
      setCate({ categoryName: "" });
    } catch (error) {
      console.log(error);
    }
  };
  //search
  const handleSearchCatergory = async () => {
    try {
        if (search != "") {
            let response = await publicAxios.get(`/api/v1/category/search?key=${search}`);
            if (response.data.length > 0) {
                serCatergory(response.data);
            }else{
                success("Không tìm thấy")
            }  
            setSearch("");
        }else{
            getByCatergory()
        }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div>
      <AdminHeader />
      <Sildebar />
      <main className="main-container">
        <div className="main-title" style={{marginTop:"65px"}}>
          <h3>Quản lý danh mục</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nhập danh mục"
            value={cate.categoryName}
            onChange={(e) => setCate({ ...cate, categoryName: e.target.value })}
            style={{
              padding: "3px 7px",
              width: "50%",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "3px 7px",
              borderRadius: "5px",
              backgroundColor: "rgb(35, 36, 37)",
              color:"white"
            }}
            onClick={check ? handleUpdateCatergory : handleAddCatergory}
          >
            {check ? "Update" : "Add"}
          </button>
        </div>
        <div style={{marginTop:"-19px"}}>
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={search}
            style={{
              padding: "3px 7px",
              width: "50%",  
              outline: "none",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={{
              padding: "3px 7px",
              borderRadius: "5px",
              backgroundColor: "rgb(35, 36, 37)",
              color:"white"
            }}
            onClick={handleSearchCatergory}
          >
            Search
          </button>
        </div>
        <div>
          <table className="table_product">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Thể loại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {catergorys.map((item: Cate, index) => (
                <tr key={index}>
                  <td style={{padding:"12px 0"}}>{index + 1}</td>
                  <td>{item.categoryName}</td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        borderRadius: "4px",
                        marginRight:"5px",
                        padding:"3px 5px"
                      }}
                      onClick={() => handleEditCatergory(item)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      style={{
                        border: "none",
                        borderRadius: "4px",
                        marginLeft:"5px",
                        padding:"3px 5px"
                      }}
                      onClick={() =>
                        handleDeleteCatergory(Number(item.categoryId))
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

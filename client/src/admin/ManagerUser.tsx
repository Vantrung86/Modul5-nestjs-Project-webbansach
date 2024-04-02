import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";
import publicAxios from "../config/publicAxios";
import { success } from "../Until/Until";
function ManagerUser() {
  const [users, setUsers] = useState([]);
  const [check,setCheck] = useState(false)
  const loadUsers = async () => {
      try {
        let response = await publicAxios.get("/api/v1/user");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    loadUsers();
  },[check]);

  const handleBlock = async (item:any) => {
    try {
      let response = await publicAxios.patch(`/api/v1/user/${item.userId}`,item)
      success(response.data);
      setCheck(!check)
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
          <h3>Quản lý tài khoản</h3>
        </div>
        <div className="section_user_search" style={{position:"relative"}}>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            style={{width:"50%",padding:"3px 7px",outline:"none"}}/>
          <i className="fas fa-search icon_search_user" style={{position:"absolute",right:"257px",top:"30px",cursor:"pointer"}}></i>
        </div>
        <div >
          <table className="table_product">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((element:any) => element.role === 0)
                .map((element:any, index) => (
                  <tr key={index}>
                    <td style={{padding: "10px 0"}}>{index + 1}</td>
                    <td>{element.userName}</td>
                    <td>{element.phone}</td>
                    <td>{element.email}</td>
                    <td>{element.address}</td>
                    <td>
                      <i
                        style={{cursor:"pointer"}}
                        className={`fa-solid ${
                          element.status === 0 ? "fa-unlock" : "fa-lock"
                        } status_user`}
                        onClick={() => handleBlock(element)}
                      ></i>
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

export default ManagerUser;

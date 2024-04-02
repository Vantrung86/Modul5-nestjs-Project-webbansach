import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  // BsFillGrid3X3GapFill,
  BsPeopleFill,
  // BsListCheck,
  BsBoxArrowLeft,
} from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

function Sildebar() {
  // gọi từ local người dùng về.
  JSON.parse(localStorage.getItem("userLogin") || "[]");
  const navigate = useNavigate();
  // logout
  const handleLogOut = () => {
    if (window.confirm("Bạn có chắc chắn muốn logout")) {
      localStorage.removeItem("userLogin");
      navigate("/login");
    }
  };

  return (
    <aside id="sidebar" className={"sidebar-responsive"}>
      <div className="sidebar-title">
        <div className="sidebar-brand">NOBITA</div>
        {/* <span className="icon close_icon">X</span> */}
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to={"/admin"}>
            <BsFillArchiveFill className="icon" /> <span>Manager Product</span>
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to={"/manager-user"}>
            <BsPeopleFill className="icon" /> Manager User
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to={"/list-order"}>
            <BsCart3 className="icon" /> List Order
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <NavLink to={"/categoryA"}>
            <BsGrid1X2Fill className="icon" /> Category    
          </NavLink>
        </li>

        <li className="sidebar-list-item">
          <div className="logOut" onClick={handleLogOut}>
            <BsBoxArrowLeft className="icon" /> Logout
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default Sildebar;

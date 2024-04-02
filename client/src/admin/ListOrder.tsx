import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import Sildebar from "./Sildebar";
import "../admin/AdminCSS.css";

import Modal from 'react-bootstrap/Modal';

import {VND, success} from "../Until/Until"
import publicAxios from "../config/publicAxios"
import { Pagination } from "antd";
export default function ListOrder() {
  const [flag,setFlag] = useState(false)
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    try {
      const response = await publicAxios.get("/api/v1/order")
      setOrders(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [flag]);

  //Access
  const handleAccess = async (id:number) => {
    try {
      if (window.confirm("Bạn có muốn duyệt đơn ?")) {
        const response = await publicAxios.patch(`/api/v1/order/access/${id}`)
        success(response.data)
        setFlag(!flag) 
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Cancel
  const handleCancel = async (id:number) => {
    try {
      if (window.confirm("Bạn có muốn huỷ đơn ?")) {
        await publicAxios.patch(`/api/v1/order-detail/${id}`)
        const response = await publicAxios.patch(`/api/v1/order/${id}`)
        success(response.data)
        setFlag(!flag) 
      }
    } catch (error) {
      console.log(error);
    }
  };

  //111111111
  const [cart,setCart] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (id:number) =>{ 
    setShow(true);
    try {
      const response = await publicAxios.get(`/api/v1/order-detail/${id}`)
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = orders.slice(startIndex, endIndex);
  const onPageChange = (page:number) => {
    setCurrentPage(page);
  };

  return (
    <div>
    <AdminHeader />
    <Sildebar />
    <main className="main-container" >
      <div className="main-title" style={{marginTop:"65px"}}>
        <h3>Quản lý đơn hàng</h3>
      </div>
      <div>
        <table className="table_product" style={{marginTop:"15px"}}>
          <thead>
            <tr>
                <th>STT</th>
                <th>Acount</th>
                <th>Total</th>
                <th>Day Order</th>
                <th>Status</th>
                <th>Cart</th>
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((item:any,index)=>(
                <tr key={index}>
                    <td>{(currentPage-1)*itemsPerPage+index+1}</td>
                    <td>{item.nameOrder}</td>
                    <td>{VND.format(item.totalOrderPay)}</td>
                    <td>{item.dayOrder}</td>
                    <td>{item.status}</td>
                    <td>
                      <p style={{textDecoration:"underline", color:"blue", cursor:"pointer", paddingTop:"20px"}} onClick={()=>handleShow(item.orderId)}>Xem chi tiết</p>
                    </td>
                    <td>
                        {item.status == "Đang chờ" ? (<button onClick={()=>handleAccess(item.orderId)} style={{padding:"3px 7px",backgroundColor:"rgb(35, 36, 37)",color:"white",border:"none",borderRadius:"5px"}} className="btn_common btn_edit">Duyệt</button>) : ""}
                        {item.status == "Đang chờ" ? (<button onClick={()=>handleCancel(item.orderId)} style={{padding:"3px 7px",backgroundColor:"rgb(35, 36, 37)",color:"white",border:"none",borderRadius:"5px"}} className="btn_common btn_delete">Huỷ</button>) : ""}                 
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
           {/* Phân trang */}
              <Pagination
                  className="mt-4 mb-4 text-center"
                  current={currentPage}
                  onChange={onPageChange}
                  pageSize={itemsPerPage}
                  total={orders.length}
                />
          {/* Kết thúc phân trang */}

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sản phẩm đã mua:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table style={{width:"100%",textAlign:"center"}}>
                <thead>
                    <tr>
                        <th style={{border:"1px solid black"}}>STT</th>
                        <th style={{border:"1px solid black"}}>Ảnh</th>
                        <th style={{border:"1px solid black"}}>Tên sản phẩm</th>
                        <th style={{border:"1px solid black"}}>Giá</th>
                        <th style={{border:"1px solid black"}}>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                {cart?.map((item:any,index)=>(
                    <tr key={index}>
                        <td style={{border:"1px solid black"}}>{index+1}</td>
                        <td style={{border:"1px solid black"}}><img style={{width:"100px",height:"100px",objectFit:"cover"}} src={item.product.src}/></td>
                        <td style={{border:"1px solid black"}}>{item.product.productName}</td>
                        <td style={{border:"1px solid black"}}>{VND.format(item.product.price)}</td>
                        <td style={{border:"1px solid black"}}>{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Modal.Body>
      </Modal>
      </div>
    </main>
  </div>
  )
}

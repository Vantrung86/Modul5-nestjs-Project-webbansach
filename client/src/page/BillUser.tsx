import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

import Modal from 'react-bootstrap/Modal';

import {VND, success} from "../Until/Until"
import publicAxios from '../config/publicAxios';
import { Pagination } from 'antd';
export default function BillUser() {
    const [flag,setFlag] = useState<boolean>(false)
    const [cart,setCart] = useState([])
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = async (id:number) =>{ 
        setShow(true)
        try {
            const response = await publicAxios.get(`/api/v1/order-detail/${id}`)
            setCart(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    // gọi từ local lấy user người dùng đang hoạt động.
    const userLogin = JSON.parse(localStorage.getItem("userLogin") || "[]");
    // Kiểm tra người dùng đã đăng nhập chưa
    const userId = userLogin ? userLogin.userId : null;
    const [bill,setBill] = useState([]);
    const handleLoadBill = async () =>{
        let result = await publicAxios.get(`/api/v1/order/${userId}`);
        setBill(result.data)
    };
    useEffect(()=>{
        handleLoadBill()
    },[flag]);

    const handleCancel= async (id:number)=>{
        if (window.confirm("Bạn có muốn huỷ đơn ?")) { 
            try {
               
                await publicAxios.patch(`/api/v1/order-detail/${id}`)
                 
                const response = await publicAxios.patch(`/api/v1/order/${id}`)
                success(response.data)
                setFlag(!flag) 
            } catch (error) {
                console.log(error);
            }     
        }
    }
    //Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = bill.slice(startIndex, endIndex);
    const onPageChange = (page:number) => {
        setCurrentPage(page);
    };
  return (
    <div>
        <Header/>
        <div style={{width:"80%", margin:"0 auto", marginTop:"20px"}}>
            <table style={{width:"100%",textAlign:"center"}}>
                <thead>
                    <tr>
                        <th style={{border:"1px solid black"}}>STT</th>
                        <th style={{border:"1px solid black"}}>Thông tin người nhận</th>
                        <th style={{border:"1px solid black"}}>Ngày mua</th>
                        <th style={{border:"1px solid black"}}>Tổng tiền</th>
                        <th style={{border:"1px solid black"}}>Trạng thái</th>
                        <th style={{border:"1px solid black"}}>Giỏ Hàng</th>
                        <th style={{border:"1px solid black"}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                {displayedProducts?.map((item:any,index:number)=>(
                    <tr key={index}>
                        <td style={{border:"1px solid black"}}>{index+1}</td>
                        <td style={{border:"1px solid black"}}>
                                <p>Tên: {item.name}</p>
                                <p>Địa chỉ: {item.address}</p>
                                <p>SĐT: {item.SDT}</p>
                        </td>
                        <td style={{border:"1px solid black"}}>{item.dayOrder}</td>
                        <td style={{border:"1px solid black"}}>{VND.format(item.totalOrderPay)}</td>
                        <td style={{border:"1px solid black"}}>{item.status}</td>
                        <td style={{border:"1px solid black"}} >
                            <p style={{textDecoration:"underline", color:"blue", cursor:"pointer"}} onClick={()=>handleShow(item.orderId)}>Xem chi tiết</p>
                        </td>
                        <td style={{border:"1px solid black"}}>{item.status == "Đang chờ" ? (<button style={{padding:"5px 8px",borderRadius:"5px",border:"none",backgroundColor:"red",color:"white",cursor:"pointer"}} onClick={()=>handleCancel(item.orderId)}>Huỷ</button>) : ""}</td>
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
                      total={bill.length}
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
                {cart?.map((item:any,index:number)=>(
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
        <Footer/>
    </div>
  )
}

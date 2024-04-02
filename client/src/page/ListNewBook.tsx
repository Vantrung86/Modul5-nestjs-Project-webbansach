import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/ListNewBook.css";

import { Pagination } from "antd";
import {VND} from "../Until/Until"

import { Link } from "react-router-dom";
import publicAxios from "../config/publicAxios";

function ListNewBook() {
  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };
  //lay dl  
  const [datas, setDatas] = useState([]);
  const getData = async ()=>{
    try {
      let response = await publicAxios.get("/api/v1/product");
      let res = response.data.filter((e:any)=>e.categories.categoryId == 1)
      setDatas(res)
    } catch (error) {   
      console.log(error);
    }
  }
  useEffect(() => {
    getData()
    onUpdate()
  }, []);

  //Phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = datas.slice(startIndex, endIndex);
  const onPageChange = (page:any) => {
    setCurrentPage(page);
  };

  //Sort
const [checkSort,setCheckSort] = useState(false)
const handleSort = (sort:string) => {
  if (sort == "1") {
    let result = datas.sort((a:any,b:any)=>a.price - b.price)
    setDatas(result)
  }else if(sort == "2"){
    let result = datas.sort((a:any,b:any)=>-a.price + b.price)
    setDatas(result)
  }else{
    getData()
  }
  setCheckSort(!checkSort)
}


  return (
    <div>
      <Header />
      <div className="container">
        <div className="title_category">
          <div className="category_lists">
            <i className="fa-solid fa-bars"></i>
            <span>DANH MỤC SẢN PHẨM</span>
          </div>
          <div className="phone_list">
            <i className="fa-solid fa-phone"></i>
            <span className="hotline">Hotline:</span>
            <span> 0938 424 289</span>
          </div>
          <div className="carosel_title_item">
            <ul>
              <li className="carosel_left_outstanding">Nổi Bật</li>
              <li>Truyện Tranh - Comic</li>
              <li>văn học nước ngoài</li>
              <li>Sale cuối năm 2022</li>
              <li>Sách Văn Học</li>
              <li>Truyện Tranh BL</li>
              <li>Sách Kĩ Năng Sống</li>
              <li>Light Novel</li>
              <li>Sách Thiếu Nhi</li>
              <li>Văn Phòng Phẩm - Quà Tặng</li>
              <li>Công ty phát hành</li>
            </ul>
          </div>
        </div>
        <div className="path">
          <p>
            Nobita.vn - Nhà Sách Trên Mạng /<span> Sách mới</span>
          </p>
        </div>

        <div className="newbook-title">
          <h4>Sách Mới</h4>
          <div className="arrange">
            <p>
              Xem theo:
              <span>
                <select onChange={(e) => handleSort(e.target.value)}>
                  <option>Sắp xếp theo</option>
                  <option value="1">Giá thấp đến cao</option>
                  <option value="2">Giá cao đến thấp</option>
                </select>
              </span>
            </p>
          </div>
        </div>

        <div className="listnewbook-section">
          {displayedProducts
            .map((element:any) => (
              <div className="listnewbook_decoration" key={element.productId}>
                <Link to={`/bookdetail/${element.productId}`}>
                  <img src={element.src} alt="" />
                  <p className="listnewbook-name">{element.productName}</p>
                  <p className="listnewbook-author">{element.author}</p>
                  <p className="listnewbook_price">
                    {VND.format(element.price)}
                  </p>
                </Link>
              </div>
            ))}
        </div>


        {/* Phân trang */}
        <Pagination
                      className="mt-4 mb-4 text-center"
                      current={currentPage}
                      onChange={onPageChange}
                      pageSize={itemsPerPage}
                      total={datas.length}
                    />

        {/* Kết thúc phân trang */}
        <hr />
      </div>
      <Footer />
    </div>
  );
}

export default ListNewBook;

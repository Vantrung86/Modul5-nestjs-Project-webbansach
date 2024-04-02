import { useEffect, useState } from "react";
import "../css/NewBook.css";
import { Link } from "react-router-dom";

import {VND} from "../../Until/Until"
import publicAxios from "../../config/publicAxios";

function BookSeller() {
  const [datas, setDatas] = useState([]);
  const getData = async ()=>{
    try {
      let response = await publicAxios.get("/api/v1/product");
      setDatas(response.data)
    } catch (error) {   
      console.log(error);
    }
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <div className="container">
      <div className="newbook_main">
        <div className="newbook_title">
          <p className="event_endow_detail">
            <div className="rectangle_detail"></div>
            <h4>Sách Bán Chạy</h4>
          </p>

          <Link to={"/list-seller-book"} className="newbook_all">
            Xem tất cả <i className="fa-solid fa-angles-right" />
          </Link>
        </div>

        <div className="newbook-section">
          {datas
            .filter((element:any) => element.categories.categoryId == 2)
            .slice(-5)
            .map((element:any) => (
              <div className="newbook_decoration" key={element.productId}>
                <Link to={`/bookdetail/${element.productId}`}>
                  <img src={element.src} alt="" />
                  <p className="newbook-name">{element.productName}</p>
                  <p className="newbook-author">{element.author}</p>
                  <p className="newbook_price">
                    {VND.format(element.price)}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookSeller;

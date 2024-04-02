import { useEffect, useState } from "react";
import "../components/css/BookDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Rate } from 'antd';

import {VND, failed, success} from "../Until/Until"
import publicAxios from "../config/publicAxios";
import { dateFormat } from "../Until/date";
function BookDetail() {
  const [flag,setFlag] = useState<boolean>(false)

  const navigate = useNavigate();
  // Cuộn lên đầu trang
  const onUpdate = () => {
    window.scrollTo(0, 0);
  };
  
  // gọi từ local lấy user người dùng đang hoạt động.
  const userLogin = JSON.parse(localStorage.getItem("userLogin") || "[]");
  

  // gọi API lấy sản phẩm theo id
  type Obj={
    productId:number,
    productName:string,
    src: string,
    price: number,
    author: string,
    categories:any,
    stock:number
  }
  const [product, setProduct] = useState<Obj>({
    productId:0,
    productName:"",
    src:"",
    price:0,
    author:"",
    categories:"",
    stock:0
  });
  const { id } = useParams();
  const loadBook = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/product/${id}`)
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    onUpdate();
    loadBook();
    getComment()
  }, [id,flag]);

  //Add to Cart
  const addToCart = async (item:Obj)=>{
    if (userLogin.length===0) {
      failed("Đăng nhập để mua hàng");
      navigate("/login");
      return
    }
    try {
      let response = await publicAxios.post(`/api/v1/cart/${userLogin.userId}`,item)
      success(response.data);
      navigate("/cart")
    } catch (error) {
      console.log(error);
    }
  }

  // Bạn có thể quan tâm
  const [datas, setDatas] = useState([]);
  const loadBookCare = async () => {
    try {
      let response = await publicAxios.get("/api/v1/product");
      let res = response.data.filter((e:Obj)=>e.categories.categoryId == product.categories.categoryId)
      setDatas(res)
    } catch (error) {   
      console.log(error);
    }
  };
  useEffect(()=>{
    loadBookCare()
  },[product])

  // Binh luan danh gia
  const [value,setValue] = useState(0)
  const [commentProduct,setCommentProduct] = useState([])
  const [inputComment,setInputComment] = useState("")
  //lay comment
  const getComment = async() =>{
    try {
      const response = await publicAxios.get(`/api/v1/comment/${id}`)
      setCommentProduct(response.data);  
    } catch (error) {
      console.log(error);
    }
  }

  //them comment
  const handleComment=async(e:any)=>{
      e.preventDefault()
      if (inputComment !== "") {
        try {
          if (userLogin.length !== 0) {
            const newComment={
              comment:inputComment,
              rating:value,
              date:dateFormat(),
              userId:+userLogin.userId,
              productId:+product.productId
            }
            const response = await publicAxios.post("/api/v1/comment",newComment)
            success(response.data);
            setFlag(!flag)
            setInputComment("");
            setValue(0);
          }else{
            failed("Vui lòng đăng nhập");
            navigate("/login");
            return
          }
        } catch (error) {
          console.log(error);
        }
  
      }
  }

  let avgRate = Math.ceil((commentProduct.reduce((a:number,b:any)=>{return a+b.rating},0))/(commentProduct.length))

  return (
    <div>
      <Header />
      <div className="container container-infor">
        <h3>Thông tin sản phẩm </h3>
        <hr />
        <div className="row">
          <div className="col-3">
            <img src={product.src} alt="" />
          </div>
          <div className="col-9">
            <h5>{product.productName}</h5>
            <p>Tác Giả: {product.author}</p>
            <p>Phát Hành: Công ty cổ phần ZGroup</p>
            {product.stock == 0 ? "" : <p>Còn: {product.stock} quyển</p>}
            <h4 className="price">
              Giá:
              <span>
                {VND.format(Number(product.price))}
              </span>
            </h4>
            {product.stock == 0 ? <button className="btn-infor">Hết hàng</button> : <button className="btn-infor" onClick={()=>addToCart(product)}>
              Mua Ngay
            </button> }
            <div>
              <p>
                <i className="fa-solid fa-check"></i>Bọc Plastic theo yêu cầu
              </p>
              <p>
                <i className="fa-solid fa-check"></i>
                Giao hàng miễn phí trong nội thành TP. HCM với đơn hàng ≥
                200.000 đ Giao hàng miễn phí toàn quốc với đơn hàng ≥ 350.000 đ
              </p>
            </div>
          </div>
        </div>

        <div className="commnent">
          <div className="duongvien"><span className="comment_length">{commentProduct.length}</span></div>
          <p className="danhgia">Đánh giá khách hàng</p>
          <p><Rate value={avgRate}/></p>
        </div>
  
        <div>
          <div className="comments container">
            <div className="review_form field_form">
              <h5>Đánh giá bình luận</h5>
              <form className="row mt-3">
                <div className="error-message-comment" />
                <div className="form-group col-12 mb-3">
                  <textarea
                    // required="required"
                    placeholder="Hãy là người bình luận đầu tiên.... "
                    className="form-control"
                    name="message"
                    value={inputComment}
                    onChange={(e) => setInputComment(e.target.value)}
                  />
                </div>
                <p><Rate value={value} onChange={(value:number)=>setValue(value)}/></p>      
                <div className="form-group col-12 mb-3">
                  <button
                    type="submit"
                    className="btn btn-fill-out btn-comment-product"
                    name="submit"
                    onClick={handleComment}
                  >
                    Đăng
                  </button>
                </div>
              </form>
            </div>
            <ul className="list_none comment_list mt-4 comment_list_product">
              {commentProduct.map((element:any, index) => (
                <li key={index} className="commentli">
                  <div className="comment_img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIaE2CzhO1vNQTxBuTSKxtENpIldyOvMkTLw&usqp=CAU" alt="" />
                  </div>

                  <div className="content_comment">
                    <p className="customer_meta">
                      <span className="review_author">{element.userId.userName}</span>
                      <span className="comment-date">{element.date}</span>
                    </p>
                    <div>
                      <p>
                        {element.comment}
                        <Rate value={element.rating} style={{marginLeft:"10px"}}/>
                      </p>
            
                    </div>

                    <div className="handlelike">
                      <span><i className="fa-regular fa-thumbs-up"></i></span>
                      <span><i className="fa-regular fa-thumbs-down"></i></span>
                      <span className="feedback">Phản hồi</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
                      {/* Có thể bạn quan tâm */}
        <h5 className="care_about">Có Thể Bạn Quan Tâm</h5>
        <hr />
        <div className="bonnus_detail">
            {datas
                .slice(-10)
                .map((element:Obj) => (
                  <div className="newbook_decoration" key={element.productId}>
                    <Link to={`/bookdetail/${element.productId}`}>
                      <img
                        src={element.src}
                        alt=""
                      />
                      <p className="newbook-name">
                        {element.productName}
                      </p>
                      <p className="newbook-author">{element.author}</p>
                      <p className="newbook_price">
                      {VND.format(element.price)}
                      </p>
                    </Link>
                </div>
            ))}
        </div>
                    {/* Hết có thể bạn quan tâm */}
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default BookDetail;

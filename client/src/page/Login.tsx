import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../components/css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { failed, success } from "../Until/Until";
import { useFormik } from "formik";
import * as Yup from "yup";
import publicAxios from "../config/publicAxios";
    //Dang nhap bang google
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
    //
function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      // email: Yup.string()
      //   .email("email chưa đúng định dạng")
      //   .required("Vui lòng điền đầy đủ thông tin"),
      // password: Yup.string()
      //   .min(8, "Nhập nhiều hơn 8 kí tự")
      //   .matches(
      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
      //     "Password phải chứa ít nhất một chữ hoa, số, kí tự đặc biệt và không có khoảng trắng "
      //   )
      //   .required("Vui lòng điền đầy đủ thông tin"),
    }),

    onSubmit: async (values) => {
      try {
        let response = await publicAxios.post(`/api/v1/auth/sign-in`, values);
        if (response.data.data.role !== 0) {
          setTimeout(()=>{
            navigate("/admin")
          },2000)
        } else {
          if (response.data.data.status !== 0) {
            success("Tài khoản của bạn đang bị khoá");
            return;
          }
          setTimeout(()=>{
            navigate("/")
          },2000)
        }
        success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userLogin", JSON.stringify(response.data.data));
      } catch (error: any) {
        failed(error.response.data.message);
      }
    },
  });
          //dang nhap google
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () =>
    signInWithPopup(auth, provider)
      .then(async(result) => {
        const user = result.user;
        const newUser = {
          email: user.email,
          password: "Trung123@"
        }
        let response = await publicAxios.post(`/api/v1/auth/sign-in`, newUser);
        if (response.data.data.status !== 0) {
          success("Tài khoản của bạn đang bị khoá");
          return;
        }
        setTimeout(()=>{
          navigate("/")
        },2000)
        success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userLogin", JSON.stringify(response.data.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
    
  return (
    <div>
      <Header />
      <section className="container">
        <div className="container-main">
          <h3>ĐĂNG NHẬP</h3>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="register_error">{formik.errors.email}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="content" />
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="register_error_password">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn">
              ĐĂNG NHẬP
            </button>
          </form>
          <button className="btn" style={{marginTop:"5px"}} onClick={handleGoogleSignIn}>Đăng nhập google</button>
          <div className="forget_pass">
            <p>Quên mật khẩu?</p>
            <Link to="/register" className="link">
              Đăng kí tại đây
            </Link>
          </div>
        </div>
        <hr />
      </section>
      <Footer />
    </div>
  );
}

export default Login;

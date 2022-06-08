import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { initUser, setAuth } from "../../redux/reducers/authReducer";
import { AuthService } from "../../services/AuthService";
import Notiflix from "notiflix";

const LoginRoute = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let location = useLocation() as any;

    let from = location.state?.from?.pathname || "/";

    const onSubmit = (data: any) => {
        setLoading(true);
        AuthService.login(data)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                dispatch(setAuth(response.data));
                setLoading(false);
                Notiflix.Notify.success("Login Success");
                navigate(from, { replace: true });
            })
            .catch((err) => {
                console.log(err);
                Notiflix.Notify.failure(err + "");
                setLoading(false);
            });
    };

    return (
        <div className="row">
            <div
                className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                style={{ background: "url('./assets/images/login-bg.jpg')" }}
            ></div>
            <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
                <div className="card shadow-none border-0 ml-auto mr-auto login-card">
                    <div className="card-body rounded-0 text-left">
                        <h2 className="fw-700 display1-size display2-md-size mb-3">
                            Login into <br />
                            your account
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group icon-input mb-3">
                                <i className="font-sm ti-email text-grey-500 pr-0"></i>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                                    placeholder="Your Email Address"
                                />
                            </div>
                            <div className="form-group icon-input mb-1">
                                <input
                                    {...register("password", { required: true })}
                                    type="Password"
                                    className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                                    placeholder="Password"
                                />
                                <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                            </div>
                            <div className="form-check text-left mb-3">
                                <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
                                <label className="form-check-label font-xsss text-grey-500" htmlFor="exampleCheck1">
                                    Remember me
                                </label>
                                <a href="forgot.html" className="fw-600 font-xsss text-grey-700 mt-1 float-right">
                                    Forgot your Password?
                                </a>
                            </div>
                            <div className="col-sm-12 p-0 text-left">
                                <div className="form-group mb-1">
                                    <button
                                        type="submit"
                                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                                        disabled={loading}
                                    >
                                        Login
                                        {loading && (
                                            <span
                                                className="spinner-border spinner-border-sm ml-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        )}
                                    </button>
                                </div>
                                <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                    Dont have account{" "}
                                    <Link to="/register" className="fw-700 ml-1">
                                        Register
                                    </Link>
                                </h6>
                            </div>
                        </form>

                        <div className="col-sm-12 p-0 text-center mt-2">
                            <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                                Or, Sign in with your social account{" "}
                            </h6>
                            <div className="form-group mb-1">
                                <a
                                    href="#"
                                    className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
                                >
                                    <img src="./assets/images/icon-1.png" alt="icon" className="ml-2 w40 mb-1 mr-5" />{" "}
                                    Sign in with Google
                                </a>
                            </div>
                            <div className="form-group mb-1">
                                <a
                                    href="#"
                                    className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                                >
                                    <img src="./assets/images/icon-3.png" alt="icon" className="ml-2 w40 mb-1 mr-5" />{" "}
                                    Sign in with Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRoute;

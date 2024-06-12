import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import '../../index.css'
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

export default function Login() {
    let [errorMsg, setErrorMsg] = useState("");
    let [loading, isLoading] = useState(false);
    let [firstName, setFirstName] = useState(false);
    let [role, setRole] = useState(false);
    let navigate = useNavigate();


    async function submit(values) {
        let ip = '192.168.2.10';
        isLoading(true);
        let { data } = await axios
            .post(`http://${ip}:6789/login`, values)
            .catch((err) => {
                console.log(err.response.data.message);
                setErrorMsg(err.response.data.message);
                isLoading(false);
            });


        if (data.message == "success") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.user.userName);
            localStorage.setItem("role", data.user.role);
            navigate('/home')
            isLoading(false);
        }

    }

    let validate = Yup.object({
        userName: Yup.string().required("إسم المستخدم مطلوب"),
        password: Yup.string().required("كلمة المرور مطلوبة"),
    });
    let formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
        },
        validationSchema: validate,
        onSubmit: submit,
    });
    return (
        <>
            <div className=" W-100 center full-height loginBg">
                <div className="w-25 text-center">
                    <form className="marginForm" onSubmit={formik.handleSubmit}>
                        <input
                            className="w-75 my-4 loginBrdr"
                            type="userName"
                            id="userName"
                            name="userName"
                            placeholder="User Name"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.errors.userName && formik.touched.userName ? (
                            <div className="alert alert-danger p-2 my-2">
                                {formik.errors.userName}
                            </div>
                        ) : (
                            ""
                        )} */}
                        <input
                            className="w-75 mb-4 loginBrdr"
                            placeholder="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.errors.password && formik.touched.password ? (
                            <div className="alert alert-danger p-2 my-2">
                                {formik.errors.password}
                            </div>
                        ) : (
                            ""
                        )} */}
                        {!loading ? (
                            <button
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                                className="mt-2 w-75  my-1  text-white sub-button"
                            >
                                LOGIN
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={!(formik.isValid && formik.dirty)}
                                className="mt-2 d-block mx-auto border-0 btn text-white my-1 bg-main"
                            >
                                <Audio
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="audio-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="wrapper-class"
                                    visible={true}
                                />
                            </button>
                        )}
                    </form>
                    {errorMsg ? <div className="alert bg-white w-75 mt-5 mx-auto alert-danger">{errorMsg}</div> : ""}

                </div>

            </div>
        </>
    );
}

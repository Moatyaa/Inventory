import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from "react-query";
import "../../index.css"
import { Field, useFormik } from 'formik';
import { Modal } from 'antd';
import { date } from 'yup';


export default function () {
    let [dataa, setData] = useState('')
    const [modal2Open, setModal2Open] = useState(false);
    function getItems() {
        const token = localStorage.getItem("token");
        let ip = "192.168.2.10"
        return axios.get(`http://${ip}:6789/item`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    async function deleteitem(id) {
        try {
            const token = localStorage.getItem("token");
            const ip = '192.168.2.10';
            await axios.delete(`http://${ip}:6789/item/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
            setData(dataa);
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    }

    let { isLoading, data } = useQuery("getItems", getItems);
    console.log(data?.data)


    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",
            serialNumber: 'fgf',
            description: ''
        },

        onSubmit: addItem
    });

    async function addItem(values) {
        console.log(values)
        try {
            const token = localStorage.getItem("token");
            const ip = '192.168.2.10';
            const response = await axios.post(`http://192.168.2.10:6789/item`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
            console.log("User added successfully:", response.data);
            // Update data without reloading page
        } catch (error) {
            console.error("Error adding user:", error.message);
        }
    }
    return (
        <div className='container'>
            <Modal
                title=""
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                className='direction fontFamily'
            >
                <form className='mt-4' onSubmit={formik.handleSubmit}>
                    <label className='fw' htmlFor="name">إسم الصنف</label>
                    <input
                        className="form-control mb-3"
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div className="alert alert-danger p-2 my-2">
                            {formik.errors.name}
                        </div>
                    ) : (
                        ""
                    )}
                    <label className='fw' htmlFor="quantity">الكمية</label>
                    <input
                        className="form-control mb-3"
                        type="number"
                        id="quantity"
                        name="quantity"

                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.quantity && formik.touched.quantity ? (
                        <div className="alert alert-danger p-2 my-2">
                            {formik.errors.quantity}
                        </div>
                    ) : (
                        ""
                    )}
                    <label className='fw' htmlFor="description">وصف المعده </label>
                    <input
                        className="form-control mb-3"
                        type="text"
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.description && formik.touched.description ? (
                        <div className="alert alert-danger p-2 my-2">
                            {formik.errors.description}
                        </div>
                    ) : (
                        ""
                    )}
                    <label className='fw' htmlFor="date">تاريخ التسجيل</label>
                    <input
                        className="form-control mb-3"
                        type="date"
                        id="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.date && formik.touched.date ? (
                        <div className="alert alert-danger p-2 my-2">
                            {formik.errors.date}
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="ant-modal-footer show mt-4">
                        <button type="button" onClick={() => { setModal2Open(false) }} className="ant-btn sub-button text-white fw css-dev-only-do-not-override-1xg9z9n ant-btn-default">
                            <span>إلغاء</span>
                        </button>
                        <button type="submit" onClick={() => { setModal2Open(false) }} className="fontFamily sub-button fw text-white ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary">
                            <span>إضافه</span>
                        </button>
                    </div>
                </form>
            </Modal>
            <div className='row direction m-5'>
                {data?.data.map((el, index) =>
                    <div className="col-md-4" key={index}>
                        <img src="" alt="" />
                        <div className="title">
                            <div className='d-flex'>
                                <h2>إسم الصنف :{el.name}</h2>
                                <i onClick={() => { deleteitem(el.id) }} className="fa-solid center mx-3 fa-trash text-sec cursor-pointer"></i>
                            </div>
                            <p>{el.descripition}</p>
                            <p>الكمية: {el.quantity}</p>
                            <p>تاريخ دخول المخزن :{`${new Date(el.createdAt).getMonth() + 1}/${new Date(el.createdAt).getDate()}/${new Date(el.createdAt).getFullYear()}`}</p>
                        </div>
                    </div>
                )}
                <div className="col-md-4 center">
                    <div onClick={() => setModal2Open(true)} className="addItem">
                        +
                    </div>
                </div>
            </div>
        </div>
    )
}

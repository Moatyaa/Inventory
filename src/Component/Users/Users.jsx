
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Field, useFormik } from 'formik';
import { Modal } from 'antd';

export default function Users() {
    const [dataa, setData] = useState([]);
    const [depDataa, setdepDataa] = useState([]);
    const [modal2Open, setModal2Open] = useState(false);

    async function getUsers() {
        try {
            const token = localStorage.getItem("token");
            const ip = '192.168.2.10';
            const response = await axios.get(`http://${ip}:6789/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    }

    async function deleteUser(id) {
        try {
            const token = localStorage.getItem("token");
            const ip = '192.168.2.10';
            await axios.delete(`http://${ip}:6789/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update data without reloading page
            setData(dataa.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
    }

    async function addUser(values) {
        try {
            const token = localStorage.getItem("token");
            const ip = '192.168.2.5';
            const response = await axios.post(`http://${ip}:5678/register`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("User added successfully:", response.data);
            // Update data without reloading page
            getUsers();
        } catch (error) {
            console.error("Error adding user:", error.message);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            role: "",
            departmentId: 0
        },
        onSubmit: addUser
    });

    return <>
        {/* <div className='d-flex justify-content-end cursor-pointer'><i onClick={() => setModal2Open(true)} className="fa-solid fa-user-plus btn"></i></div>
        <Modal
            title=""
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
            className='direction fontFamily'
        >
            <form className='mt-4' onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">الإسم الأول</label>
                <input
                    className="form-control mb-3"
                    type="firstName"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.firstName}
                    </div>
                ) : (
                    ""
                )}
                <label htmlFor="lastName">الإسم الثاني</label>
                <input
                    className="form-control mb-3"
                    type="lastName"
                    id="lastName"
                    name="lastName"

                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.lastName}
                    </div>
                ) : (
                    ""
                )}
                <label htmlFor="userName">إسم المستخدم</label>
                <input
                    className="form-control mb-3"
                    type="text"
                    id="userName"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.userName && formik.touched.userName ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.userName}
                    </div>
                ) : (
                    ""
                )}
                <label htmlFor="password">كلمة المرور</label>
                <input
                    className="form-control mb-3"
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.password}
                    </div>
                ) : (
                    ""
                )}
                <label htmlFor="">الفرع</label>
                <Field
                    className='form-control mb-3'
                    name="departmentId"
                    as="select"
                    value={formik.values.departmentId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" disabled hidden></option>
                    {depDataa.map(dep => (
                        <option key={dep.id} value={dep.id}>
                            {dep.name}
                        </option>
                    ))}
                </Field>
                {formik.errors.departmentId && formik.touched.departmentId ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.departmentId}
                    </div>
                ) : (
                    ""
                )}
                <label htmlFor="role">الصلاحيه</label>
                <select
                    className='form-control mb-3'
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" disabled hidden></option>

                    <option value="SUPERUSER" label="سوبر يوزر">
                    </option>
                    <option value="USER" label="مستخدم">
                    </option>
                    <option value="ADMIN" label="أدمن">
                    </option>

                </select>
                {formik.errors.role && formik.touched.role ? (
                    <div className="alert alert-danger p-2 my-2">
                        {formik.errors.role}
                    </div>
                ) : (
                    ""
                )}
                <div className="ant-modal-footer show mt-4">
                    <button type="button" onClick={() => { setModal2Open(false) }} className="ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-default">
                        <span>إلغاء</span>
                    </button>
                    <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="fontFamily ant-btn css-dev-only-do-not-override-1xg9z9n ant-btn-primary">
                        <span>إضافه</span>
                    </button>
                </div>
            </form>
        </Modal> */}
        <div className="container mt-5 direction">
            <h2 className='mb-5'>إدارة المستخدمين</h2>
            <table className='table fontFamily'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">إسم المستخدم</th>
                        <th scope="col">الصلاحيه</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dataa ? dataa.map((el, index) => (
                        <tr key={el.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{el.userName}</td>
                            <td>{el.role}</td>
                            <td><i onClick={() => { deleteUser(el.id) }} className="fa-solid fa-trash text-sec cursor-pointer"></i></td>
                        </tr>
                    )) : ''}
                </tbody>
            </table>
        </div>

    </>
}


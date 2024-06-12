import { Modal } from 'antd'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function DailyOperation() {
    const [modal2Open, setModal2Open] = useState(false);

    function makeRequest(values) {
        console.log(values)
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            quantity: "",
            department: '',
            officer: '',
        },

        onSubmit: makeRequest
    });
    return <>
        <div className="container">
            <Modal
                title=""
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                className='direction fontFamily'
            >
                <form className='mt-4' onSubmit={formik.handleSubmit}>
                    <label className='fw' htmlFor="name">إسم المعده</label>
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
                    <label className='fw' htmlFor="department">الفرع المستفاد من الصرف </label>
                    <input
                        className="form-control mb-3"
                        type="text"
                        id="department"
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.department && formik.touched.department ? (
                        <div className="alert alert-danger p-2 my-2">
                            {formik.errors.department}
                        </div>
                    ) : (
                        ""
                    )}
                    <label className='fw' htmlFor="officer">   الضابط الأمر بالصرف </label>
                    <select className='form-control' onChange={formik.handleChange}
                        value={formik.values.officer}
                        onBlur={formik.handleBlur}
                        name="officer" id="">
                        <option value=""> </option>
                        <option value="mAhmed">مقدم أحمد</option>
                        <option value="rYahia">رائد يحي</option>
                        <option value="nAhmed">نقيب أحمد</option>
                    </select>
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
            <div className='mt-5 '>
                <div className='mb-3'>
                    <div onClick={() => setModal2Open(true)} scope='col' className='sub-button  text-center text-white float'>صرف </div>
                </div>

                <table className="table table-hover direction">

                    <thead className=''>
                        <tr className='py-3'>
                            <th scope="col"></th>
                            <th scope="col">إسم المعده</th>
                            <th scope="col">الكمية</th>
                            <th scope="col">الفرع المستفاد من الصرف  </th>
                            <th scope="col">الضابط الأمر بالصرف</th>
                            <th scope="col">القائم علي الصرف</th>
                            <th scope="col">سعت الصرف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {ArcData ? ArcData.map((el, index) => (
                        <tr key={el.id} onClick={() => { return }} >
                            <td className='w-sm'>{el.isFolder ? <i className="fa-solid fa-folder text-sec mr-3"></i> : ''}</td>
                            <td onClick={() => { }}><Link to={`/childFolder/${el.id}`}>{el.name.split('-')[0]}</Link></td>
                            <td>{localStorage.getItem('depName')}</td>
                            <td>{`${new Date(el.createdAt).getDate()}/${new Date(el.createdAt).getMonth() + 1}/${new Date(el.createdAt).getFullYear()}`}</td>
                            <td><i onClick={() => { }} className="fa-solid fa-trash text-sec cursor-pointer"></i></td>
                        </tr>

                    )) : null} */}
                    </tbody>
                </table>
            </div>

        </div>
    </>
}

import React, { useState } from 'react'
import { Input, Button, Modal, Upload } from 'antd';
import { registerSchema } from '../common/validations';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../reducers/userauthSlice";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const Register = () => {
    const error = useSelector((state) => state.user.error);
    const [loadings, setLoadings] = useState(false);
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const initialvalue = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        picturePath: "",
        location: "",
        occupation: ""
    }
    const dispatch = useDispatch();

    const handleforSubmit = (values) => {
        setLoadings(true);
        let registerdata = dispatch(register(values));
        if (registerdata.payload.status) {
            setLoadings(false);
            navigate("/");
        } else {
            setLoadings(false);
        }
    }

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleimgChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <Formik validationSchema={registerSchema} initialValues={initialvalue} onSubmit={(values) => {
                handleforSubmit(values)
            }}>
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit }) => (
                    <div className='h-screen w-full flex justify-center items-center p-3'>
                        <div className="w-2/4 border rounded-md p-4">
                            <h1 className='text-center font-bold py-3'>Register</h1>
                            <div className="grid gap-4 grid-cols-2">
                                <div>
                                    <Input placeholder="Firstname" size='large' name="firstName" onChange={handleChange} onBlur={handleBlur} />
                                    <div className='text-red-600'>{errors.firstName && touched.firstName && errors.firstName}</div>
                                </div>
                                <div>
                                    <Input placeholder="Lastname" size='large' name="lastName" onChange={handleChange} onBlur={handleBlur} />
                                    <div className='text-red-600'>{errors.lastName && touched.lastName && errors.lastName}</div>
                                </div>
                                <div className="col-span-2">
                                    <Input placeholder="Location" size='large' name="location" onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className="col-span-2">
                                    <Input placeholder="Occupation" size='large' name="occupation" onChange={handleChange} onBlur={handleBlur} />
                                </div>
                                <div className='col-span-2'>
                                    <Input placeholder="Email Address" size='large' name="email" onChange={handleChange} onBlur={handleBlur} />
                                    <div className='text-red-600'>{errors.email && touched.email && errors.email}</div>
                                </div>
                                <div className='col-span-2'>
                                    <Input.Password placeholder="Password" size='large' name="password" onChange={handleChange} onBlur={handleBlur} />
                                    <div className='text-red-600'>{errors.password && touched.password && errors.password}</div>
                                </div>
                                <Upload
                                    action="/register"
                                    listType="picture-circle"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleimgChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </div>
                            {error && <div className='text-red-600'>{error}</div>}
                            <div className="text-center py-3">
                                <Button type="primary" loading={loadings} style={{ background: "#1677ff" }} onClick={handleSubmit}>Submit</Button>
                            </div>
                            <p className='py-3'>Already have an account? <Link to="/">Login here</Link></p>
                        </div>
                    </div>
                )}
            </Formik>

        </>
    )
}

export default Register;
import React, { useState } from 'react'
import { Input, Button } from 'antd';
import { registerSchema } from '../common/validations';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../features/userauthSlice";
import { Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const error = useSelector((state) => state.user.error);
    const [loadings, setLoadings] = useState(false);
    const navigate = useNavigate();
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
import React, { useState } from 'react';
import { login } from "../reducers/userauthSlice";
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { loginSchema } from "../common/validations";
import { Formik } from "formik";
import {Link, useNavigate} from "react-router-dom";


const Login = () => {  
  const [loadings, setLoadings] = useState(false);
  const dispatch = useDispatch();  
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();  

  const handleforSubmit = async (values) => {    
    setLoadings(true);
    let data =await dispatch(login(values))
    
    if(data.payload.status) {      
      setLoadings(false);
      navigate("/home");
    } else {      
      setLoadings(false);
    }

  }


  return (
    <>
      <Formik validationSchema={loginSchema} initialValues={{ email: "", password: " " }}
        onSubmit={(values) => {          
          handleforSubmit(values);
        }}>
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit }) => (
          <div className="flex justify-center items-center w-full h-screen p-2">
            <div className="w-1/4 p-4 border rounded-md">
              <h1 className="py-3 text-center font-bold">Login</h1>
              <div className='py-3'>
                <Input size="large" placeholder="Email Address" name="email" id="email" value={values.email} prefix={<UserOutlined />} onChange={handleChange} onBlur={handleBlur} />
                <div className='text-red-600'>{errors.email && touched.email && errors.email}</div>
              </div>
              <div className='py-3'>
                <Input.Password size="large" placeholder="Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                <div className='text-red-600'>{errors.password && touched.password && errors.password}</div>
              </div>
              {!errors.email && !errors.password ? <div className='text-red-600'>{error}</div> :''}
              <div className='py-3 text-center'>
                <Button type="primary" loading={loadings} style={{ background: "#1677ff" }} onClick={handleSubmit}>Submit</Button>
              </div>
              <p className='py-3'>Don't have an account? <Link to="/register">Signup here</Link></p>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default Login;
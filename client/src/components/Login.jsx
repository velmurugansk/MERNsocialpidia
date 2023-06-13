import React, {useState} from 'react'
import { loginSchema } from '../common/validations';
import {login} from "../features/userauthSlice";
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

const Login = () => {

  const [loadings, setLoadings] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
  }

  return (
    <div className="flex justify-center items-center w-full h-screen p-2">
      <div className="w-1/4 p-4 border rounded-md">
        <h1 className="py-3 text-center font-bold">Login</h1>
        <div className='py-3'>
          <Input size="large" placeholder="Email Address" name="email" prefix={<UserOutlined />} onChange={(e)=>setEmail(e.target.value)} />
        </div>  
        <div className='py-3'>
          <Input.Password size="large"  placeholder="Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>     
        <div className='py-3 text-center'>
          <Button type="primary" loading={loadings} style={{ background: "#1677ff" }} onClick={handleSubmit}>Submit</Button>
        </div>         
      </div>       
    </div>
  )
}

export default Login
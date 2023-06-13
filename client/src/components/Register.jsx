import React, { useState } from 'react'
import { Input, Button, Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { registerSchema } from '../common/validations';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../features/userauthSlice";

const Register = () => {

    const [errval, setErrval] = useState('');    
    const error = useSelector((state) => state.user.error);
    const [loadings, setLoadings] = useState(false);
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [occupation, setOccupation] = useState('');
    const [picturePath, setPicturepath] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadings(true);
        const errorHandle = registerSchema.validate({firstName,lastName,location,occupation,email,password,picturePath})
        .then(({errors,values}) => {
            dispatch(register({firstName,lastName,location,occupation,email,password,picturePath}));
            setLoadings(false);
        })
        .catch(({errors}) => {
            setErrval([errors][0][0]);
            setLoadings(false);            
        });    
        
        console.log(errorHandle)
    }

    return (
        <div className='h-screen w-full flex justify-center items-center p-3'>
            <div className="w-2/4 border rounded-md p-4">
                <h1 className='text-center font-bold py-3'>Register</h1>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <Input placeholder="Firstname" size='large' name="firstName" onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div>
                        <Input placeholder="Lastname" size='large' name="lastName" onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="col-span-2">
                        <Input placeholder="Location" size='large' name="location" onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="col-span-2">
                        <Input placeholder="Occupation" size='large' name="occupation" onChange={(e) => setOccupation(e.target.value)} />
                    </div>
                    <div className='col-span-2'>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            action=""
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </div>
                    <div className='col-span-2'>
                        <Input placeholder="Email Address" size='large' name="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='col-span-2'>
                        <Input.Password placeholder="Password" size='large' name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {(error || errval) && <div className='text-red-600'>{error ? error : errval}</div>}
                <div className="text-center py-3">
                    <Button type="primary" loading={loadings} style={{ background: "#1677ff" }} onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default Register;
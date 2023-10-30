import React, { useEffect, useState } from 'react';
import './ViewUrl.css'
import Header from '../../Components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { getUrlbyId, updateTheUrl } from '../../Api/Url';

const ViewUrl = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        clicks: 0,
        shortUrl: "",
        url: "",
        urlName: "",
        userId: "",
        _id: ""
    });

    const [updateData, setUpdateData] = useState({
        shortUrl: "",
        url: "",
        urlName: "",
    })

    useEffect(() => {
        getUrlbyId(id).then(res => {
            const responseData = res.data.data;
            setData(responseData);
            setUpdateData({
                shortUrl: responseData.shortUrl,
                url: responseData.url,
                urlName: responseData.urlName,
            });
        }).catch(err => {
            console.log(err);
        });
    }, [id]);

    const updateTheData = () => {
        console.log(updateData);
        updateTheUrl(id ,updateData).then(res=>{
            // console.log(res);
            navigate('/shortify/dashboard')
        }).catch(err=>{
            console.log(err);
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData({
            ...updateData,
            [name]: value,
        });
    }

    return (
        <div className='ViewUrl_container'>
            <Header />
            <div className='ViewUrl_body'>
                <div className='ViewUrl_inputs_container'>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        name="urlName"
                        placeholder="Url Name"
                        aria-label=".form-control-lg example"
                        value={updateData.urlName}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        name="url"
                        placeholder="Actual Url"
                        aria-label=".form-control-lg example"
                        value={updateData.url}
                        onChange={handleInputChange}
                    />
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Shortened Url"
                        aria-label=".form-control-lg example"
                        value={data.shortUrl}
                        disabled
                    />
                    <div className='ViewUrl_button_container'>
                        <button className='btn btn-primary' onClick={updateTheData}>Update the Changes</button>
                        <button className='btn btn-primary'>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUrl

import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../../Components/Header';
import { Link } from 'react-router-dom';
import { getuserId } from '../../Utils/LocalStorage';
import { deleteUrlbyId, getUserUrl } from '../../Api/Url';
import shortifyUrl from '../RoutingUrl';

const Dashboard = () => {
    const userId = getuserId();
    const [data, setdata] = useState([]);

    useEffect(() => {
        getUserUrl(userId)
            .then((res) => {
                setdata(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteUrl = (id) => {
        deleteUrlbyId(id)
            .then((res) => {
                setdata(data.filter(item => item._id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <Header />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">S no</th>
                        <th scope="col">Url Name</th>
                        <th scope="col">Actual Url</th>
                        <th scope="col">Shortified Url</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">
                            <Link to="/shortify/dashboard/shortern-new-url" className="text-primary" style={{ cursor: "pointer" }}>
                                + Shorten New Url
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.urlName}</td>
                            <td className="url-container">{item.url}</td>
                            <td><a href={`${shortifyUrl}${item.shortUrl}`} target='_blank'>{item.shortUrl}</a></td>
                            <td>{item.clicks}</td>
                            <td>
                                <button className="btn btn-warning">
                                    <Link to={`/shortify/dashboard/${item._id}`}>Edit</Link>
                                </button>
                                <button
                                    className="btn btn-danger ms-1"
                                    onClick={() => deleteUrl(item._id)}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Hero() {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();


    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`/notices/${id}`, { withCredentials: true });
            setNotices(notices.filter(notice => notice._id !== id));
        } catch (err) {
            alert('Error deleting notice');
        }
    };
    const [notices, setNotices] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/notices');
                console.log(res.data); 
                const sorted = [...res.data].sort((a, b) => {
                    const dateA = a.date ? new Date(a.date) : new Date(0);
                    const dateB = b.date ? new Date(b.date) : new Date(0);
                    return dateB - dateA; 
                });
                setNotices(sorted);
            } catch (err) {
                console.error("React Axios Error:", err);
            }
        }
        fetchData();
    }, []);





    const filteredNotices = notices.filter(notice =>
        notice.title.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <div >
            <div className='row ' style={{ backgroundImage: `url(/media/background.jpg)`, backgroundSize: "cover", height: "100vh", width: "100vw", backgroundRepeat: "no repeat" }}>




                <div className='col-6 ' style={{ height: "50px" }}>
                    <p style={{ fontSize: "30px", color: "rgb(124, 124, 226)", marginLeft: "90px", marginTop: "250px" }}>NOTICE HUB</p>
                    <h3 style={{ fontSize: "50px", color: "rgb(89, 89, 192)", marginLeft: "90px", marginTop: "10px" }}>KCRI COLLEGE</h3>
                </div>

                <div className='col-6'
                    style={{
                        marginTop: "20px",
                        marginLeft: "600px",
                        height: "70vh",
                        width: "50vw",
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "10px 14px 15px 20px  rgba(0,0,0,0.5)",
                        overflowY: "auto",
                        position: "relative"
                    }}>

                    <div className='row'>
                        <div className='col d-flex flex-column' style={{ width: "25%", height: "100%", backgroundColor: "rgb(18, 18, 110)", position: "absolute", borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" }} >

                            <a style={{ textDecoration: "none", color: "white", marginTop: "40px" }} href="/allnotice">Allnotice</a>
                            <a style={{ textDecoration: "none", color: "white", marginTop: "40px" }} href="/oldnotice">OldNotice</a>
                        </div>
                        <form className="form-inline d-flex">
                            <input
                                className="form-control"
                                style={{ width: "350px", marginLeft: "200px" }}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                            {role === 'admin' && (
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor: "rgb(42, 42, 121)",
                                        color: "white",
                                        marginLeft: "5px",
                                        padding: "5px 20px",
                                        borderRadius: "5px",
                                        border: "none"
                                    }}
                                    onClick={() => navigate('/newnotice')}
                                >
                                    newnotice
                                </button>
                            )}

                        </form>
                        <div
                            style={{
                                marginTop: "30px",
                                marginLeft: "200px",
                                color: "rgb(42, 42, 121)",
                                height: "30vh",

                                paddingRight: "10px"
                            }}
                        >
                            {filteredNotices.map((notice) => (
                                <div
                                    key={notice._id}
                                    style={{
                                        marginBottom: "20px",
                                        border: "2px solid #2a2a79",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)",
                                        boxShadow: "0 4px 16px rgba(42,42,121,0.10)",
                                        width: "350px",
                                        transition: "box-shadow 0.2s",
                                        fontFamily: "Segoe UI, sans-serif"
                                    }}
                                >
                                    <Link
                                        to={`/noticeview/${notice._id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "#2a2a79",
                                            fontWeight: "bold",
                                            fontSize: "1.2rem"
                                        }}
                                    >
                                        {notice.title}
                                    </Link>
                                    <div style={{ marginTop: "8px", color: "#444", fontSize: "0.95rem" }}>
                                        {notice.description}
                                    </div>
                                    <div style={{ marginTop: "8px", color: "#888", fontSize: "0.85rem" }}>
                                        Date: {notice.date ? new Date(notice.date).toLocaleDateString() : ""}
                                    </div>

                                    <button
                                        onClick={() => handleDeleteClick(notice._id)}
                                        style={{
                                            marginTop: "12px",
                                            background: "rgb(18, 18, 110)",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            padding: "6px 16px",
                                            cursor: "pointer",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Noticeview() {
    const { id } = useParams();
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        async function fetchNotice() {
            const res = await fetch('/notices');
            const data = await res.json();
            const found = data.find(n => n._id === id);
            setNotice(found);
        }
        fetchNotice();
    }, [id]);

    // Helper to check if file is PDF
    const isPdf = notice?.pdf?.toLowerCase().endsWith('.pdf');

    return (
        <div
            style={{
                backgroundImage: `url(/media/background.jpg)`,
                backgroundSize: "cover",
                height: "100vh",
                width: "100vw",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            {notice ? (
                <div
                    style={{
                        width: "400px",
                        height: "90vh",
                        borderRadius: "16px",
                        background: "white",
                        boxShadow: "10px 14px 15px 20px rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden"
                    }}
                >
                    {isPdf ? (
                        <embed
                            src={notice.pdf}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            style={{
                                border: "none",
                                borderRadius: "16px",
                                background: "white"
                            }}
                        />
                    ) : (
                        <img
                            src={notice.pdf}
                            alt="Notice"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                borderRadius: "16px",
                                background: "white"
                            }}
                        />
                    )}
                </div>
            ) : (
                <p style={{ color: "white", fontSize: "2rem" }}>Loading...</p>
            )}
        </div>
    );
}

export default Noticeview;
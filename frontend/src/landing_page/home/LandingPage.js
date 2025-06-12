import React from 'react';
import { useNavigate } from 'react-router-dom';
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div style={{ backgroundImage: `url(/media/background.jpg)`, backgroundSize: "cover", height: "100vh", backgroundRepeat: "no repeat" }}>

            <h1 style={{ color: "rgb(42, 42, 121)", marginLeft: "400px" }}> WelCome To NOTICEHUB</h1>
            <div className="d-flex gap-5  justify-content-center align-items-center" style={{ marginTop: "150px", marginLeft: "400px", height: "50vh", width: "40vw", backgroundColor: "transparent", borderRadius: "16px", boxShadow: "10px 14px 15px 20px  rgba(0,0,0,0.5)", border: "none" }}>
                <form>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ backgroundColor: "rgb(42, 42, 121)", color: "white", padding: "10px 20px", borderRadius: "5px" }}> Admin Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/students')}
                        style={{ backgroundColor: "rgb(42, 42, 121)", color: "white", marginLeft: "100px", padding: "10px 20px", borderRadius: "5px" }}>For student
                    </button>
                </form>
                
            </div>

        </div>
    );
}

export default LandingPage;
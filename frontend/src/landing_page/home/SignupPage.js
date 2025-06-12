import React from 'react';

function SignupPage() {
    return (
        <div className="d-flex  justify-content-center align-items-center" style={{ backgroundImage: `url(/media/background.jpg)`, backgroundSize: "cover", height: "100vh", width: "100vw", backgroundRepeat: "no repeat" }}>


            <div className="d-flex  flex-colomn justify-content-center align-items-center" style={{ height: "50vh", width: "40vw", backgroundColor: "transparent", borderRadius: "16px", boxShadow: "10px 14px 15px 20px  rgba(0,0,0,0.5)", border: "none" }}>
                <form className="d-flex  flex-column justify-content-center align-items-center">
                    <input className='mb-3 p-2' style={{ width: "300px", border: "none", borderRadius: "10px" }} placeholder='username ' />
                    <input className='mb-3 p-2' style={{ width: "300px", border: "none", borderRadius: "10px" }} placeholder='email ' />
                    <input className='mb-3 p-2' style={{ width: "300px", border: "none", borderRadius: "10px" }} placeholder='password' />
                    <button className='mb-2' style={{ backgroundColor: "rgb(42, 42, 121)", color: "white", marginLeft: "100px", padding: "5px 20px", borderRadius: "5px" }}> Submit</button>
                </form>
            </div>

        </div>

    );
}

export default SignupPage;
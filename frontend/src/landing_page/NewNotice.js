import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function NewNotice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
      
    });
 const [image, setImage] = useState(null);
 
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        if (image) data.append('pdf', image); 

        try {
            await axios.post('/notices', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/students');
            window.location.reload();
            setFormData({ title: '', description: '', date: '' });
            setImage(null);
        } catch (err) {
            alert('Error creating notice');
        }
    };

    return (
        <div className='row ' style={{ backgroundImage: `url(/media/background.jpg)`, backgroundSize: "cover", height: "100vh", width: "100vw", backgroundRepeat: "no repeat" }}>
            <div className='col-6 ' style={{ marginTop: "100px", marginLeft: "300px", height: "70vh", width: "50vw", backgroundColor: "white", borderRadius: "16px", boxShadow: "10px 14px 15px 20px  rgba(0,0,0,0.5)" }}>
                <form className="d-flex  flex-column justify-content-center align-items-center" onSubmit={handleSubmit} type="file" accept="application/pdf">
                    <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        className='mt-3 p-2'
                        style={{ width: "450px", border: "none", borderRadius: "10px" }}
                        placeholder='title'
                        required
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className='mt-3 p-2'
                        style={{ width: "450px", border: "none", borderRadius: "10px" }}
                        placeholder='description'
                        required
                    />
                    <input
                        type='date'
                        name='date'
                        value={formData.date}
                        onChange={handleChange}
                        className='mt-3 p-2'
                        style={{ width: "450px", border: "none", borderRadius: "10px" }}
                        placeholder='date'
                        required
                    />
                    <input
                        name='pdf'
                        type='file'
                        accept='image/*'
                       onChange={handleFileChange}
                        placeholder='pdf'
                        className='mt-3 p-2'
                        style={{ width: "450px", border: "none", borderRadius: "10px" }}
                    />
                    <button  className='mt-5' style={{ backgroundColor: "rgb(42, 42, 121)", color: "white", marginLeft: "100px", padding: "5px 20px", borderRadius: "5px" }} type='submit'>
                        Create Notice
                    </button>
                </form>
            </div>
        </div>

    );
}

export default NewNotice;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; // Import the CSS file

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch user data from API
    axios.get('http://localhost:3001/api/v1/users/673b2b6fa7a5c0129ae27590')
      .then(response => {
        if (response.data.type === 'success') {
          setUserData(response.data.data);
          setFormData({
            fullname: response.data.data.fullname,
            email: response.data.data.email,
            phone: response.data.data.phone
          });
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission for editing
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditMode(false); 
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="profile-container">
        <h1>{isEditMode ? 'Edit Profile' : ' Profile'}</h1>

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={isEditMode ? formData.fullname : userData.fullname}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={isEditMode ? formData.email : userData.email}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={isEditMode ? formData.phone : userData.phone}
              onChange={handleInputChange}
              disabled={!isEditMode}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="edit-button" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? 'Cancel' : 'Edit'}
            </button>
            {isEditMode && <button type="submit" className="save-button">Save</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

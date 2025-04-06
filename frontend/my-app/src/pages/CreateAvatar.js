import React, { useState } from 'react';
import rabbitImage from '../images/rabbit.png';
import catImage from '../images/cat.png';
import dogImage from '../images/dog.png';
import bearImage from '../images/bear.png';
import { useNavigate } from 'react-router-dom';
import './styles/CreateAvatar.css'; // Import the CSS file

const avatarList = [
  { name: 'Rabbit', image: rabbitImage },
  { name: 'Cat', image: catImage },
  { name: 'Dog', image: dogImage },
  { name: 'Bear', image: bearImage },
];

const CreateAvatar = () => {
  const [index, setIndex] = useState(0);
  const [avatarConfirmed, setAvatarConfirmed] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const handleNextDisabled = !(avatarConfirmed && locationConfirmed); // "Next" button is disabled if not both are confirmed

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % avatarList.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + avatarList.length) % avatarList.length);
  };

  const handleConfirmAvatar = () => {
    const selectedAvatar = avatarList[index];
    localStorage.setItem('myAvatar', JSON.stringify(selectedAvatar));
    setAvatarConfirmed(true);
    console.log('Avatar confirmed:', selectedAvatar);
  };

  const handleConfirmLocation = () => {
    localStorage.setItem('userLocation', location); // Save location to localStorage
    setLocationConfirmed(true);
    console.log('Location confirmed:', location);
  };

  const handleEditAvatar = () => {
    setAvatarConfirmed(false);
  };

  const handleEditLocation = () => {
    setLocationConfirmed(false);
  };

  const handleNextClick = () => {
    if (handleNextDisabled) return;
    handleNextPage();
  };

  const handleNextPage = () => {
    navigate('/profile');
  };

  const selected = avatarList[index];

  return (
    <div className="create-avatar-container">
      <h1 className="create-avatar-header">Choose Your Animal Avatar</h1>

      {/* Avatar Confirmation */}
      {!avatarConfirmed ? (
        <div>
          <div className="avatar-selection-container">
            <button
              onClick={handlePrev}
              className="arrow-buttons"
            >
              ←
            </button>

            <button
              onClick={handleNext}
              className="arrow-buttons"
            >
              →
            </button>
          </div>
          <div className="avatar-image-container">
            <img
              src={selected.image}
              alt={selected.name}
              className="avatar-image"
            />
            <p className="avatar-name">{selected.name}</p>
          </div>
          <button
            onClick={handleConfirmAvatar}
            className="confirm-avatar-button"
          >
            Confirm Avatar
          </button>
        </div>
      ) : (
        <div className="avatar-confirmed-container">
          <p className="avatar-confirmed-text">You chose the {selected.name}!</p>
          <img
            src={selected.image}
            alt={selected.name}
            className="avatar-confirmed-image"
          />

          <button
            onClick={handleEditAvatar}
            className="edit-avatar-button"
          >
            Edit Avatar
          </button>
        </div>
      )}

      <h1 className="create-avatar-header">Set Your Location</h1>

      {/* Location Confirmation */}
      {!locationConfirmed ? (
        <div className="location-section">
          <p className="location-text">Please enter your location:</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="location-input"
            placeholder="Enter your location"
          />
          <button
            onClick={handleConfirmLocation}
            className="confirm-location-button"
          >
            Confirm Location
          </button>
        </div>
      ) : (
        <div className="location-confirmed-container">
          <p className="location-confirmed-text">Location confirmed: {location}</p>

          <button
            onClick={handleEditLocation}
            className="edit-location-button"
          >
            Edit Location
          </button>
        </div>
      )}

      {/* "Next" button */}
      {avatarConfirmed && locationConfirmed && (
        <button
          onClick={handleNextClick}
          className="next-button"
          disabled={handleNextDisabled}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default CreateAvatar;

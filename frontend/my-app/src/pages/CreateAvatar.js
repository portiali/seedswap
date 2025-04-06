import React, { useState } from 'react';
import rabbitImage from '../images/rabbit.png';
import catImage from '../images/cat.png';
import dogImage from '../images/dog.png';
import bearImage from '../images/bear.png';

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

  const selected = avatarList[index];

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold mb-6">Choose Your Animal Avatar</h1>

      <div className="flex items-center space-x-8 mb-6">
        <button
          onClick={handlePrev}
          className="text-4xl text-gray-600 hover:text-black"
        >
          ←
        </button>

        <button
          onClick={handleNext}
          className="text-4xl text-gray-600 hover:text-black"
        >
          →
        </button>

        {/* <div className="flex flex-col items-center">
          <img
            src={selected.image}
            alt={selected.name}
            className="w-64 h-64 object-contain"
          />
          <p className="text-lg mt-2">{selected.name}</p>
        </div> */}
      </div>

      {/* Avatar Confirmation */}
      {!avatarConfirmed ? (
        <div>
          <img
            src={selected.image}
            alt={selected.name}
            className="w-64 h-64 object-contain"
          />
          <button
            onClick={handleConfirmAvatar}
            className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg"
          >
            Confirm Avatar
          </button>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl">You chose the {selected.name}!</p>
          <img
            src={selected.image}
            alt={selected.name}
            className="w-40 h-40 mx-auto mt-4"
          />

          <button
            onClick={handleEditAvatar}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Edit Avatar
          </button>
        </div>
      )}

      {/* Location Confirmation */}
      {!locationConfirmed ? (
        <div className="mt-8">
          <p className="text-lg">Please enter your location:</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter your location"
          />
          <button
            onClick={handleConfirmLocation}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Confirm Location
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-lg">Location confirmed: {location}</p>

          <button
            onClick={handleEditLocation}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            Edit Location
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateAvatar;

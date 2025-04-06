import React, { useState } from 'react';
import rabbitImage from './rabbit.png';
import catImage from './cat.png';
import dogImage from './dog.png';
import bearImage from './bear.png';

const avatarList = [
  { name: 'Rabbit', image: rabbitImage },
  { name: 'Cat', image: catImage },
  { name: 'Dog', image: dogImage },
  { name: 'Bear', image: bearImage },
];

const AvatarCustomization = () => {
  const [index, setIndex] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % avatarList.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + avatarList.length) % avatarList.length);
  };

  const handleConfirm = () => {
    const selectedAvatar = avatarList[index];
    localStorage.setItem('myAvatar', JSON.stringify(selectedAvatar));
    setConfirmed(true);
    console.log('Avatar confirmed:', selectedAvatar);
  };

  const selected = avatarList[index];

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold mb-6">Choose Your Animal Avatar</h1>

      {!confirmed ? (
        <>
          <div className="flex items-center space-x-8">
            <button
              onClick={handlePrev}
              className="text-4xl text-gray-600 hover:text-black"
            >
              ←
            </button>

            <div className="flex flex-col items-center">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-64 h-64 object-contain"
              />
              <p className="text-lg mt-2">{selected.name}</p>
            </div>

            <button
              onClick={handleNext}
              className="text-4xl text-gray-600 hover:text-black"
            >
              →
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="mt-8 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg"
          >
            Confirm Avatar
          </button>
        </>
      ) : (
        <div className="text-center mt-10">
          <p className="text-xl">You chose the {selected.name}!</p>
          <img
            src={selected.image}
            alt={selected.name}
            className="w-40 h-40 mx-auto mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarCustomization;
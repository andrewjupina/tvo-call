import React from 'react';

const UserInitials = ({ userName }) => {
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0].toUpperCase()).join('');
  };

  const handleDragStart = (e) => {
    const initials = getInitials(userName);
    e.dataTransfer.setData("text/plain", initials);
  };

  return (
    <div
      className="user-initials"
      draggable="true"
      onDragStart={handleDragStart}
    >
      {getInitials(userName)}
    </div>
  );
};

export default UserInitials;

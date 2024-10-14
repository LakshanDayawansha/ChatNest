import React from 'react';

let chatSelected = false;
let chatUser = null;

const selectChat = (user) => {
  chatSelected = true;
  chatUser = user;
}

const UserList = ({ users,onUserClick }) => {
  return (
    <div className="user-list">
      <h3>Active Users</h3>
      {users.map((user, index) => (
        <div className='user'
          key={index}
          onClick={() => onUserClick(user)}>
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default UserList;

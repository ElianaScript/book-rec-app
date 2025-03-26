import React from 'react';

import auth from '../utils/auth';

const UserList = ({ users }) => {
    return (
        <>
            <h2 className="pb-5">
                Hey {auth.getProfile().username}, Checkout all your friends!
                 </h2>
                 {users && users.map((user) => (
                    <div className="row align-center mb-5" key={user.id}>
                        <div>
                            <h3>{user.id}. {user.username}</h3>
                        </div>
                        <div>
                            <h4><a href={`mailto${user.email}`}>{user.email}</a></h4>
                        </div>
                    </div>
                 ))}
        </>
    );
};

export default UserList;
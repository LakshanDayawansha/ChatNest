import React from "react";

const ReceiverDetails = ({chatUser}) => {
    return (
        <div className="receiver-details">
                <h3>{chatUser.username}</h3>
        </div>
    );
};

export default ReceiverDetails;
const FriendRequestCard = ({ request }) => {


    return (
        <>
            <p>{request.User.name}</p>
            <button>Accept</button>
            <button>Decline</button>
        </>

    )
}

export default FriendRequestCard; 
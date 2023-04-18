import FriendList from "./FriendList"
import FriendRequests from "./FriendRequests"
import './Friends.css'

const Friends = () => {

    return (
        <>
            <div className='friends-nav-container'>
                <div className='friends-nav-title'>
                    My Friends
                </div>
            </div>

            <div className='friends-details-container'>
                <div className='my-requests-sidebar'>
                    <FriendRequests />
                </div>
                <div className='my-friendlist'>
                    <FriendList />
                </div>
            </div>

        </>

    )
}

export default Friends
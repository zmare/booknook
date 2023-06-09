import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import FriendList from "./FriendList"
import FriendRequests from "./FriendRequests"
import './Friends.css'

const Friends = () => {
    const user = useSelector(state => state.session.user);

    if (!user) return <Redirect to='/' />


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
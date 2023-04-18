import { NavLink } from 'react-router-dom'
import ListCard from "./ListCard";

const AllListsCommunity = ({ allLists }) => {

    let listArr = Object.values(allLists).slice(2)

    return (
        <div>
            <p className='requests-para'>All Lists in the Community!</p>
            <div className='listcards-container'>
                {
                    listArr.map(list => (
                        <NavLink key={`list-card-community-${list.id}`} style={{ textDecoration: 'none' }} to={`/list/${list.id}`} className='list-card-link' >
                            <ListCard list={list} />
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
}

export default AllListsCommunity
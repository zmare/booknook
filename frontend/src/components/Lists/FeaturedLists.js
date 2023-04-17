import { NavLink } from 'react-router-dom'
import ListCard from "./ListCard";

const FeaturedLists = ({ allLists }) => {

    let listArr = Object.values(allLists)

    return (
        <div className='listcards-container'>
            <p>Featured Lists</p>
            {listArr.map(list => (
                <NavLink to={`/list/${list.id}`} >
                    <ListCard list={list} />
                </NavLink>
            ))
            }
        </div >
    )
}

export default FeaturedLists; 
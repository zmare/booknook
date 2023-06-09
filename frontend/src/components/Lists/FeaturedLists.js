import { NavLink } from 'react-router-dom'
import ListCard from "./ListCard";

const FeaturedLists = ({ allLists }) => {

    let listArr = Object.values(allLists).slice(0, 2)

    return (
        <div>
            < p className='requests-para' > Featured Lists</p >
            <div className='listcards-container'>
                {
                    listArr.map(list => (
                        <NavLink key={`list-card-featured-${list.id}`} style={{ textDecoration: 'none' }} to={`/list/${list.id}`} className='list-card-link' >
                            <ListCard list={list} />
                        </NavLink>
                    ))
                }
            </div>
        </div >
    )
}

export default FeaturedLists; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getList } from "../../store/lists";
import BookTable from '../Bookshelves/BookTable'

const ListDetail = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    useEffect(() => {
        dispatch(getList(listId))
    }, [dispatch]);

    let list = useSelector(state => state.lists.currList);
    if (!list) return null;


    return (
        <div className='lists-book-table'>
            <BookTable bookshelf={list} type='list' />
        </div>
    )
}

export default ListDetail;
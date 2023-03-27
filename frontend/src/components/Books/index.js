import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBookshelf } from '../../store/bookshelves';
import BookshelvesEditModal from '../BookshelvesEditModal';
import OpenModalButton from '../OpenModalButton'


const Books = () => {
    const dispatch = useDispatch();
    const { shelfId } = useParams();

    useEffect(() => {
        dispatch(getBookshelf(shelfId));
    }, [dispatch])

    const bookshelf = useSelector(state => state.bookshelves.currBookshelf);
    if (!bookshelf) return null;

    return (
        <>
            <h1>
                hello from {bookshelf.name}
            </h1>

            <div>
                <OpenModalButton
                    buttonText="edit"
                    modalComponent={<BookshelvesEditModal bookshelf={bookshelf} />}
                />
            </div>
        </>


    )
}

export default Books
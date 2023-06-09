import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { removeBook, getBookshelves, getBookshelf } from "../../store/bookshelves";
import "./Bookshelves.css"
import { getAllLists, getList, getUserLists, removeBookFromList } from "../../store/lists";


const BookTableCard = ({ book, bookshelf, type }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState();

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!type || type !== "list") {
            try {
                let removeBookFromShelf = await dispatch(removeBook(book.id, bookshelf.id));
                if (removeBookFromShelf) {
                    await dispatch(getBookshelves());
                    await dispatch(getBookshelf(bookshelf.id))
                }
            }
            catch (response) {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            }
        } else {
            try {
                let removedBookFromList = await dispatch(removeBookFromList(book.id, bookshelf.id));
                if (removedBookFromList) {
                    await dispatch(getAllLists());
                    await dispatch(getUserLists());
                    await dispatch(getList(bookshelf.id));
                }
            }
            catch (response) {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            }
        }
    }

    return (
        <div id="book-table" className="book-table-headers">
            <div id='header-1'>
                <img style={{ width: '50px', height: '77px' }} src={book.bookImage}></img>
            </div>
            <p id='header-2'>{book.title}</p>
            <p id='header-3'>{book.author}</p>
            <p id='header-4'>{book.avgStarRating}</p>
            {bookshelf.name !== "All" ?
                <button className="button-trash-book-table" id="header-5" onClick={handleDelete}> <i className="fa-solid fa-trash-can"></i> </button>
                :
                ""
            }
        </div>
    )
}

export default BookTableCard
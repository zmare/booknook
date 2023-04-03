import { NavLink } from 'react-router-dom'
import BookshelvesEditModal from '../BookshelvesEditModal';
import BookTableCard from './BookTableCard';
import OpenModalButton from '../OpenModalButton'
import './Bookshelves.css'

const BookTable = ({ bookshelf, bookshelves }) => {

    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between", borderBottom: '1px solid #EBE8D5' }}>
                <h1 style={{ marginTop: "0", fontFamily: "'Merriweather', serif", fontWeight: '400' }}>
                    {bookshelf.name}
                </h1>
                {(bookshelf.name !== "All" && bookshelf.name !== "Read" && bookshelf.name !== "Currently Reading" && bookshelf.name !== "Want to Read") ?
                    <div className="gear-shift-icon">
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-gear"></i>}
                            modalComponent={<BookshelvesEditModal bookshelf={bookshelf} bookshelves={bookshelves} />}
                        />
                    </div>
                    :
                    ""
                }
            </div>
            <div className="book-table-headers" style={{ fontWeight: 700 }}>
                <p id="header-1">Cover</p>
                <p id="header-2">Title</p>
                <p id="header-3">Author</p>
                <p id='header-4'>Avg Rating</p>
                {bookshelf.name !== "All" ?
                    <p id="header-5"> </p>
                    :
                    ""
                }

            </div>

            {
                bookshelf.Books.length ?
                    <>
                        {bookshelf.Books.map(book => (
                            <NavLink key={`books-table-${book.id}`} style={{ textDecoration: 'none' }} to={`/books/${book.id}`}>
                                <BookTableCard book={book} bookshelf={bookshelf} />
                            </NavLink>
                        ))}
                    </>
                    :
                    <p style={{ fontFamily: "'Lato', serif" }}>No books in this bookshelf.</p>
            }

        </>


    )
}

export default BookTable
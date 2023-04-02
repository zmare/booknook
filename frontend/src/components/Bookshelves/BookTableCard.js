import "./Bookshelves.css"


const BookTableCard = ({ book }) => {
    return (
        <div id="book-table" className="book-table-headers">
            <div id='header-1'>
                <img style={{ width: '50px', height: '77px' }} src={book.bookImage}></img>
            </div>
            <p id='header-2'>{book.title}</p>
            <p id='header-3'>{book.author}</p>
            <p id='header-4'>{book.avgStarRating}</p>
        </div>
    )
}

export default BookTableCard
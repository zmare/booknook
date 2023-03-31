

const RecommendedBook = ({ book }) => {

    return (
        <div className='homepage-rec-container'>
            <div>
                <img className="homepage-rec-image" src={book.bookImage}></img>
            </div>
            <div>
                <p id="homepage-rec-book-title">{book.title}</p>
                <p id="homepage-bookshelf-book-author">by {book.author}</p>
                <p className="homepage-rec-para">{book.summary}</p>
            </div>
        </div>
    )
}

export default RecommendedBook
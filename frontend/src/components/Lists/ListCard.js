import './Lists.css'

const ListCard = ({ list }) => {

    return (
        <div className='list-card-container'>
            <div>
                {list.Books.length ? list.Books.slice(0, 4).map(book => (
                    <span key={`list-card-book-images-${book.id}`}>
                        <img style={{ width: '55px', height: '80px', padding: '0 1px' }} src={book.bookImage}></img>
                    </span>
                ))
                    :
                    <span key={`list-card-book-no-images-${list.id}`}>
                        <img style={{ width: '55px', height: '80px', padding: '0 1px' }} src="https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png"></img>
                    </span>
                }
            </div>
            <p className='list-book-title'>{list.name}</p>
            <p className='list-book-total'>{list.Books.length} {list.Books.length === 1 ? 'book' : 'books'} </p>
        </div>
    )
}

export default ListCard; 
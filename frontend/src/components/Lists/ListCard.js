import './Lists.css'

const ListCard = ({ list }) => {
    let length = list.Books.length;

    return (
        <div className='list-card-container'>
            {list.Books.map(book => (
                <>
                    <img style={{ width: '55px', height: '80px', padding: '0 1px' }} src={book.bookImage}></img>
                </>
            ))}
            <p>{list.name}</p>
            <p>{list.Books.length} {list.Books.length === 1 ? 'book' : 'books'}</p>
        </div>
    )
}

export default ListCard; 
const BookTableCard = ({ book }) => {
    return (
        <>
            <p>{book.bookImage}</p>
            <p>{book.title}</p>
            <p>{book.author}</p>
        </>


    )
}

export default BookTableCard
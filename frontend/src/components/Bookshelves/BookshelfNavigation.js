const BookshelfNavigation = () => {
    return (
        <>
            <div className='bookshelf-nav-title'>
                My Books
            </div>

            <div className='bookshelf-settings' onClick={(e) => window.alert("Feature coming soon!")}>
                <ul className='bookshelf-settings-ul'>
                    <li> Batch Edit </li>
                    <li> Settings </li>
                    <li> Stats </li>
                    <li> Print </li>
                </ul>
            </div>
        </>
    )
}

export default BookshelfNavigation 
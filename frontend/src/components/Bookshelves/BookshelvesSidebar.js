import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createBookshelf, getBookshelves } from '../../store/bookshelves';

const BookshelvesSidebar = ({ bookshelves }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([]);

    if (!user) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newBookshelf = {
            name: name,
            user: user
        }

        try {
            let createdBookshelf = await dispatch(createBookshelf(newBookshelf));
            if (createdBookshelf) {
                await dispatch(getBookshelves());
                history.push(`/shelf/${createdBookshelf.id}`)
                setName("");
            }
        }
        catch (response) {
            const data = await response.json();
            if (data && data.errors) setErrors(data.errors);
        }
    }

    return (
        <div className='bookshelf-sidebar-container'>
            <div className='bookshelves-header'>
                <span style={{ fontWeight: 'bold', fontFamily: "'Lato',serif" }}>Bookshelves</span>
            </div>
            <div>
                {bookshelves.map(bookshelf => (
                    <div key={`bookshelf-${bookshelf.id}`}>
                        <NavLink className="bookshelf-links" to={(bookshelf.name !== "All") ? `/shelf/${bookshelf.id}` : '/shelf'}>
                            {bookshelf.name} ({bookshelf.Books ? bookshelf.Books.length : 0})
                        </NavLink>
                        <br></br>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder='Add new bookshelf'
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                    <button>Add</button>
                </form>
            </div>
        </div >
    )
}

export default BookshelvesSidebar
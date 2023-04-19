import { Redirect, useHistory } from "react-router-dom";
import { pageErrors } from "./data";
import "./PageNotFound.css";

const PageNotFound = () => {
    const history = useHistory();
    const rNum = (num) => Math.floor(Math.random() * Math.floor(num))
    const pageError = pageErrors[rNum(6)];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="page-error-parent-container">
                <div className="page-error-quotes">
                    <p className='page-error-message'>{pageError.errorMessage}</p>
                    <p className='page-error-quote'>{pageError.quote}</p>
                    <p>
                        <span>-</span>
                        {pageError.quoteAuthor === "Robert Frost" ?
                            <>
                                <span className='page-error-author'>adapted from </span>
                                <span className='page-error-book'>{pageError.quoteBook}</span>
                                <span className='page-error-author'> by {pageError.quoteAuthor}</span>

                            </>

                            :
                            <>
                                <span className='page-error-author'>{pageError.quoteAuthor}, </span>
                                <span className='page-error-book'>{pageError.quoteBook}</span>
                            </>

                        }
                    </p>
                </div>
                <div className='page-error-images'>
                    <img src={pageError.bookImage} alt=""></img>
                    <img className="page-error-author-image" src={pageError.authorImage} alt=""></img>
                </div>
            </div>

            <button className="page-error-button" onClick={() => history.push('/')}>Back to BookNook homepage</button>
        </div >



    )
}

export default PageNotFound
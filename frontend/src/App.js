import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Bookshelves from "./components/Bookshelves";
import Books from "./components/Books";
import BookDetails from "./components/Bookshelves/BookTable";
import ReviewCreateEdit from "./components/Review/ReviewCreateEdit";
import SignupForm from "./components/SignupForm";
import HomepageLoggedIn from "./components/Homepage/HomepageLoggedIn";
import Friends from "./components/Friends";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/myfeed">
            <HomepageLoggedIn />
          </Route>
          <Route path='/books/:bookId'>
            <Books />
          </Route>
          <Route path='/shelf/:shelfId'>
            <Bookshelves />
          </Route>
          <Route path='/shelf'>
            <Bookshelves />
          </Route>
          <Route path='/reviews/edit/:bookId/:reviewId'>
            <ReviewCreateEdit />
          </Route>
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route path='/friends'>
            <Friends />
          </Route>
        </Switch>

      )}
    </>
  );
}

export default App;

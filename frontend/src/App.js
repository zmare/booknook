import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import Bookshelves from "./components/Bookshelves";
import Books from "./components/Books";
import ReviewCreateEdit from "./components/Review/ReviewCreateEdit";
import SignupForm from "./components/SignupForm";
import HomepageLoggedIn from "./components/Homepage/HomepageLoggedIn";
import Friends from "./components/Friends";
import Lists from "./components/Lists";
import ListDetail from "./components/Lists/ListDetail"
import PageNotFound from "./components/PageNotFound";

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
          <Route exact path="/myfeed">
            <HomepageLoggedIn />
          </Route>
          <Route exact path='/books/:bookId'>
            <Books />
          </Route>
          <Route exact path='/shelf/:shelfId'>
            <Bookshelves />
          </Route>
          <Route exact path='/shelf'>
            <Bookshelves />
          </Route>
          <Route exact path='/signup'>
            <SignupForm />
          </Route>
          <Route exact path='/friends'>
            <Friends />
          </Route>
          <Route exact path='/community'>
            <Lists />
          </Route>
          <Route exact path='/list/:listId'>
            <ListDetail />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

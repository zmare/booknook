# booknook

Booknook is a web application that aims to replicate Goodreads, allowing users to browse books, read reviews, and create their very own bookshelf and lists.  Booknook is built with a Express/Sequelize backend and a React/Redux frontend for responsiveness.

[Click here to view booknook's Live Site](https://booknookzm.onrender.com/)

<img width="700" alt="Screen Shot 2023-05-09 at 2 52 34 PM" src="https://github.com/zmare/booknook/assets/108374623/274a5ecb-f0c2-4bd5-bf3a-a3370b9d9d84">

## Navigate to:

[User Stories](https://github.com/zmare/booknook/wiki/User-Stories)\
[Feature List](https://github.com/zmare/booknook/wiki/Feature-List)\
[Database Schema](https://github.com/zmare/booknook/wiki/Database-Schema)\
[Backend Routes](https://github.com/zmare/booknook/wiki/API-Routes)\
[Wireframe](https://github.com/zmare/booknook/wiki/Wireframe)\

## Technologies/Frameworks Used:

### Frontend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-676E77?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/-Sequelize-D71F00?style=for-the-badge&logo=sequelize)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### Deployment:
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)



# Features:

## Demo User Implementation:

* Feel free to test the site features through clicking the "Demo User" button which will directly log you in


## Sign up a User:

* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out
* 
<img width="700" alt="Screen Shot 2023-05-09 at 2 52 55 PM" src="https://github.com/zmare/booknook/assets/108374623/187f8ec3-a2e9-46c2-b9b0-acb8774b0ba8">
<img width="700" alt="Screen Shot 2023-05-09 at 2 53 23 PM" src="https://github.com/zmare/booknook/assets/108374623/24cdbd4a-2447-4c95-be61-cc027fefae8c">

## User Login, Authentication, and Authorization:

* You are able to login as long as your credentials are stored within the database (hashed)
  * Authorization is handled using JWT 
* If there are no matching credentials an error message is displayed


## Create a Bookshelf
* Users are able to create a bookshelf and add books to that shelf
<img width="700" alt="Screen Shot 2023-05-09 at 2 53 38 PM" src="https://github.com/zmare/booknook/assets/108374623/8782c561-a645-43e6-8959-34eb7bd1e737">

## See Details about a Book 
* Users can click on a book to see a summary of the book as well as user reviews
<img width="700" alt="Screen Shot 2023-05-09 at 2 54 23 PM" src="https://github.com/zmare/booknook/assets/108374623/00036b0b-0e14-419d-9fed-5efd4a20fa88">


## Write a review 
* Users can write, edit, and delete a review they leave for a book 
<img width="700" alt="Screen Shot 2023-05-09 at 3 24 43 PM" src="https://github.com/zmare/booknook/assets/108374623/8ceac9fc-b1c9-4d25-a295-7693ba0ff488">


## Create a List 
* Users can create a list that is availble for all users to view. 
<img width="700" alt="Screen Shot 2023-05-09 at 2 53 52 PM" src="https://github.com/zmare/booknook/assets/108374623/66ea2482-24fb-478a-9675-e1994353c7c8">


## Add Books to Bookshelf or List 
* Users can add or remove books from the bookshelves and lists they have created 
<img width="700" alt="Screen Shot 2023-05-09 at 3 25 47 PM" src="https://github.com/zmare/booknook/assets/108374623/676bc318-f03f-4f18-9fd4-bf5afbf7a9e6">


## Add or Remove Friends
* Users can send and receive friend request to and from other users. 
* Users can delete friend requests they have sent. 
* Users can view all their friends 
<img width="700" alt="Screen Shot 2023-05-09 at 3 24 03 PM" src="https://github.com/zmare/booknook/assets/108374623/295f737b-6748-4b12-b07d-12655f2db5b6">

## Features Coming Soon:
* Search functionality! 




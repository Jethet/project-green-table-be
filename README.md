# The Green Table 


<br>


## Description

(The text uses 'they' and 'their' instead of 'he', 'she', 'his' and 'her')

The Green Table is an app that is designed for the user who would like to get together with friends for a meal that is healthy, made with healthy and sustainable products. Keywords are sharing with friends, having a good time together, green living, and locally produced, organic or fair trade products. The user and many of their friends have chosen a sustainable way of living and make responsible choices that fit this way of life. They are vegetarians or vegans, often out of conviction. Some of them do not drink alcohol. They want to respect each others choices and preferences when having meals together.

The app offers the user (who can be either host or guest) the possibility to organise events, which are called 'tables'. The user who organises a table will automatically be the host of that table. The tables are on invitation basis, and only the host can invite guests. Both host and guests can see the preferences (i.e. vegetarian, vegan, gluten-free, non-alcohol) of the user. The host sets the maximum for the number of guests, and the time and location for the table. A table can be breakfast, lunch, dinner, or drinks & bites. 

The central component of the app is the table page that offers the functionality to:

- choose the date when a user wants to create a table;
- indicate which dishes/drinks the user will bring as the host of the table;
- invite friends to the table;
- edit or cancel the table that has been organised.

When the user chooses a date to organise a table, they can search by name for the friends they want to invite. Only people who sign up for the app can be on the list of friends. The host can tick a box to indicate the type of food/drink they will bring themselves. The guests receive the invitation and can accept. The guests can indicate what they will bring. After creating the table, both host and guests can read the details by clicking on the list in their user profile. For the host, there is a button on the table form to cancel the event, and the guests will be informed automatically when the host cancels the table. The host can change the table and send a new invitation to the previously invited guests, with the option of adding a new guest. The guests will have to again accept the invitation to confirm they will attend. After accepting an invitation, the guest can cancel their attendance.

To use the app, someone has to sign up. They have to provide their username, city and email address, and set a password. They have to tick a box to agree with the privacy and liability statement of The Green Table. After signing up, the user can create their user profile with personal details (name and city) and their preferences regarding food and drink (vegetarian; vegan; gluten-free; non-alcoholic drinks). The user can upload a profile picture as well. The profile will show the tables hosted by the user, and the tables for which the user has accepted an invitation as guest (past and present). There are buttons to edit the user profile details (name, city, password, picture) and to delete the profile. The user can log out on the profile page.


<br>

## User Stories

- **error**- As a user I want to see when there is an error, and get a clear message of what I have to do next.
- **homepage** - As a user I want to see the welcome page that gives me information about the app.
- **sign up** - As a user I want to be able to sign up to have access to the app and use it.
- **login** - As a user I want to be able to log in so that I can access my account and use the app.
- **logout** - As a user I want to be able to log out from the app so that I can make sure no one will access my account.
- **create tables** - As a user in the role of host, I want to be able to create tables of different types at different dates and times, and indicate food details and maximum number of guests.
- **search friends** - As a user in the role of host, I want to be able to search and invite friends to the table I organise. 
- **edit/delete tables** - As a user in the role of host, I want to be able to change or cancel tables that I have organised.
- **see table details** - As a user in the role of host, I want to be able to see the details of the tables I have created and the guests who have accepted.
- **receive/accept invites** - As a user in the role of guest, I want to be able to receive and accept invitations for tables.
- **see table details** - As a user in the role of guest, I want to be able to see the details of the tables I will attend. 
- **profile** - As user I want to create my profile page and add my personal information and picture.
- **edit profile** - As a user I want to be able to edit my profile.
- **delete profile** - As a user I want to be able to delete my profile.

<br>

## Minimal Viable Product (MVP)

1. Homepage (splashpage)
2. Page for sign-up
3. Page for log-in
4. Table page with form to create table, invite friends, communicate information regarding food and drinks, plus a button to delete own tables.
5. Profile page with options to add avatar/picture, dropdown menu to edit username and city, change password or delete account, and button to log out.
6. Page with credits for pictures and font used for the app.


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                      | Component            | Permissions | Behavior                                              |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                    | HomePage         | public `<Route>`           | Home page
| `/signup`              | SignupPage       | anon only  `<AnonRoute>`   | Signup form, link to login, navigate to CalendarPage after signup
| `/login`               | LoginPage        | anon only `<AnonRoute>`    | Login form, link to signup, navigate to CalendarPage after login         
| `/calendar`            | CalendarPage     | user only `<PrivateRoute>` | Show month calendar   BACKLOG
| `/table`               | CreateTablePage  | user only `<PrivateRoute>` | Shows form to create a table                                           
| `/table/:id`           | TableDetailsPage | user only `<PrivateRoute>` | Shows details of table created by host                              
| `/table/:id/edit`      | TableEditPage    | user only `<PrivateRoute>` | Shows table for update or delete action
| `/table/invitation/:id`| InvitationPage   | user only `<PrivateRoute>` | Details of guest's table invitation                              | `/profile/:id`         | ProfilePage      | user only `<PrivateRoute>` | Shows user profile page
| `/profile/:id/edit`    | ProfilePage      | user only `<PrivateRoute>` | Shows user profile for editing
| `/profile/:id/overview`| ProfilePage      | user only `<PrivateRoute>` | Shows user's tables, as host and as guest
| `/credits`             | CreditsPage      | user only `<PrivateRoute>` | Shows acknowledgements for images and font



## Pages 

- SplashPage
- SignupPage
- LoginPage
- CalendarPage  BACKLOG
- CreateTablePage
- InvitationPage
- TableEditPage
- TableUpdatePage
- ProfilePage
- CreditsPage

## Components

- Search (on CreateTablePage)
- Navbar

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser()


## Backend routes:

| **Method** | **Route**| **Description**|
|---|---|---|                                         
| `POST`  | `/login`      | Sends Login JSON data to the server with email and password.        
| `POST`  | `/signup`     | Sends Sign Up JSON data to the server with name, email and password. Creates user in the DB.
| `GET`   | `/signout`    | Sends signout request to the server. Server destroys login session.
| `GET`   | `/profile`    | Get current user profile JSON data
| `PUT`   | `/profile/:id`| Private route. Sends updated profile JSON data to server. Server updates user in DB.
| `DELETE`| `/profile/:id`| Private route. Deletes the user's profile from the server and updates DB. 
| `POST`  | `/table`      | Sends Table JSON data to server, create new table.
| `GET`   | `/table/:id`  | Get one table JSON data from server.
| `GET`   | `/table/all`  | Get list of all tables of one user.
| `DELETE`| `/table/:id`  | Delete one table by id from database.
| `PUT`   |  `/table/:id` | Update one table by id with JSON data, send to server.
| `GET`   | `/search`     | Search for users by name (provided in request query).




<br>

## Models

User model

```javascript
{ username: {type: String, required: true},
  password: {type: String, required: true},
  imageURL: String,
  city: String,
  preferences: {vegetarian: Boolean, vegan: Boolean, glutenFree: Boolean, nonAlcohol: Boolean},
  table: [{type: Schema.Types.ObjectId, ref: 'Table'}]
}
```

Table model

```javascript
{
    date: {type: String, required: true},
    time: {type: String, required: true},
    address: {type: String},
    city: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    foodAndDrinks: [{type: Schema.Types.ObjectId, ref: 'FoodAndDrinks'}],
    guests: [userId: {type: Schema.Types.ObjectId, ref: 'User'}]
}
```

FoodAndDrinks model

```javascript

dishType: {
    type: String,
    enum: [
      "hotDish",
      "coldDish",
      "snack",
      "desert",
      "nonAlcoholDrink",
      "alcoholDrink"
    ]
  },
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  isGlutenFree: { type: Boolean, default: false },
  isAlcohol: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tableId: { type: Schema.Types.ObjectId, ref: "Table" }
  
}

```

<br>


## Backlog

- Include calendar with options to click and create tables or see table details
- Offer guest option to accept/decline invitation
- Offer user option to see address on map
- Page with links to suitable recipe websites
- Option for user to share recipes


<br>

## Technology

- Javascript
- Node JS
- Express
- React
- HTML
- CSS
- MongoDB
- Mongoose
- Heroku for app deployment

<br>




### GitHub

The url to your repository and to your deployed project

[Client Repository Link](https://github.com/Jethet/project-green-table-fe)

[Server Repository Link](https://github.com/Jethet/project-green-table-be)


[Deploy Link]()



<br>



### Slides

The url to your presentation slides

[Slides Link](

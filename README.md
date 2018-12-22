# firebase-blog
A blog hosting web application using firebase and react.js

## Demo

You can view [Manual test plan](https://github.com/NeoWu1216/firebase-blog/blob/master/test/Manual%20Test%20Plan.pdf) for instructions and demos.  
It covers almost everything below in great details

## Setup 

To install node dependencies, run `npm install` in the project directory  
Then you should create a new google firebase project and set up according to [Manual test plan](https://github.com/NeoWu1216/firebase-blog/blob/master/test/Manual%20Test%20Plan.pdf). 

## Run
To start the project, run `npm start` in the project directory  
Then you can access the website from [http://localhost:3000/](http://localhost:3000/)

## Features

### Authentication
- Unauthenticated users can sign up by providing their email and password
- Unauthenticated users can sign in or reset password 
- Authenticated users can signout
- All the errors shows up correctly, and there are route guarding to prevent evil action performed by users (e.g. sign in twice)

### Blogs 
- Anyone can view blogs, but only authenticated users can create new blog (possibly with a quota)
- Only the blog owner can delete his/her own blog
- Include date, author (name, avatar) link, title, and content information
- Support raw text and html view
- Support tabular or card view for list of blogs
- Support search or sort operations to view specific blogs in the right order
- Authenticated users can like a blog, which will be stored in their favorite page. This will also increase blog popularity by 1.

### Comments
- Anyone can create a new comment (including anonymous users)
- Both the comment poster or blog owner can delete the comment
- When a blog is deleted, all corresponding comments must be deleted (as well in firebase)
- Include date, author link, and content information
- Support searching or sorting opeartions to view specific comments in the right order

### Customizations
- Authenticated users have a main profile page, which includes all blogs or comments they posted
- Authenticated users have an avatar, which can be configured by uploading images
- Authenticated users can listen to music, which can be paused during session, or configured by providing a youtube id
- Authenticated users can subscribe to another user after browsing into their profile page
- Authenticated users have a favorite page consists of blogs they liked or users they subscribed to, which will update with new changes (e.g. blog post by users subscribed to)


## Testing
There are [selenium tests](https://github.com/NeoWu1216/firebase-blog/tree/master/test/selenium) available.  
You should create several accounts in app, install chrome driver and update ``users.py`` accordingly.  
After server started in [http://localhost:3000/](http://localhost:3000/), run ``python main.py`` to start test (or regression tests) 


## TODO

- Fix weird refresh update issues
- Make a custom text editor to avoid xss attack on user-inputted html
- Limit user activity (per day) in database
- Cache data to avoid repeated reads
- Walkaround youtube music autoplay in chrome
- Deploy as firebase app if no concerns

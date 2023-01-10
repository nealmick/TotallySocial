# Totally.Social
#### This platform is meant to be used to share ideas and build connections.

The frontend is built with React, Bootstrap and a bit of CSS.  The backend server is a Django Rest Framework API.

The main content item is a post.  Each post can be up to 240 characters and may include images.  Posts may also have comments, likes, and can be reposted.  The project includes users with authentication and profiles.  The main view is a feed of followed users posts.  Each user has a profile picture, status, follower count, and other information.  Users can also be messaged directly, and recent conversations are displayed in the message inbox view.




    Project Structure:
    
    mysite - Backend django rest framework api:
          1.  Mysite - Default django app.
          2.  Accounts - Authorization, Authentication, and identity.
          3.  Profiles - Account images, Followers, Status, etc...
          4.  SM - Main django app for posts, feed, and messages, with searilizers, models, and views.
         
    sm-web - Frontend react UI/UX components:
          1.  Profiles - Profile badge, follower button, message button, and other account related UI.
          2.  Posts - Post content, like button, images, comments, feed, and other components.
          3.  Lookup - Handles interaction with api, GET and POST requests....



# Live: https://totally.social

#### Install:

```bash
git clone https://github.com/nealmick/TotallySocial

pip install -r requirements.txt

python3 manage.py runserver

npm install

npm run build

npm start

```

#### Screenshots:
<img src="https://i.imgur.com/QgOx4Bh.png" width="1000" height="500" />
<img src="https://i.imgur.com/oK79FaY.png" width="1000" height="500" />
<img src="https://i.imgur.com/aeW43Dt.png" width="1000" height="500" />


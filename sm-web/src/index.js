import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProfileBadgeComponent,ProfileBadgeComponentSmall} from './profiles';
import reportWebVitals from './reportWebVitals';
import {FeedComponent, PostComponent ,PostDetailComponent,SearchComponent,ConversationComponent,MessageComponent,PostPinnedComponent,ExploreComponent} from './posts';

const appEl = document.getElementById('root')
if(appEl){
  ReactDOM.render( <App />,appEl);
}
const e = React.createElement
const postsEl = document.getElementById("chirp")
if(postsEl){
  ReactDOM.render(e(PostComponent,postsEl.dataset),postsEl);

}
const exploreEl = document.getElementById("chirp-explore")
if(exploreEl){
  ReactDOM.render(e(ExploreComponent,exploreEl.dataset),exploreEl);

}
const postsFeedEl = document.getElementById("chirp-feed")
if(postsFeedEl){
  ReactDOM.render(e(FeedComponent,postsFeedEl.dataset),postsFeedEl);
}


const postsSearchEl = document.getElementById("chirp-search")
if(postsSearchEl){
  ReactDOM.render(e(SearchComponent,postsSearchEl.dataset),postsSearchEl);
}


const conversationsEl = document.getElementById("chirp-conversations")
if(conversationsEl){
  ReactDOM.render(e(ConversationComponent,conversationsEl.dataset),conversationsEl);
}

const messageEl = document.getElementById("chirp-message")
if(messageEl){
  ReactDOM.render(e(MessageComponent,messageEl.dataset),messageEl);
}

const userProfileBadeSmallEl = document.querySelectorAll(".chirp-profile-badge-small")

userProfileBadeSmallEl.forEach(container=>{
  ReactDOM.render(
    e(ProfileBadgeComponentSmall,container.dataset)
    ,container);
})

const userProfileBadeEl = document.querySelectorAll(".chirp-profile-badge")

userProfileBadeEl.forEach(container=>{
  ReactDOM.render(
    e(ProfileBadgeComponent,container.dataset)
    ,container);
})
const postDetailElements = document.querySelectorAll(".chirp-detail")

postDetailElements.forEach(container=>{
  ReactDOM.render(
    e(PostDetailComponent,container.dataset)
    ,container);
})

const postPinnedElements = document.querySelectorAll(".chirp-pinned")

postPinnedElements.forEach(container=>{
  ReactDOM.render(
    e(PostPinnedComponent,container.dataset)
    ,container);
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

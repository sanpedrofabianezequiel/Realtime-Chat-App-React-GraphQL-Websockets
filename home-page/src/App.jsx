 import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css'

import {Container} from 'shards-react';

import "./index.css";

import Chat from 'chat/Chat'

const App = () => (
    <Container>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis porro harum assumenda labore laboriosam. Autem cum nobis, possimus, nihil officia maxime inventore molestias modi voluptatem reiciendis dolorem cumque placeat sed.</p> 
       <h1>Chat</h1>
       <Chat />
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex eius ducimus praesentium cupiditate blanditiis enim ipsam accusantium voluptate totam. Doloremque tempora, quae nesciunt cumque molestiae eius dolores voluptatum eum impedit.</p>
    </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
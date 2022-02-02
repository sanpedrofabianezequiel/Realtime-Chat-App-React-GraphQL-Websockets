import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
import {Container,Row, Col,FormInput,Button} from 'shards-react';

  const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache()
  });


  const GET_MESSAGES = gql`
    query {
        messages {
            id,
            content,
            user
        }
    }
  `;


  const Messages = ({user})=>{
      const {data} =useQuery(GET_MESSAGES);
      if(!data) return null;

      return (
        <>
        <div>
            {
                data.messages.map(({id,user:messageUser,content})=>(
                    <div style={{
                        display:'flex',
                        justifyContent: user === messageUser ? 'flex-end': 'flex-start',
                        paddingBottom:'1em'
                    }}>

                        {/* Avatar */}
                        {
                            user !== messageUser && (
                                <div style={{
                                    height:50,
                                    width:50,
                                    marginRight:'0.5em',
                                    border:'2px solid #e5e6ea',
                                    borderRadius:25,
                                    textAlign:'center',
                                    fontSize:'18pt',
                                    marginTop:5
                                }}>
                                    {messageUser.slice(0,2).toUpperCase()}
                                </div>
                            )
                        }

                        <div style={{
                            background: user === messageUser ? '#58bf56':'#e5e6ea',
                            color: user === messageUser ? 'white' : 'black',
                            padding:'1em',
                            borderRadius:'1em',
                            maxWidth:'60%'
                        }}>
                            {content}
                        </div>

                    </div>
                ))
            }
        </div>
        </>
      );
  }


  const Chat = ()=>{

    const [state,stateSet] = React.useState({
        user:'ezequiel',
        content:''
    });


    const onSend = ()=>{
        if(state.content.length > 0){

        }

        stateSet({
            ...state,
            content:''
        })
    }
      return(
          <Container> 
              <Messages  user ={state.user} /> 
              <Row>
                    <Col xs={2} style = {{padding:0}}>
                        <FormInput label ='User' value={state.user} onChange={ (evt)=> stateSet({
                            ...state,
                            user:evt.target.value
                        })} />
                    </Col>

                    <Col xs={8} >
                        <FormInput label ='User' value={state.content} onChange={ (evt)=> stateSet({
                            ...state,
                            content:evt.target.value
                        })}

                        onKeyUp= {(evt)=>{
                            if(evt.keyCode ===13){
                                onSend();
                            }
                        }}

                        />
                    </Col>

                    <Col xs={2} style={{padding: 0}} >
                        <Button onClick={()=>onsuspend()}>
                            Send
                        </Button>
                    </Col>
              </Row>
          </Container>
      );
  }

  export default ()=>(
      <ApolloProvider client={client}>
          <Chat />
      </ApolloProvider>
  );
    
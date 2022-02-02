const {GraphQLServer,PubSub} = require('graphql-yoga');


const messages = [];

const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }

    type Subscription {
        messages:[Message!]
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user : String!,content: String!) : ID!
    }
`;



const subscribers = [];
const onMesagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
    Query:{
        messages: ()=> messages,
    },
    Mutation:{
        postMessage:(parent,{user,content})=>{
            const id = messages.length;
            //Save inside me array
            messages.push({
                id,
                user,
                content
            })

            //Alertamos cuando recibimos un nuevo mensaje
            subscribers.forEach((fn)=>fn())
            return id;
        }
    },
    Subscription:{
        messages:{
            subscribe:( parent,args,{pubsub})=>{
                const channel = Math.random().toString(36).slice(2,15);
                //Cada mensaje nuevo que recibimos lo enviamos como callback al array de subcripciones
                //Al mismo canal creado
                onMesagesUpdates(()=> pubsub.publish(channel,{messages}));
                //Apenas recibo la data a subcribo
                setTimeout(() => {
                    pubsub.publish(channel,{messages})
                }, 0);
                return pubsub.asyncIterator(channel)
            }
        }
    }
}



const pubsub =  new PubSub();

const server =  new GraphQLServer({
    typeDefs,
    resolvers,
    context:{pubsub}
});

server.start(({port}) =>{
    console.log(`Server on http://localhost:${port}`);
})
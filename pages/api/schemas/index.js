import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Space {
        id: ID! 
        name: String!
    }

    type Query {
        hello: String!
    }
`;
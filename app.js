const express = require("express")
//const graphqlHTTP = require("express-graphql")
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")
const mongoose = require("mongoose")
const port = "3000"

const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/graphql',{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log(`Data base is now runnning on ${port}`))
.catch(err=>console.log(err));
mongoose.connection.on("error", err=>console.log(`database connection error, ${err}`));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
)

/***
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-uox7n.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options).then(
    () => app.listen(3000, console.log("Server is running"))
    ).catch(error => {throw error})

*/

app.listen(port, () => console.log("Server is running on localhost:3000"))
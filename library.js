require("dotenv").config()
const express = require("express")
const app = express()
const {MongoClient, ObjectId} = require("mongodb")

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"
const dbURL = process.env.dbURL

class Library {
    constructor(dbURL, dbName, collName) {
        this.dbURL = dbURL;
        this.dbName = dbName;
        this.collName = collName;
        this.dbClient;
    }

// sets the client up, and imports the MongoClient 
async client(){
    console.log(`Connecting to ${this.dbURL}...`)
    this.dbClient = MongoClient.connect(this.dbURL)
    console.log("Connected to database")
    return this.dbClient;
}

// fires off client method when test method is triggered
async  test(){
    const client = await this.client()
    client.close()
}

//gets the db and collection from mongo, returns the collection
async collection(){
    // instantiate connection (gives us access to Mongo methods)
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection(this.collName);
    return collection;

}

async allBooks(){
    const collection = await this.collection();
    return collection.find({}).toArray()
    
}

async findOneBook(id){
    const docId = new ObjectId(id)
    const collection = await this.collection()
    return collection.find({_id: docId}).toArray()
    //another solution return collection.findOne(docId)
}

async findManyBooks(query){
    const collection = await this.collection()
    return collection.find(query).toArray()
}

async addBook(info){
    const collection = await this.collection()
    if(!(info instanceof Object)) throw Error ("Incorrect data type. Takes object.")

    const result = await collection.insertOne(info)
    console.log("Book sucessfully added")
    return result
}

async changeBook(id, newInfo){
    const mongoId = new ObjectId(id)
    const collection = await this.collection()
    const infoObj = { $set: newInfo }
    await collection.updateOne({_id: mongoId}, infoObj)
    console.log(`Book successfully updated`)
}

async removeBook(id) {
    const mongoId = new ObjectId(id)
    const collection = await this.collection()
    const result = await collection.deleteOne({ _id: mongoId })
    if(result.deleteCount ===0) return "Nothing to delete"
 
}

}


module.exports = Library;



// app.listen(PORT, HOST, ()=> {
//     console.log(`[Server] listening on ${HOST}:${PORT}`)
// })
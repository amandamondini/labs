require("dotenv").config()
const Library = require("./library")
const dbURL = process.env.dbURL


    const collection = new Library(dbURL, "library", "books")
    collection.test()
   

async function display(){
    const allBooks = await collection.allBooks()
    allBooks.forEach(book => {
        console.log(book)
    })
} //display()

//collection.allBooks().then(data => console.log(data)) - does the same thing as above function (don't need the for each if we use .toArray on the library file)

async function findOne(){
    const findOneBook = await collection.findOneBook("649b0f083ac8fc141a0b191c")
    findOneBook.forEach(book => console.log(book))

} //findOne()

async function findMany(){
    console.log(await collection.findManyBooks({
        $or: [
            {author: "Smart Guy"},
            {author: "Unknown"}
        ]
    }))
} //findMany()

const newBook = {
    title: "New Book",
    author: "New Author",
    copies: 1000
}

async function addBook(newBook){
    await collection.addBook(newBook)
    
} //addBook(newBook)

async function changeBook(){
    await collection.changeBook("649b2fe9486e978fc0a26953", {"title": "Harry Potter and the Chamber of Secrets", "author": "JK Rowling", "copies": 6})
} //changeBook()

async function removeBook(){
    await collection.removeBook("649b3036b7c2b5dd9fb17f8d")
} removeBook()



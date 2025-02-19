import {useState, useContext} from "react";// Step 1
import {DataContext} from "../App" //Step 2

export default function Books(){
    const {booklist,setBookList}=useContext(DataContext); //Step 3
    const [books,setBooks] =useState(booklist);
    const [currBook,setCurrBook]=useState(booklist[0]);
    function deleteBook(e){
        var bookIndex=parseInt(e.target.id);
        var list=books;
        list.splice(bookIndex,1);
        setBooks(list);
        setBookList(list);
    }
    function setBook(e){
        var id=e.target.value;
        setCurrBook(booklist[id]);
    }
    return(
      
                <div>
                <h1 className="text-3xl">Future Home of Books</h1>
                <h2 className="text-2x1">You have {booklist.length} books</h2>

                <ul>
                    {booklist.map(((book,index)=> <li>Book #{index+1} {book.title}</li>))}
                </ul>
                </div>
    )
            
    
    
    }
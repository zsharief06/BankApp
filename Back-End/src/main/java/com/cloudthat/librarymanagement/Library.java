package com.cloudthat.librarymanagement;
import exceptions.BookAlreadyExistsException;

import java.util.HashMap;
import java.util.Map;

public class Library {

    private Map<String, Book> books;

    public Library(){

        books= new HashMap<>();
    }

    public void addBook(Book book) throws BookAlreadyExistsException {
        if(books.containsKey(book.getIsbn())){
            System.out.println("Book already exists");
        }
        else{
            books.put(book.getIsbn(),book);
            System.out.println("Book Added Successfully");
            throw new BookAlreadyExistsException("Book with ISBN"+ book.getIsbn()+"already exists");
        }
    }
    public void removeBook(String isbn){
        if(books.containsKey(isbn)){
            Book removedBook = books.remove(isbn);
            System.out.println("Removed: "+removedBook);

        }
        else{
            System.out.println("No book with ISBN: "+isbn+"is found");
        }
    }
    public void displayAllBooks(){
        if(books.isEmpty()){
            System.out.println("No books in the library");
        }
        else{
            System.out.println("Books in the library: ");
            books.forEach((isbn,book) -> System.out.println(book));
            //            books.values().forEach(System.out::println);
        }
    }

    public void findByIsbn(String isbn){
        Book book = books.get(isbn);
        if(book != null)
        {
            System.out.println("Book Found: ");
            System.out.println(book);
                                                            } else {
            System.out.println("Book Not Found!");
        }
    }

    public void findByTitle(String title) {
        for (Map.Entry<String, Book> entry : books.entrySet()) {
            if (entry.getValue().getTitle().equals(title)) {
                System.out.println("Book Found");
                System.out.println(entry.getValue());
            } else {
                System.out.println("Book not found");
            }
        }
    }
}




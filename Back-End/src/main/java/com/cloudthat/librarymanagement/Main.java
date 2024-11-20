package com.cloudthat.librarymanagement;

import exceptions.BookAlreadyExistsException;

public class Main {
    public static void main(String[] args) throws BookAlreadyExistsException {

        System.out.println("Welcome to library management system");
        Library lib=new Library();
        lib.addBook(new Book("James Gosling","123","Intro to Java"));
        lib.addBook(new Book("Sudha Murthy","120","Data structures"));
        //lib.removeBook("120");
        lib.displayAllBooks();
        lib.findByIsbn("120");
        lib.findByTitle("Intro to Java");


    }
}
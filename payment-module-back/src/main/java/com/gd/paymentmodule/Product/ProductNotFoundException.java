package com.gd.paymentmodule.Product;

public class ProductNotFoundException extends RuntimeException {
    
    public ProductNotFoundException(long id) {
        super("Could not find product " + id);
    }
}

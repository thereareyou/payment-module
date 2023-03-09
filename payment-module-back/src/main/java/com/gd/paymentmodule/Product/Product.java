package com.gd.paymentmodule.Product;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
    
    @Id
    @GeneratedValue
    private long id;

    private String title;
    private BigDecimal price;
    private int quantity;

    public Product() {}
    
    public Product(String title, BigDecimal price, int quantity) {
        this.title = title;
        this.price = price.setScale(2, RoundingMode.HALF_UP);
        this.quantity = quantity;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(BigDecimal price) {
        this.price = price.setScale(2, RoundingMode.HALF_UP);
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || this.getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) &&
            Objects.equals(title, product.title) &&
            Objects.equals(price, product.price) &&
            quantity == product.quantity;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, title, price, quantity);
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", price='" + price + '\'' +
            ", quantity='" + quantity + '\'' +
            '}';
    }
}

package com.gd.paymentmodule.BasketRecord;

import java.math.BigDecimal;
import java.math.RoundingMode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.gd.paymentmodule.Product.Product;

@Entity
public class BasketRecord {
    
    @Id
    @GeneratedValue
    private long id;

    @OneToOne
    private Product product;
    private int quantity;
    private BigDecimal totalPrice;

    public BasketRecord() {}

    public BasketRecord(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
        this.totalPrice = calculateBasketRecordTotalPrice(2);
    }

    public long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
        this.totalPrice = calculateBasketRecordTotalPrice(2);
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.totalPrice = calculateBasketRecordTotalPrice(2);
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal calculateBasketRecordTotalPrice(int resultAccuracy) {
        return product.getPrice().multiply(BigDecimal.valueOf(quantity))
            .setScale(resultAccuracy, RoundingMode.HALF_UP);
    }

    @Override
    public String toString() {
        return "BasketRecord{" +
            "id=" + id +
            ", product='" + product.getTitle() + "'" +
            ", quantity='" + quantity + "'" +
            ", total price='" + totalPrice + "'" +
            '}';
    }
}

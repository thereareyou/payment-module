package com.gd.paymentmodule.Basket;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.gd.paymentmodule.BasketRecord.BasketRecord;

@Entity
public class Basket {
    
    @Id
    @GeneratedValue
    private long id;
    @OneToMany
    List<BasketRecord> basketRecords;

    public Basket() {}

    public Basket(List<BasketRecord> basketRecords) {
        this.basketRecords = basketRecords;
    }

    @Override
    public String toString() {
        return "Basket{" +
            "BasketRecord" +
            '}';
    }
}

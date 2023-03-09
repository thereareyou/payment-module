package com.gd.paymentmodule.BasketRecord;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.gd.paymentmodule.Product.Product;



@RestController
@RequestMapping("/basket")
public class BasketRecordController {
    
    private BasketRecordRepository basketRecordRepository;

    @Autowired
    public BasketRecordController(BasketRecordRepository basketRecordRepository) {
        this.basketRecordRepository = basketRecordRepository;
    }

    @GetMapping
    public List<BasketRecord> getAllBasketRecords() {
        return basketRecordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> addNewBasketRecord(@RequestBody Product product) {
        
        if(basketRecordRepository.existsByProduct(product)) {
            return new ResponseEntity<String>(
                "Product has already chosen and located in basket",
                HttpStatus.CONFLICT
            );
        }

        BasketRecord basketRecord = basketRecordRepository
            .save(new BasketRecord(product, 1));
        
        return new ResponseEntity<>(basketRecord, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBasketRecord(@PathVariable long id) {

        basketRecordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public float calculateBasketRecordTotalPrice(float price, int amount) {
        return price * amount;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceBasketRecord(@RequestBody BasketRecord newBasketRecord,
                                                 @PathVariable long id) {
        BasketRecord refreshedBasketRecord = basketRecordRepository.findById(id)
            .map(basketRecord -> {
                basketRecord.setProduct(newBasketRecord.getProduct());
                basketRecord.setQuantity(newBasketRecord.getQuantity());
                return basketRecordRepository.save(basketRecord);
            })
            .orElseGet(() -> {
                return basketRecordRepository.save(newBasketRecord);
            });

            return new ResponseEntity<>(refreshedBasketRecord, HttpStatus.CREATED);
    }
    
}

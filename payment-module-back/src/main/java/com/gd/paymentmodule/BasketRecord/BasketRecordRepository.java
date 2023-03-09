package com.gd.paymentmodule.BasketRecord;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.gd.paymentmodule.Product.Product;

@RepositoryRestResource
public interface BasketRecordRepository extends JpaRepository<BasketRecord, Long> {
    boolean existsByProduct(Product product);
}

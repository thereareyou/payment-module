package com.gd.paymentmodule.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {
    
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable long id) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
            
        return product;
    }

    @PostMapping
    public ResponseEntity<?> addNewProduct(@RequestBody Product product) {
        
        Product savedProduct = productRepository.save(product);

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> replaceProduct(@RequestBody Product newProduct, @PathVariable long id) {

        Product refreshedProduct = productRepository.findById(id)
            .map(product -> {
                product.setTitle(newProduct.getTitle());
                product.setPrice(newProduct.getPrice());
                product.setQuantity(newProduct.getQuantity());
                return productRepository.save(product);
            })
            .orElseGet(() -> {
                return productRepository.save(newProduct);
            });
        
        return new ResponseEntity<>(refreshedProduct, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable long id) {

        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

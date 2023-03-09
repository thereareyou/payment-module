package com.gd.paymentmodule;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gd.paymentmodule.BasketRecord.BasketRecord;
import com.gd.paymentmodule.BasketRecord.BasketRecordRepository;
import com.gd.paymentmodule.Product.Product;
import com.gd.paymentmodule.Product.ProductRepository;

@Configuration
public class DataLoader {
    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);

    @Bean
    CommandLineRunner dataLoading(ProductRepository productRepository, BasketRecordRepository basketRecordRepository) {
        return args -> {
            log.info("Preloading " + productRepository.save(
                new Product("Effective Java | Джошуа Блох",
                            new BigDecimal("1399.00"),
                            3))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Программирование: введение в профессию. Том 1 | Столяров А.В.",
                            new BigDecimal("2500.00"),
                            5))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Программирование: введение в профессию. Том 2 | Столяров А.В.",
                            new BigDecimal("2599.00"),
                            2))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Программирование: введение в профессию. Том 3 | Столяров А.В.",
                            new BigDecimal("2611.00"),
                            4))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Алгоритмы. Построение и анализ | Т. Кормен",
                            new BigDecimal("12000.00"),
                            1))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Статистика. Краткий курс в комиксах | Ларри Гоник",
                            new BigDecimal("750.00"),
                            11))
            );
            log.info("Preloading " + productRepository.save(
                new Product("Финансист | Теодор Драйзер",
                            new BigDecimal("499.00"),
                            5))
            );
            log.info("Preloading " + productRepository.save(
                new Product("English Grammar In Use | Реймонд Мерфи",
                            new BigDecimal("1750.00"),
                            2))
            );

            log.info("Preloading " + basketRecordRepository.save(new BasketRecord(
                productRepository.findById(Long.valueOf(1)).get(),
                1
            )));
            log.info("Preloading " + basketRecordRepository.save(new BasketRecord(
                productRepository.findById(Long.valueOf(2)).get(),
                1
            )));
        };
    }
}

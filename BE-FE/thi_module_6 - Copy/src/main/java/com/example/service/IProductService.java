package com.example.service;

import com.example.dto.IProductDto;
import com.example.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IProductService {
    void save(Product product);

    Optional<Product> findById(Integer id);

    void update(Product product);

    void deleteLogical(Integer id);

    Page<IProductDto> searchProduct(String nameSearch, String typeSearch, Pageable pageable);
}

package com.example.service.impl;

import com.example.dto.IProductDto;
import com.example.model.Product;
import com.example.repository.IProductRepository;
import com.example.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public void save(Product product) {
        iProductRepository.save(product);
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return iProductRepository.findById(id);
    }

    @Override
    public void update(Product product) {
        iProductRepository.save(product);
    }

    @Override
    public void deleteLogical(Integer id) {
        iProductRepository.deleteLogical(id);
    }

    @Override
    public Page<IProductDto> searchProduct(String nameSearch, String typeSearch, Pageable pageable) {
        return iProductRepository.searchProduct(nameSearch, typeSearch, pageable);
    }
}

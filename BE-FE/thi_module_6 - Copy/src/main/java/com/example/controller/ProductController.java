package com.example.controller;

import com.example.dto.IProductDto;
import com.example.dto.ProductDto;
import com.example.model.Product;
import com.example.model.ProductType;
import com.example.service.IProductService;
import com.example.service.IProductTypeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProductService iProductService;

    @Autowired
    private IProductTypeService iProductTypeService;

    @GetMapping("/list/{nameSearch}&{typeSearch}")
    public ResponseEntity<Page<IProductDto>> getAllProductPaging(@PageableDefault(value = 5) Pageable pageable,
                                                                 @PathVariable("nameSearch") String nameSearch,
                                                                 @PathVariable("typeSearch") String typeSearch) {
        Page<IProductDto> productDtos = iProductService.searchProduct(nameSearch, typeSearch, pageable);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/type-list")
    public ResponseEntity<List<ProductType>> getAllProductType() {
        List<ProductType> productTypes = iProductTypeService.findAll();
        if (productTypes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productTypes, HttpStatus.OK);
    }

    @DeleteMapping("/delete-product/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        Optional<Product> product = iProductService.findById(id);
        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iProductService.deleteLogical(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDto productDto,
                                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        }

        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        iProductService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> editProduct(@Valid @RequestBody ProductDto productDto,
                                         @PathVariable Integer id,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(),
                    HttpStatus.BAD_REQUEST);
        }

        Optional<Product> product = iProductService.findById(id);

        if (product.isPresent()) {
            BeanUtils.copyProperties(productDto, product.get());
            iProductService.update(product.get());
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.example.dto;

import com.example.model.ProductType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class ProductDto {
    private Integer productId;

    @NotBlank(message = "Tên sản phẩm không được để trống.")
    @Size(min = 5, max = 50, message = "Tên sản phẩm phải từ 5 đến 50 kí tự.")
    private String productName;

    @NotBlank(message = "Giá sản phẩm không được để trống.")
    @Pattern(regexp = "^[1-9]\\d*| *$", message = "Giá (VNĐ) phải là số nguyên dương.")
    @Min(value = 100000, message = "Giá bắt đầu thấp nhất phải là 100.000 VNĐ.")
    private String productPrice;

    @NotBlank(message = "Trạng thái không được để trống.")
    private String productStatus;
    private ProductType productType;

    public ProductDto() {
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }
}

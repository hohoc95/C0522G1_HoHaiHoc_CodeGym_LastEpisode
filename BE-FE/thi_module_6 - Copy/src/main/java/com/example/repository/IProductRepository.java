package com.example.repository;

import com.example.dto.IProductDto;
import com.example.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Integer> {

    /**
     * Function: Display product list and search-paging.
     * @param nameSearch
     * @param typeSearch
     * @param pageable
     * @return
     */
    @Query(value = " select product.product_id as id, product.product_name as name, product.product_price as price, " +
            " product.product_status as status, product_type.product_type_name as type " +
            " from product join product_type on product.product_type_id = product_type.product_type_id " +
            " where product.product_name like %:nameSearch% and product_type.product_type_name like %:typeSearch% " +
            " and product.is_delete = false order by product_id asc ",
            countQuery = " select count(*) " +
                    " from product join product_type on product.product_type_id = product_type.product_type_id " +
                    " where product.product_name like %:nameSearch% and product_type.product_type_name like %:typeSearch% " +
                    " and product.is_delete = false ",
            nativeQuery = true)
    Page<IProductDto> searchProduct(@Param("nameSearch") String nameSearch,
                                    @Param("typeSearch") String typeSearch,
                                    Pageable pageable);

    /**
     * Function: Product delete.
     * @param id
     */
    @Modifying
    @Query(value = " update product set is_delete = true where product_id = :idDelete", nativeQuery = true)
    void deleteLogical(@Param("idDelete") Integer id);


}

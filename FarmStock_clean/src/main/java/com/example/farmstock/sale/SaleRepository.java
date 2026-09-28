package com.example.farmstock.sale;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SaleRepository
        extends JpaRepository<Sale, Long> {

    List<Sale> findByCropId(Long cropId);

    @Query("""
        SELECT COALESCE(SUM(s.quantity), 0)
        FROM Sale s
        WHERE s.crop.id = :cropId
    """)
    Double getTotalSoldQuantity(
            @Param("cropId") Long cropId
    );

    @Query("""
        SELECT COALESCE(SUM(s.quantity * s.price), 0)
        FROM Sale s
        WHERE s.crop.id = :cropId
    """)
    Double getTotalRevenue(
            @Param("cropId") Long cropId
    );
}
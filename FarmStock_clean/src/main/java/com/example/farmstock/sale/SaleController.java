package com.example.farmstock.sale;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin
public class SaleController {

    private final SaleService saleService;

    public SaleController(
            SaleService saleService) {

        this.saleService = saleService;
    }

    @PostMapping
    public Sale addSale(
            @RequestBody Sale sale) {

        return saleService.addSale(sale);
    }

    @GetMapping("/crop/{cropId}")
    public List<Sale> getSaleHistory(
            @PathVariable Long cropId) {

        return saleService.getSaleHistory(cropId);
    }

    @GetMapping("/stock/{cropId}")
    public double getCurrentStock(
            @PathVariable Long cropId) {

        return saleService.getCurrentStock(cropId);
    }

    @GetMapping("/total-sold/{cropId}")
    public double getTotalSold(
            @PathVariable Long cropId) {

        return saleService.getTotalSold(cropId);
    }

    @GetMapping("/total-revenue/{cropId}")
    public double getTotalRevenue(
            @PathVariable Long cropId) {

        return saleService.getTotalRevenue(cropId);
    }

    @GetMapping("/revenue/{cropId}")
    public double getRevenue(
            @PathVariable Long cropId,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return saleService.getRevenueBetweenDates(
                cropId,
                startDate,
                endDate
        );
    }
}
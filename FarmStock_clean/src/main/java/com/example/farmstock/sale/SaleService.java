package com.example.farmstock.sale;

import com.example.farmstock.crop.Crop;
import com.example.farmstock.crop.CropRepository;
import com.example.farmstock.exception.ResourceNotFoundException;
import com.example.farmstock.harvest.HarvestBatchRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final CropRepository cropRepository;
    private final HarvestBatchRepository harvestRepository;

    public SaleService(
            SaleRepository saleRepository,
            CropRepository cropRepository,
            HarvestBatchRepository harvestRepository) {

        this.saleRepository = saleRepository;
        this.cropRepository = cropRepository;
        this.harvestRepository = harvestRepository;
    }

    public Sale addSale(Sale sale) {

        if (sale.getCrop() == null ||
                sale.getCrop().getId() == null) {

            throw new ResourceNotFoundException(
                    "Crop is required"
            );
        }

        Long cropId = sale.getCrop().getId();

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Crop not found with id: " + cropId
                        )
                );

        sale.setCrop(crop);

        double currentStock = getCurrentStock(cropId);

        if (sale.getQuantity() > currentStock) {

            throw new IllegalArgumentException(
                    "Not enough stock. Available stock: "
                            + currentStock + " kg"
            );
        }

        return saleRepository.save(sale);
    }

    public List<Sale> getSaleHistory(Long cropId) {

        if (!cropRepository.existsById(cropId)) {

            throw new ResourceNotFoundException(
                    "Crop not found with id: " + cropId
            );
        }

        return saleRepository.findByCropId(cropId);
    }

    public double getTotalSold(Long cropId) {

        Double result =
                saleRepository.getTotalSoldQuantity(cropId);

        return result == null ? 0 : result;
    }

    public double getTotalHarvest(Long cropId) {

        return harvestRepository
                .findByCropId(cropId)
                .stream()
                .mapToDouble(h -> h.getQuantity())
                .sum();
    }

    public double getCurrentStock(Long cropId) {

        return getTotalHarvest(cropId)
                - getTotalSold(cropId);
    }

    public double getTotalRevenue(Long cropId) {

        Double result =
                saleRepository.getTotalRevenue(cropId);

        return result == null ? 0 : result;
    }

    public double getRevenueBetweenDates(
            Long cropId,
            LocalDate startDate,
            LocalDate endDate) {

        return saleRepository
                .findByCropId(cropId)
                .stream()
                .filter(s ->
                        !s.getSaleDate().isBefore(startDate)
                                &&
                                !s.getSaleDate().isAfter(endDate)
                )
                .mapToDouble(s ->
                        s.getQuantity() * s.getPrice()
                )
                .sum();
    }
}
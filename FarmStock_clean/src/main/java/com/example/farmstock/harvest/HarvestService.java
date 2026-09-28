package com.example.farmstock.harvest;

import com.example.farmstock.crop.Crop;
import com.example.farmstock.crop.CropRepository;
import com.example.farmstock.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class HarvestService {

    private final HarvestBatchRepository harvestRepository;
    private final CropRepository cropRepository;

    public HarvestService(
            HarvestBatchRepository harvestRepository,
            CropRepository cropRepository) {

        this.harvestRepository = harvestRepository;
        this.cropRepository = cropRepository;
    }

    public HarvestBatch addHarvest(HarvestBatch harvest) {

        if (harvest.getCrop() == null ||
                harvest.getCrop().getId() == null) {

            throw new ResourceNotFoundException(
                    "Crop is required"
            );
        }

        Long cropId = harvest.getCrop().getId();

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Crop not found with id: " + cropId
                        )
                );

        harvest.setCrop(crop);

        return harvestRepository.save(harvest);
    }

    public List<HarvestBatch> getHarvestHistory(Long cropId) {

        if (!cropRepository.existsById(cropId)) {

            throw new ResourceNotFoundException(
                    "Crop not found with id: " + cropId
            );
        }

        return harvestRepository.findByCropId(cropId);
    }

    public double getTotalHarvest(Long cropId) {

        return harvestRepository
                .findByCropId(cropId)
                .stream()
                .mapToDouble(HarvestBatch::getQuantity)
                .sum();
    }
}
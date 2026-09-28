package com.example.farmstock.harvest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/harvests")
@CrossOrigin
public class HarvestBatchController {

    private final HarvestService harvestService;

    public HarvestBatchController(
            HarvestService harvestService) {

        this.harvestService = harvestService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public HarvestBatch addHarvest(
            @RequestBody HarvestBatch harvest) {

        return harvestService.addHarvest(harvest);
    }

    @GetMapping("/crop/{cropId}")
    public List<HarvestBatch> getHarvestHistory(
            @PathVariable Long cropId) {

        return harvestService.getHarvestHistory(cropId);
    }

    @GetMapping("/total/{cropId}")
    public double getTotalHarvest(
            @PathVariable Long cropId) {

        return harvestService.getTotalHarvest(cropId);
    }
}
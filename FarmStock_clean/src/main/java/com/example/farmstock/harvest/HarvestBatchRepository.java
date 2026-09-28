package com.example.farmstock.harvest;

import com.example.farmstock.crop.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HarvestBatchRepository
        extends JpaRepository<HarvestBatch, Long> {

    List<HarvestBatch> findByCropId(Long cropId);

    double findByCrop(Crop crop);
}
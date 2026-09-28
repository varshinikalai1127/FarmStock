package com.example.farmstock.crop;

import com.example.farmstock.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropService {

    private final CropRepository cropRepository;

    public CropService(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    public Crop createCrop(Crop crop) {
        return cropRepository.save(crop);
    }

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    public Crop getCropById(Long id) {
        return cropRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Crop not found with id: " + id));
    }

    public Crop updateCrop(Long id, Crop crop) {

        Crop existingCrop = getCropById(id);

        existingCrop.setName(crop.getName());

        return cropRepository.save(existingCrop);
    }

    public void deleteCrop(Long id) {

        Crop existingCrop = getCropById(id);

        cropRepository.delete(existingCrop);
    }
}

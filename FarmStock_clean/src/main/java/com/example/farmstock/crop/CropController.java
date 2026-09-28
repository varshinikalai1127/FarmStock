package com.example.farmstock.crop;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Crop createCrop(@Valid @RequestBody Crop crop) {
        return cropService.createCrop(crop);
    }

    @GetMapping
    public List<Crop> getAllCrops() {
        return cropService.getAllCrops();
    }

    @GetMapping("/{id}")
    public Crop getCropById(@PathVariable Long id) {
        return cropService.getCropById(id);
    }

    @PutMapping("/{id}")
    public Crop updateCrop(
            @PathVariable Long id,
            @Valid @RequestBody Crop crop) {

        return cropService.updateCrop(id, crop);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
    }
}

package com.chiyx.cesium.demo.backend.controller;

import com.chiyx.cesium.demo.backend.model.SatelliteDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class SatelliteController {

    @GetMapping(value = "/getSatelliteForEarth")
    public List<SatelliteDTO> getSatelliteForEarth() {
        return Collections.emptyList();
    }

}

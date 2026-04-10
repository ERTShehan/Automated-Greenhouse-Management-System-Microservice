package lk.ijse.zoneservice.service;

import lk.ijse.zoneservice.IOTClient.DeviceRequest;
import lk.ijse.zoneservice.IOTClient.DeviceResponse;
import lk.ijse.zoneservice.IOTClient.IotClient;
import lk.ijse.zoneservice.dto.ZoneRequest;
import lk.ijse.zoneservice.dto.ZoneResponse;
import lk.ijse.zoneservice.entity.Zone;
import lk.ijse.zoneservice.repository.ZoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZoneService {
    private ZoneRepository zoneRepository;
    private IotClient iotClient;

    @Value("${iot.api.token:}")
    private String iotToken;

    public ZoneResponse createZone(ZoneRequest request) {
        if (request.getMinTemp() >= request.getMaxTemp()) {
            throw new IllegalArgumentException(
                    "minTemp must be less than maxTemp");
        }

        DeviceRequest deviceReq = new DeviceRequest();
        deviceReq.setZoneId(String.valueOf(System.currentTimeMillis()));
        deviceReq.setName(request.getName());
        deviceReq.setType("GREENHOUSE_SENSOR");

        DeviceResponse deviceResp = iotClient.registerDevice(
                deviceReq, "Bearer " + iotToken);

        Zone zone = new Zone();
        zone.setName(request.getName());
        zone.setMinTemp(request.getMinTemp());
        zone.setMaxTemp(request.getMaxTemp());
        zone.setDeviceId(deviceResp.getDeviceId());

        Zone saved = zoneRepository.save(zone);
        return toResponse(saved);
    }

    public ZoneResponse getZone(Long id) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Zone not found: " + id));
        return toResponse(zone);
    }

    public List<ZoneResponse> getAllZones() {
        return zoneRepository.findAll()
                .stream().map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ZoneResponse updateZone(Long id, ZoneRequest req) {
        Zone zone = zoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zone not found"));
        if (req.getMinTemp() >= req.getMaxTemp())
            throw new IllegalArgumentException(
                    "minTemp must be less than maxTemp");
        zone.setName(req.getName());
        zone.setMinTemp(req.getMinTemp());
        zone.setMaxTemp(req.getMaxTemp());
        return toResponse(zoneRepository.save(zone));
    }

    public void deleteZone(Long id) {
        zoneRepository.deleteById(id);
    }

    private ZoneResponse toResponse(Zone z) {
        return new ZoneResponse(z.getId(), z.getName(),
                z.getMinTemp(), z.getMaxTemp(),
                z.getDeviceId(), z.getCreatedAt());
    }
}

package lk.ijse.zoneservice.service;

import lk.ijse.zoneservice.entity.Zone;
import lk.ijse.zoneservice.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ZoneService {
    @Autowired
    private ZoneRepository zoneRepository;

    public Zone createZone(Zone zone) {
        if (zone.getMinTemp() >= zone.getMaxTemp()) {
            throw new IllegalArgumentException("Minimum temperature must be strictly less than maximum temperature.");
        }

        return zoneRepository.save(zone);
    }

    public Optional<Zone> getZoneById(String id) {
        return zoneRepository.findById(id);
    }

    public Zone updateZone(String id, Zone updatedZone) {
        return zoneRepository.findById(id).map(existingZone -> {
            if (updatedZone.getMinTemp() >= updatedZone.getMaxTemp()) {
                throw new IllegalArgumentException("Minimum temperature must be strictly less than maximum temperature.");
            }
            existingZone.setName(updatedZone.getName());
            existingZone.setMinTemp(updatedZone.getMinTemp());
            existingZone.setMaxTemp(updatedZone.getMaxTemp());
            return zoneRepository.save(existingZone);
        }).orElseThrow(() -> new RuntimeException("Zone not found with id " + id));
    }

    public void deleteZone(String id) {
        zoneRepository.deleteById(id);
    }
}

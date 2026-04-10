package lk.ijse.zoneservice.repository;

import lk.ijse.zoneservice.entity.Zone;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
}

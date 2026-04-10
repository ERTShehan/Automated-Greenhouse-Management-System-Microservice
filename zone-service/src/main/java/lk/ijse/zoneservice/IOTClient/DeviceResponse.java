package lk.ijse.zoneservice.IOTClient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DeviceResponse {
    private String zoneId;
    private String name;
    private String type;
}

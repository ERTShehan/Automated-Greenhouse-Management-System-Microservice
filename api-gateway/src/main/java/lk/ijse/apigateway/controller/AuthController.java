package lk.ijse.apigateway.controller;

import lk.ijse.apigateway.dto.AuthRequest;
import lk.ijse.apigateway.dto.AuthResponse;
import lk.ijse.apigateway.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        if ("admin".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}

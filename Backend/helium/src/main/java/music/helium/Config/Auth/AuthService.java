package music.helium.Config.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import music.helium.Models.Dto.LoginRequest;
import music.helium.Models.Dto.LoginResponse;
import music.helium.Models.Dto.RegisterRequest;
import music.helium.Models.Entity.User;
import music.helium.Repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest registerRequest) {
        // Verificar si el email ya existe
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("El correo electrónico ya está en uso");
        }

        // Crear nuevo usuario
        User user = new User();
        user.setFullName(registerRequest.getFullName());
        user.setEmail(registerRequest.getEmail());

        // Generar username a partir del email (puedes personalizar esto)
        String username = registerRequest.getEmail().split("@")[0];
        user.setUsername(username);

        // Encriptar contraseña
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        return userRepository.save(user);
    }

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        // Buscar usuario por email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar contraseña
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Generar token JWT (simplificado - en producción usar JWT)
        String token = "generated-jwt-token"; // Reemplazar con generación real de JWT

        return new LoginResponse(token, user);
    }
}
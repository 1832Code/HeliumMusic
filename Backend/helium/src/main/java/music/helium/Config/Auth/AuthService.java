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
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // En un caso real, aquí generarías un JWT con información del usuario
        String mockToken = "mock-token-for-user-" + user.getId(); // Temporal

        return new LoginResponse(mockToken, user);
    }

    public User getUserFromToken(String jwt) {
        // Implementación temporal para pruebas:
        if (jwt.startsWith("mock-token-for-user-")) {
            String userIdStr = jwt.replace("mock-token-for-user-", "");
            Long userId = Long.parseLong(userIdStr);
            return userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }
        throw new RuntimeException("Token inválido");
    }

}
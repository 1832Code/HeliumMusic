package music.helium.Models.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String fullName;

    private String email;

    private String password;
}
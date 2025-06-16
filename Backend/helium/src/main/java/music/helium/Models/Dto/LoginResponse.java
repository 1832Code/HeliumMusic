package music.helium.Models.Dto;


import lombok.Data;
import music.helium.Models.Entity.User;

@Data
public class LoginResponse {
    private String token;
    private User user;

    public LoginResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
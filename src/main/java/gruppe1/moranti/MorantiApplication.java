package gruppe1.moranti;

import gruppe1.moranti.models.Responsibility;
import gruppe1.moranti.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MorantiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MorantiApplication.class, args);
    }

}

package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, String> {
}

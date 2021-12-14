package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {

    List<Car> findAllByTypeContaining(String type);
}

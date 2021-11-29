package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Cars {

    @Autowired
    CarRepository carRepository;


    @GetMapping("/cars")
    public List<Car> getCars() {
        return carRepository.findAllCars();
    }



}

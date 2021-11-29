package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Car;
import gruppe1.moranti.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Cars {

    @Autowired
    CarRepository carRepository;


    @GetMapping("/cars")
    public List<Car> getCars() {
        return carRepository.findAll();
    }

    @GetMapping("/cars/{carNumber}")
    public Car getCarById(@PathVariable Long carNumber) {
        return carRepository.findById(carNumber).get();
    }

    @PostMapping("/cars")
    public Car addCar(@RequestBody Car newCar) {
        return carRepository.save(newCar);
    }

    @PostMapping("/cars/{carNumber}")
    public Car addEmployee(@PathVariable Long carNumber, @RequestBody Car newCar) {
        return carRepository.save(newCar);
    }

    @PutMapping("/cars/{carNumber}")
    public String updateCarByCarNumber(@PathVariable Long carNumber, @RequestBody Car carToUpdateWith) {
        if (carRepository.existsById(carNumber)) {
            carToUpdateWith.setCarNumber(carNumber);
            carRepository.save(carToUpdateWith);
            return "Car was created";
        } else {
            return "Car not found";
        }
    }

    @PatchMapping("/cars/{id}")

    @DeleteMapping("/cars/{carNumber}")
    public void deleteCarByCarNumber(@PathVariable Long carNumber) {
        carRepository.deleteById(carNumber);
    }

}
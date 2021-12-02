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
    public Car addCar(@PathVariable Long carNumber, @RequestBody Car newCar) {
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

    @PatchMapping("/cars/{carNumber}")       
    public String patchCarById(@PathVariable Long carNumber, @RequestBody Car carToUpdateWith) {
        return carRepository.findById(carNumber).map(foundCar -> {
            if (carToUpdateWith.getLicencePlate() != null) foundCar.setLicencePlate(carToUpdateWith.getLicencePlate());
            if (carToUpdateWith.getShiftPhoneNumber() != null) foundCar.setShiftPhoneNumber(carToUpdateWith.getShiftPhoneNumber());
            if (carToUpdateWith.getType() != null) foundCar.setType(carToUpdateWith.getType());

            carRepository.save(foundCar);
            return "Car was updated";
        }).orElse("Car was not found");
    }

    @DeleteMapping("/cars/{carNumber}")
    public void deleteCarByCarNumber(@PathVariable Long carNumber) {
        carRepository.deleteById(carNumber);
    }
}
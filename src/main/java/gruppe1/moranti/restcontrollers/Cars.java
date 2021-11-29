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

    @GetMapping("/cars/{licencePlate}")
    public Car getCarById(@PathVariable String licencePlate) {
        return carRepository.findById(licencePlate).get();
    }

    @PostMapping("/cars")
    public Car addCar(@RequestBody Car newCar) {
        return carRepository.save(newCar);
    }

    @PostMapping("/cars/employees/{licencePlate}/{workPhoneNumber}")
    public Car addEmployeeToCar(@PathVariable String licencePlate, @PathVariable int workPhoneNumber) {
        System.out.print(licencePlate);
        System.out.print(workPhoneNumber);
        return null;
    }

    @PutMapping("/cars/{licencePlate}")
    public Car updateCarByLicencePlate(@PathVariable String licencePlate, @RequestBody Car newCar) {
        newCar.setLicencePlate(licencePlate);
        return carRepository.save(newCar);
    }

    @DeleteMapping("/cars/{licencePlate}")
    public void deleteCarByLicencePlate(@PathVariable String licencePlate) {
        carRepository.deleteById(licencePlate);
    }

}
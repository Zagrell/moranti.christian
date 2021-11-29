package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Shift;
import gruppe1.moranti.repositories.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Shifts {


    @Autowired
    ShiftRepository shiftRepository;

    @GetMapping("/shifts")
    public List<Shift> getShifts() {
        return shiftRepository.findAll();
    }

    @GetMapping("/shifts/{id}")
    public Shift getShift(@PathVariable Long id) {
        return shiftRepository.findById(id).get();
    }

    @PostMapping("/shifts")
    public Shift addShift(@RequestBody Shift newShift) {
        newShift.setId(null);
        return shiftRepository.save(newShift);
    }

    @PutMapping("/shifts/{id}")
    public String updateShiftById(@PathVariable Long id, @RequestBody Shift shiftToUpdateWith) {
        if(shiftRepository.existsById(id)) {
            shiftToUpdateWith.setId(id);
            shiftRepository.save(shiftToUpdateWith);
            return "Shift was created";
        } else {
            return "Shift not found";
        }
    }


    @DeleteMapping("/shifts/{id}")
    public void deleteShiftById(@PathVariable Long id) {
        shiftRepository.deleteById(id);
    }

}

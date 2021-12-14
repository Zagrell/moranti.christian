package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.models.Shift;
import gruppe1.moranti.repositories.CarRepository;
import gruppe1.moranti.repositories.CaseRepository;
import gruppe1.moranti.repositories.EmployeeRepository;
import gruppe1.moranti.repositories.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Shifts {


    @Autowired
    ShiftRepository shiftRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    CaseRepository caseRepository;

    @Autowired
    CarRepository carRepository;

    @GetMapping("/shifts")
    public List<Shift> getShifts() {
        return shiftRepository.findAll();
    }

    @GetMapping("/shifts/{id}")
    public Shift getShift(@PathVariable Long id) {
        return shiftRepository.findById(id).get();
    }

    @PostMapping("/shifts")
    public Shift addShift() {
        Shift newShift = new Shift();
        int highestPrio = 0;
        List<Shift> shifts = shiftRepository.findAll();

        for(Shift foundShift : shifts){
            if (foundShift.getPriority() <= 100 && highestPrio < foundShift.getPriority()){
                highestPrio = foundShift.getPriority();
            }
        }

        newShift.setPriority(highestPrio+1);

        return shiftRepository.save(newShift);
    }

    @PostMapping("shifts/addnewcase/{id}")
    public Shift addNewCase(@PathVariable Long id, @RequestBody Case newCase) {
        if (!caseRepository.existsById(newCase.getCaseNumber())) {
            caseRepository.save(newCase);
        }

        Shift shiftToUpdate = shiftRepository.findById(id).get();

        //update all prioities
        List<Shift> shifts = shiftRepository.findAll();
        shifts.forEach(shift -> {
            if (100 >= shift.getPriority() && shift.getPriority() > shiftToUpdate.getPriority()) {
                shift.setPriority(shift.getPriority() - 1);
            }
        });
        shiftRepository.saveAll(shifts);

        shiftToUpdate.setPriority(Shift.OUT);


        shiftToUpdate.setShiftCase(newCase);
        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("/shifts/carchange/{id}")
    public Shift updateCarShift(@PathVariable Long id, @RequestBody Long carNumber) {
        Shift shiftToUpdate = shiftRepository.findById(id).get();
        shiftToUpdate.setCar(carRepository.findById(carNumber).get());

        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("/shifts/handymanchange/{id}")
    public Shift updateHandymanShift(@PathVariable Long id, @RequestBody Long employeeId) {
        Shift shiftToUpdate = shiftRepository.findById(id).get();
        shiftToUpdate.setEmployee(employeeRepository.findById(employeeId).get());

        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("shifts/removecase/{id}")
    public Shift removeCase(@PathVariable Long id){
        Shift shift = shiftRepository.findById(id).get();
        Case shiftCase = shift.getShiftCase();
        shift.setShiftCase(null);

        int highestPrio = 0;
        List<Shift> shifts = shiftRepository.findAll();

        for(Shift foundShift : shifts){
            if (foundShift.getPriority() <= 100 && highestPrio < foundShift.getPriority()){
                highestPrio = foundShift.getPriority();
            }
        }
        shift.setPriority(highestPrio+1);

        shiftRepository.save(shift);
        try {
            caseRepository.delete(shiftCase);
        }catch (Exception e){
            e.printStackTrace();
        }
        return shift;
    }

    @PutMapping("/shifts/{id}")
    public String updateShiftById(@PathVariable Long id, @RequestBody Shift shiftToUpdateWith) {
        if (shiftRepository.existsById(id)) {
            shiftToUpdateWith.setId(id);
            shiftRepository.save(shiftToUpdateWith);
            return "Shift was created";
        } else {
            return "Shift not found";
        }
    }


    @DeleteMapping("/shifts/{id}")
    public void deleteShiftById(@PathVariable Long id) {
        Shift shiftToDelete = shiftRepository.findById(id).get();

        List<Shift> shifts = shiftRepository.findAll();
        shifts.forEach(shift -> {
            if (100 >= shift.getPriority() && shift.getPriority() > shiftToDelete.getPriority()) {
                shift.setPriority(shift.getPriority() - 1);
            }
        });
        shiftRepository.saveAll(shifts);

        shiftRepository.deleteById(id);
    }

}

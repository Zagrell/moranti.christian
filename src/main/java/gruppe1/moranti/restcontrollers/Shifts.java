package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.models.Shift;
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
                System.out.println(shift.getPriority());
                shift.setPriority(shift.getPriority() - 1);
            }
        });
        shiftRepository.saveAll(shifts);

        shiftToUpdate.setPriority(Shift.OUT);


        shiftToUpdate.setShiftCase(newCase);
        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("/shifts/handymanchange/{id}")
    public Shift updateHandymanShift(@PathVariable Long id, @RequestBody Long employeeId) {
        Shift shiftToUpdate = shiftRepository.findById(id).get();
        shiftToUpdate.setEmployee(employeeRepository.findById(employeeId).get());

        return shiftRepository.save(shiftToUpdate);
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
        shiftRepository.deleteById(id);
    }

}

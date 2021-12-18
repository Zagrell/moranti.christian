package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.models.Shift;
import gruppe1.moranti.models.WaitingList;
import gruppe1.moranti.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Shifts {


    @Autowired
    ShiftRepository shiftRepository;

    @Autowired
    CaseTypeRepository caseTypeRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    CaseRepository caseRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    WaitingListRepository waitingListRepository;

    @GetMapping("/shifts")
    public List<Shift> getShifts() {
        return shiftRepository.findAll();
    }

    @GetMapping("/shifts/{id}")
    public Shift getShift(@PathVariable Long id) {
        return shiftRepository.findById(id).get();
    }

    @PostMapping("/shifts")
    public Shift addShift(@RequestBody String shiftType) {
        Shift newShift = new Shift();
        newShift.setShiftType(shiftType);
        int highestPrio = 0;
        List<Shift> shifts = shiftRepository.findAllByShiftType(shiftType);

        for (Shift foundShift : shifts) {
            if (foundShift.getPriority() <= 100 && highestPrio < foundShift.getPriority()) {
                highestPrio = foundShift.getPriority();
            }
        }

        newShift.setPriority(highestPrio + 1);

        return shiftRepository.save(newShift);
    }

    @PostMapping("shifts/addnewcase/{id}")
    public Shift addNewCase(@PathVariable Long id, @RequestBody Case newCase) {
        if (!caseRepository.existsById(newCase.getCaseNumber())) {
            if (caseTypeRepository.existsById(newCase.getCaseType().getId())) {
                caseRepository.save(newCase);
            }
        } else if (waitingListRepository.findAll().get(0).getCases().stream().anyMatch(waitingCase -> waitingCase.getCaseNumber().equals(newCase.getCaseNumber()))) {
            WaitingList waitingList = waitingListRepository.findAll().get(0);
            waitingList.getCases().removeIf(waitingCase -> waitingCase.getCaseNumber().equals(newCase.getCaseNumber()));
            System.out.println("hejsa du der");
            waitingListRepository.save(waitingList);
        }

        Shift shiftToUpdate = shiftRepository.findById(id).get();

        //update all prioities
        List<Shift> shifts = shiftRepository.findAllByShiftType(shiftToUpdate.getShiftType());
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

    @PatchMapping("/shifts/comment/{id}")
    public Shift updateComment(@PathVariable Long id, @RequestBody String comment) {
        Shift shiftToUpdate = shiftRepository.findById(id).get();
        shiftToUpdate.setComment(comment);

        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("/shifts/handymanchange/{id}")
    public Shift updateHandymanShift(@PathVariable Long id, @RequestBody Long employeeId) {
        Shift shiftToUpdate = shiftRepository.findById(id).get();
        shiftToUpdate.setEmployee(employeeRepository.findById(employeeId).get());

        return shiftRepository.save(shiftToUpdate);
    }

    @PatchMapping("shifts/removecase/{id}")
    public Shift removeCase(@PathVariable Long id) {
        Shift shift = shiftRepository.findById(id).get();
        Case shiftCase = shift.getShiftCase();
        shift.setShiftCase(null);

        int highestPrio = 0;
        List<Shift> shifts = shiftRepository.findAllByShiftType(shift.getShiftType());

        for (Shift foundShift : shifts) {
            if (foundShift.getPriority() <= 100 && highestPrio < foundShift.getPriority()) {
                highestPrio = foundShift.getPriority();
            }
        }
        shift.setPriority(highestPrio + 1);

        shiftRepository.save(shift);
        try {
            caseRepository.delete(shiftCase);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return shift;
    }

    @PatchMapping("/shifts/increasePrio/{id}")
    public boolean increasePrio(@PathVariable Long id) {
        Shift shift = shiftRepository.findById(id).get();
        int prio = shift.getPriority();

        List<Shift> shifts = shiftRepository.findAllByShiftType(shift.getShiftType());

        if (prio < shifts.size()) {
            for (Shift s : shifts) {
                if (s.getPriority() == prio + 1) {
                    s.setPriority(prio);
                    shift.setPriority(prio + 1);
                    shiftRepository.save(s);
                    shiftRepository.save(shift);
                    return true;
                }
            }
        }
        return false;
    }

    @PatchMapping("/shifts/decreasePrio/{id}")
    public boolean decreasePrio(@PathVariable Long id) {
        Shift shift = shiftRepository.findById(id).get();
        int prio = shift.getPriority();

        if (prio > 1) {
            List<Shift> shifts = shiftRepository.findAllByShiftType(shift.getShiftType());


            for (Shift s : shifts) {
                if (s.getPriority() == prio - 1) {
                    s.setPriority(prio);
                    shift.setPriority(prio - 1);
                    shiftRepository.save(s);
                    shiftRepository.save(shift);
                    return true;
                }
            }
        }
        return false;
    }


    @DeleteMapping("/shifts/{id}")
    public void deleteShiftById(@PathVariable Long id) {
        Shift shiftToDelete = shiftRepository.findById(id).get();

        List<Shift> shifts = shiftRepository.findAllByShiftType(shiftToDelete.getShiftType());
        shifts.forEach(shift -> {
            if (100 >= shift.getPriority() && shift.getPriority() > shiftToDelete.getPriority()) {
                shift.setPriority(shift.getPriority() - 1);
            }
        });
        shiftRepository.saveAll(shifts);

        shiftRepository.deleteById(id);
    }

}

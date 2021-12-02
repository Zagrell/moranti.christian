package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.repositories.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Cases {

    @Autowired
    CaseRepository caseRepository;

    @GetMapping("/cases")
    public List<Case> getCases() {
        return caseRepository.findAll();
    }

    @GetMapping("/cases/{caseNumber}")
    public Case getCaseById(@PathVariable Long caseNumber) {
        return caseRepository.findById(caseNumber).get();
    }

    @PostMapping("/cases")
    public Case addCase (@RequestBody Case newCase) {
        return caseRepository.save(newCase);
    }

    @PostMapping("/cases/{caseNumber}")
    public Case addCar(@PathVariable Long caseNumber, @RequestBody Case newCase) {
        return caseRepository.save(newCase);
    }

    @PutMapping("/cases/{CaseNumber}")
    public String updateCaseByCaseNumber(@PathVariable Long caseNumber, @RequestBody Case caseToUpdateWith) {
        if (caseRepository.existsById(caseNumber)) {
            caseToUpdateWith.setCaseNumber(caseNumber);
            caseRepository.save(caseToUpdateWith);
            return "Case was created";
        } else {
            return "Case not found";
        }
    }

    @PatchMapping("/cases/{caseNumber}")
    public String patchCaseById(@PathVariable Long caseNumber, @RequestBody Case caseToUpdateWith) {
        return caseRepository.findById(caseNumber).map(foundCase -> {
            if (caseToUpdateWith.getArea() != null) foundCase.setArea(caseToUpdateWith.getArea());
            if (caseToUpdateWith.getCaseType() != null) foundCase.setCaseType(caseToUpdateWith.getCaseType());

            caseRepository.save(foundCase);
            return "Case wam updated";
        }).orElse("Case was not found");
    }

    @DeleteMapping("/cases/{caseNumber}")
    public void deleteCaseByCaseNumber(@PathVariable Long caseNumber) {
        caseRepository.deleteById(caseNumber);
    }

}

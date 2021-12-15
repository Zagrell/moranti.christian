package gruppe1.moranti.restcontrollers;


import gruppe1.moranti.models.CaseType;
import gruppe1.moranti.repositories.CaseTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CaseTypes {

    @Autowired
    CaseTypeRepository caseTypeRepository;

    @GetMapping("/caseTypes")
    public List<CaseType> getCaseTypes() {
        return caseTypeRepository.findAll();
    }

    @PostMapping("/caseTypes")
    public CaseType addCaseType(@RequestBody CaseType newCasetype) {
        return caseTypeRepository.save(newCasetype);
    }

    @PutMapping("/caseTypes/{id}")
    public String updateCaseTypeById(@PathVariable Long id, @RequestBody CaseType caseTypeToUpdateWith) {
        if (caseTypeRepository.existsById(id)) {
            caseTypeToUpdateWith.setId(id);
            caseTypeRepository.save(caseTypeToUpdateWith);
            return "CaseType was created";
        } else {
            return "CaseType was not found";
        }
    }

    @PatchMapping("/caseTypes/{id}")
    public String patchCaseTypeById(@PathVariable Long id, @RequestBody CaseType caseTypeToUpdateWith) {
        return caseTypeRepository.findById(id).map(foundCaseType -> {
            if (caseTypeToUpdateWith.getType() != null) foundCaseType.setType(caseTypeToUpdateWith.getType());
            caseTypeRepository.save(foundCaseType);
            return "CaseType was updated";
        }).orElse("CaseType was not found");
    }

    @DeleteMapping("/caseTypes/{id}")
    public void deleteCaseTypeById(@PathVariable Long id) {
        caseTypeRepository.deleteById(id);
    }

}

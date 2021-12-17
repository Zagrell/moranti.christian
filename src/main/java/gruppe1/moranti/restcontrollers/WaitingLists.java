package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.models.WaitingList;
import gruppe1.moranti.repositories.CaseRepository;
import gruppe1.moranti.repositories.CaseTypeRepository;
import gruppe1.moranti.repositories.WaitingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class WaitingLists {

    private final static long ID = 1;

    @Autowired
    WaitingListRepository waitingListRepository;

    @Autowired
    CaseRepository caseRepository;

    @Autowired
    CaseTypeRepository caseTypeRepository;

    @GetMapping("/waitinglist")
    public WaitingList getWaitingList() {
        WaitingList waitingList;
        try {
            waitingList = waitingListRepository.findAll().get(0);

        } catch (IndexOutOfBoundsException e) {
            waitingList = new WaitingList();
            waitingListRepository.save(waitingList);
        }
        return waitingList;
    }

    @PostMapping("/waitinglist/addcase")
    public Case addCase(@RequestBody Case newCase) {
        Case saveCase = caseRepository.save(newCase);
        WaitingList waitingList = waitingListRepository.findAll().get(0);
        waitingList.getCases().add(saveCase);
        waitingListRepository.save(waitingList);
        return saveCase;
    }

    @PutMapping("/waitinglist/updatecase/{caseNumber}")
    public String updateCase(@PathVariable Long caseNumber, @RequestBody Case caseToUpdateWith) {
        boolean wasDeleted = false;
        if (caseRepository.existsById(caseNumber)) {
            if(!caseToUpdateWith.getCaseNumber().equals(caseNumber)) {
                removeCaseByCaseNumber(caseNumber);
                wasDeleted = true;
            }
            caseRepository.save(caseToUpdateWith);
            if (wasDeleted)
                addCase(caseToUpdateWith);
            return "Case was created";
        } else {
            return "Case not found";
        }
    }

    @DeleteMapping("/waitinglist/removecase/{caseNumber}")
    public void removeCaseByCaseNumber(@PathVariable Long caseNumber) {
        WaitingList waitingList = waitingListRepository.findAll().get(0);
        Case caseToRemove = caseRepository.findById(caseNumber).get();
        waitingList.getCases().remove(caseToRemove);
        caseRepository.deleteById(caseNumber);
        waitingListRepository.save(waitingList);
    }

}

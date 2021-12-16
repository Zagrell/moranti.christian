package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Case;
import gruppe1.moranti.repositories.CaseRepository;
import gruppe1.moranti.repositories.WaitingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.events.Event;

import javax.persistence.Id;
import java.util.List;

@RestController
public class WaitingList {

    private final static long ID = 1;

    @Autowired
    WaitingListRepository waitingListRepository;

    @Autowired
    CaseRepository caseRepository;

    @GetMapping("/waitinglist")
    public List<WaitingList> getWaitingList() {
        return waitingListRepository.findAll();
    }

    @PostMapping("/waitinglist")
    public WaitingList addWaitingList(@RequestBody WaitingList newWaitingList) {
        return waitingListRepository.save(newWaitingList);
    }

    @PostMapping("/waitinglist/addcase")
    public Case addCase(@RequestBody Case newCase) {
        Case saveCase = caseRepository.save(newCase);
        WaitingList waitingList = waitingListRepository.findById(ID).get();
        waitingList.addCase(saveCase);
        waitingListRepository.save(waitingList);
        return saveCase;
    }


    @DeleteMapping("/waitinglist/removeCase/{caseNumber}")
    public void removeCaseByCaseNumber(@PathVariable Long caseNumber) {
        caseRepository.deleteById(caseNumber);
    }


}

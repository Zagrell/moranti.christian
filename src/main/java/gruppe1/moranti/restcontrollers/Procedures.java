package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Procedure;
import gruppe1.moranti.repositories.ProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class Procedures {

    @Autowired
    ProcedureRepository procedureRepository;

    private final long ID = 1;
    @GetMapping("/procedure")
    public Procedure getProcedure() {
        return procedureRepository.findById(ID).get();
    }

    @PutMapping("/procedure")
    public Procedure updateProcedure(@RequestBody String procedure) {
        Procedure procedureToUpdate;
        Optional<Procedure> foundProcedure = procedureRepository.findById(ID);
        if (foundProcedure.isEmpty()) {
            procedureToUpdate = new Procedure();
            procedureToUpdate.setId(ID);
            procedureRepository.save(procedureToUpdate);
        } else {
            procedureToUpdate = foundProcedure.get();
        }
        procedureToUpdate.setProcedureText(procedure);
        return procedureRepository.save(procedureToUpdate);
    }
}

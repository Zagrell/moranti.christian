package gruppe1.moranti.restcontrollers;

import gruppe1.moranti.models.Procedure;
import gruppe1.moranti.repositories.ProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Procedures {

    @Autowired
    ProcedureRepository procedureRepository;

    @GetMapping("/procedures")
    public List<Procedure> getProcedures() {
        return procedureRepository.findAll();
    }

    @GetMapping("/procedures/{id}")
    public Procedure getProcedure(@PathVariable Long id) {
        return procedureRepository.getById(id);
    }

    @PatchMapping("/procedures/{id}")
    public Procedure updateProcedure(@PathVariable Long id, @RequestBody String procedure) {
        Procedure procedureToUpdate = procedureRepository.findById(id).get();
        procedureToUpdate.setProcedureText(procedure);

        return procedureRepository.save(procedureToUpdate);
    }
}

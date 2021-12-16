package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Employee;
import gruppe1.moranti.models.Responsibility;
import gruppe1.moranti.models.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findAllByShiftType(String shiftType);
}

package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Employee;
import gruppe1.moranti.models.Responsibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByResponsibilityContaining(Responsibility responsibility);

}

package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

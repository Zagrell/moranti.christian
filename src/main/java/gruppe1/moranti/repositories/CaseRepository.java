package gruppe1.moranti.repositories;

import gruppe1.moranti.models.Case;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaseRepository extends JpaRepository<Case, Long> {
}

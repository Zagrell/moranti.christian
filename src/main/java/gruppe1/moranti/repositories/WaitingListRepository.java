package gruppe1.moranti.repositories;

import gruppe1.moranti.restcontrollers.WaitingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaitingListRepository extends JpaRepository<WaitingList, Long> {
}

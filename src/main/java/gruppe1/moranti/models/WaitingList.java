package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = "WaitingLists")
@Entity
public class WaitingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @OneToMany
    private List<Case> cases;
}

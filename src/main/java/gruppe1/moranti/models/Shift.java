package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = "shifts")
@Entity
public class Shift {

    @Id
    @Column
    private Long id;

    @Column
    private int priority;

    @Column
    private String comment;

    @OneToOne
    private Car car;

    @OneToOne
    private Employee employee;

    // @OneToOne(mappedBy = "watch", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // private Case case;

}

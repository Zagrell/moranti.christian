package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = "shifts")
@Entity
public class Shift {

    public static final int OUT = 101;
    public static final int NOT_IN_SERVICE = 102;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private int priority;

    @Column
    private String comment = "";

    @OneToOne
    private Car car;

    @OneToOne
    private Employee employee;

    @OneToOne
    private Case shiftCase;

}

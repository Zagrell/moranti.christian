package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;


@Data
@Table(name = "employees")
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String workPhoneNumber;

    @Column
    private String employeeName;

    @Enumerated
    @Column
    private List<Responsibility> responsibility;


}

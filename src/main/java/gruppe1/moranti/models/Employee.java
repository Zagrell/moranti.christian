package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;


@Data
@Table(name = "employees")
@Entity
public class Employee {

    public static Long shiftLeaderId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String workPhoneNumber;

    @Column
    private String employeeName;

    @ElementCollection
    @Enumerated(value = EnumType.STRING)
    @Column
    private List<Responsibility> responsibility;

    public void setShiftLeaderId(Long shiftLeaderId) {
        Employee.shiftLeaderId = shiftLeaderId;
    }

}

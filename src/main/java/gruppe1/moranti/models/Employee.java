package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;


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
    private String name;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Responsibility responsibility;
}

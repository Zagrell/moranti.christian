package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "employees")
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private int workPhoneNumber;

    @Column
    private String name;

    @Column
    private String type;


}

package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "employees")
@Entity
public class Employee {

    @Id
    @Column
    private int workPhoneNumber;

    @Column
    private String name;

    @Column
    private String type;

}

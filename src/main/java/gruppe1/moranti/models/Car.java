package gruppe1.moranti.models;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "cars")
@Entity
public class Car {

    @Id
    @Column
    private String licencePlate;

    @Column
    private int carNumber;

    @Column
    private int watchPhoneNumber;

    @Column
    private String type;

}

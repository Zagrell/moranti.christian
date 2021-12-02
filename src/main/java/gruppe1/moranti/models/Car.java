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
    private Long carNumber;

    @Column
    private String licencePlate;

    @Column
    private String shiftPhoneNumber;

    @Column
    private String type;

}

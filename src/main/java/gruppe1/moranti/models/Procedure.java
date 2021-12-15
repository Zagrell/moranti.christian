package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "procedures")
@Entity
public class Procedure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    public Long id;

    @Column(length = 2000)
    public String procedure;
}

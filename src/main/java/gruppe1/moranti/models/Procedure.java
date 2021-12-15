package gruppe1.moranti.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import javax.persistence.*;

@JsonSerialize
@Data
@Table(name = "procedures")
@Entity
public class Procedure {

    @Id
    @GeneratedValue
    @Column
    public Long id;

    @Lob
    @Column
    public String procedureText;
}

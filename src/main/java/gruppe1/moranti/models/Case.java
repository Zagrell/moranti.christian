package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="cases")
@Entity
public class Case {

    @Id
    @Column
    private Long caseNumber;

    @Column
    private String area;

    @Enumerated(value = EnumType.STRING)
    @Column
    private CaseType caseType;

}

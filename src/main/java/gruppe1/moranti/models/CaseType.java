package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class CaseType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String type;

    public CaseType(String type) {
        this.type = type;
    }

    public CaseType() {
    }

    @Override
    public String toString(){
        return type;
    }

}
package gruppe1.moranti.models;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;


@Data
@Entity
public class CaseType {

    @Id
    private String type;

    @Override
    public String toString(){
        return type;
    }

}
package gruppe1.moranti.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
public class CaseType {

    @Id
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
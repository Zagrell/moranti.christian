package gruppe1.moranti.models;


import javax.persistence.*;

public enum Responsibility {

    SANITOR("Sanitør") ,
    VAGTLEDER("Vagtleder"),
    FOL("Føl") ;

    private String desc;

    Responsibility(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString(){
        return desc;
    }
}

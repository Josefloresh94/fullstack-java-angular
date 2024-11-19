package com.joseflores.microservicios_cursos.model;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_examenes.model.Examen;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cursos")
@Getter @Setter
@AllArgsConstructor
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String nombre;

    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Alumno> alumnos;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Examen> examenes;

    @PrePersist
    public void prePersist(){
        this.createAt = new Date();
    }

    public Curso(){
        this.alumnos = new ArrayList<>();
        this.examenes = new ArrayList<>();
    }

    public void addAlumno(Alumno alumno){
        this.alumnos.add(alumno);
    }

    public void removeAlumno(Alumno alumno){
        this.alumnos.remove(alumno);
    }

    public void addExamen(Examen examen){
        this.examenes.add(examen);
    }

    public void removeExamen(Examen examen){
        this.examenes.remove(examen);
    }
}

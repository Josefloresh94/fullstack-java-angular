package com.joseflores.microservicios_respuestas.model;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_examenes.model.Pregunta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "respuestas")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;

    @ManyToOne(fetch = FetchType.LAZY)
    private Alumno alumno;

    @OneToOne(fetch = FetchType.LAZY)
    private Pregunta pregunta;
}

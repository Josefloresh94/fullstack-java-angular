package com.joseflores.microservicios_respuestas.model;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_examenes.model.Pregunta;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "respuestas")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Respuesta {

    @Id
    private String id;

    private String texto;

    @Transient
    private Alumno alumno;

    private Long alumnoId;

    @Transient
    private Pregunta pregunta;

    private Long preguntaId;
}

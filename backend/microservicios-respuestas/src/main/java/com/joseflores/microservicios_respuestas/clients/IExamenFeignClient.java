package com.joseflores.microservicios_respuestas.clients;

import com.joseflores.commons_examenes.model.Examen;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "microservicios-examenes")
public interface IExamenFeignClient {

    @GetMapping("/{id}")
    public Examen obtenerExamenPorId(@PathVariable Long id);

    @GetMapping("/respondidos-por-preguntas")
    public List<Long> obtenerExamenesIdsPorPreguntasIdRespondidas(@RequestParam List<Long> preguntaIds);
}

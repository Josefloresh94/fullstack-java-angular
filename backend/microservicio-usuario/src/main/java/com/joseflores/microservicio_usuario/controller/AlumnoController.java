package com.joseflores.microservicio_usuario.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.joseflores.commons_alumnos.entity.Alumno;
import com.joseflores.commons_microservicios.controllers.CommonController;

import jakarta.validation.Valid;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.joseflores.microservicio_usuario.service.IAlumnoService;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class AlumnoController extends CommonController<Alumno, IAlumnoService> {

    @GetMapping("/alumnos-por-curso")
    public ResponseEntity<?> obtenerAlumnosPorCurso(@RequestParam List<Long> ids){
        return ResponseEntity.ok(service.findAllById(ids));
    }

    @GetMapping("/uploads/img/{id}")
    public ResponseEntity<?> verFoto(@PathVariable Long id){
        try {
            Optional<Alumno> o = service.findById(id);

        if (o.isEmpty() || o.get().getFoto() == null){
            return ResponseEntity.notFound().build();
        }

        // Resource imagen = new ByteArrayResource(o.get().getFoto());
        // return ResponseEntity.ok()
        //         .contentType(MediaType.IMAGE_JPEG)
        //         .body(imagen);
        Alumno alumno = o.get();
        Resource imagen = new ByteArrayResource(alumno.getFoto());

        String contentType = MediaType.IMAGE_JPEG_VALUE;
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"foto_" + alumno.getId() + "\"")
                .body(imagen);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving the image");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody Alumno alumno, BindingResult result, @PathVariable Long id) {

        if (result.hasErrors()){
            return this.validar(result);
        }

        Optional<Alumno> o = this.service.findById(id);
        if (o.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Alumno alumnoDb = o.get();
        alumnoDb.setNombre(alumno.getNombre());
        alumnoDb.setApellido(alumno.getApellido());
        alumnoDb.setEmail(alumno.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(alumnoDb));
    }

    @GetMapping("/filtrar/{term}")
    public ResponseEntity<?> filtrar(@PathVariable String term){
        return ResponseEntity.ok(service.findByNombreOrApellido(term));
    }

    @PostMapping("/crear-con-foto")
    public ResponseEntity<?> crearConFoto(@Valid Alumno alumno, BindingResult result, @RequestParam("archivo") MultipartFile archivo) throws IOException {
        // if (!archivo.isEmpty()){
        //     alumno.setFoto(archivo.getBytes());
        // }
        // return super.crear(alumno, result);
        if (result.hasErrors()) {
            return this.validar(result);
        }
        if (!archivo.isEmpty()) {
            alumno.setFoto(archivo.getBytes());
        }
        Alumno alumnoDb = service.save(alumno);
        return ResponseEntity.status(HttpStatus.CREATED).body(alumnoDb);
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(@Valid Alumno alumno, BindingResult result, @PathVariable Long id, @RequestParam("archivo") MultipartFile archivo) throws IOException {

        if (result.hasErrors()){
            return this.validar(result);
        }

        Optional<Alumno> o = this.service.findById(id);
        if (o.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Alumno alumnoDb = o.get();
        alumnoDb.setNombre(alumno.getNombre());
        alumnoDb.setApellido(alumno.getApellido());
        alumnoDb.setEmail(alumno.getEmail());
        if (!archivo.isEmpty()){
            alumnoDb.setFoto(archivo.getBytes());
        }

        // return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(alumnoDb));
        Alumno updatedAlumno = service.save(alumnoDb);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedAlumno);
    }
}

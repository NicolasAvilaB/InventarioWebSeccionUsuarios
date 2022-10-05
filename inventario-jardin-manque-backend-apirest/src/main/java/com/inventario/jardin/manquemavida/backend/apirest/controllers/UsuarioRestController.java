package com.inventario.jardin.manquemavida.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.jardin.manquemavida.backend.apirest.models.entity.Usuario;
import com.inventario.jardin.manquemavida.backend.apirest.models.services.UsuarioService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/usuarios")
public class UsuarioRestController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/users")
	public List<Usuario> index(){
		return usuarioService.findAll();
	}
	@GetMapping("/usersmod/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Usuario show(@PathVariable Long id) {
		return usuarioService.findById(id);
	}
	
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario create(@RequestBody Usuario usuario) {
		return usuarioService.save(usuario);
	}
	
	@PutMapping("/usersmod/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario update(@RequestBody Usuario usuario, @PathVariable Long id) {
		Usuario usuarioActual = usuarioService.findById(id);
		usuarioActual.setNombre(usuario.getNombre());
		usuarioActual.setClave(usuario.getClave());
		usuarioActual.setAuthority(usuario.getAuthority());
		usuarioActual.setEnabled(usuario.getEnabled());
		usuarioActual.setUser_id(usuario.getUser_id());
		return usuarioService.save(usuarioActual);
	}
	
	@DeleteMapping("/users/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete (@PathVariable Long id) {
		usuarioService.delete(id);
	}
	
}

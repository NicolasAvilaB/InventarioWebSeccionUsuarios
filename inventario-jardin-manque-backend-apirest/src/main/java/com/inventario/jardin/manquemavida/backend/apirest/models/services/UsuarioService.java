package com.inventario.jardin.manquemavida.backend.apirest.models.services;

import java.util.List;

import com.inventario.jardin.manquemavida.backend.apirest.models.entity.Usuario;

public interface UsuarioService {
	public List<Usuario> findAll();
	
	public Usuario findById(Long id);
	
	public Usuario save(Usuario usuario);
	
	public void delete (Long id);
	
}

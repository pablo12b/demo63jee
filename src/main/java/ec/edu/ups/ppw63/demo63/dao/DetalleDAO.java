package ec.edu.ups.ppw63.demo63.dao;

import java.util.List;

import ec.edu.ups.ppw63.demo63.model.DetalleFactura;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Stateless
public class DetalleDAO {
	
	@PersistenceContext
	public EntityManager em;
	
	public void insert(DetalleFactura detalle) {
		em.persist(detalle);
	}
	
	public void update(DetalleFactura detalle) {
		em.merge(detalle);
	}
	
	public void remove(int codigo) {
		DetalleFactura detalle = em.find(DetalleFactura.class, codigo);
		em.remove(detalle);
	}
	
	public DetalleFactura read(int codigo) {
		DetalleFactura detalle = em.find(DetalleFactura.class, codigo);
		return detalle;
	}
	
	public List<DetalleFactura> getAll(){
		String jpql = "SELECT c FROM DetalleFactura c";
		Query q = em.createQuery(jpql, DetalleFactura.class);
		return q.getResultList();
	}
}

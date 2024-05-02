package ec.edu.ups.ppw63.demo63.business;

import java.util.List;
import ec.edu.ups.ppw63.demo63.dao.DetalleDAO;
import ec.edu.ups.ppw63.demo63.model.DetalleFactura;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

@Stateless
public class GestionDetalleFacturas implements GestionDetalleFacturasRemoto, GestionDetalleFacturasLocal {
	
	@Inject
	private DetalleDAO daoDetalle;

	public void guardarDetalles(DetalleFactura detalle) {
		DetalleFactura cli = daoDetalle.read(detalle.getCodigo());
		if (cli != null){
			daoDetalle.update(detalle);
		}else {
			daoDetalle.insert(detalle);
		}
	}
	
	public void actualizarDetalle(DetalleFactura detalle) throws Exception {
		DetalleFactura cli = daoDetalle.read(detalle.getCodigo());
		if (cli != null){
			daoDetalle.update(detalle);
		}else {
			throw new Exception("Cliente no existe");
		}
	}
	
	public void borrarDetalle(int codigo){
		daoDetalle.remove(codigo);
	}
	
	public List<DetalleFactura> getDetalles(){
		return daoDetalle.getAll();
	}
}

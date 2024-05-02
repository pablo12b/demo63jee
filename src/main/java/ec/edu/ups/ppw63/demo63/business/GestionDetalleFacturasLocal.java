package ec.edu.ups.ppw63.demo63.business;

import java.util.List;

import ec.edu.ups.ppw63.demo63.model.DetalleFactura;
import jakarta.ejb.Local;

@Local
public interface GestionDetalleFacturasLocal {
	public void guardarDetalles(DetalleFactura detalle);
	public void actualizarDetalle(DetalleFactura detalle) throws Exception;
	public void borrarDetalle(int codigo);
	public List<DetalleFactura> getDetalles();
}

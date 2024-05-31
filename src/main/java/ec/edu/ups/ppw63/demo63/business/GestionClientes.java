package ec.edu.ups.ppw63.demo63.business;

import java.util.List;

import ec.edu.ups.ppw63.demo63.dao.ClienteDAO;
import ec.edu.ups.ppw63.demo63.model.Cliente;
import io.opentracing.Scope;
import io.opentracing.Span;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;

@Stateless
public class GestionClientes {
	
	@Inject
	private ClienteDAO daoCliente;
	
	private final Tracer tracer = GlobalTracer.get();

	public void guardar(Cliente cliente) {
		Span span = tracer.buildSpan("guardar").start();
		try (Scope scope = tracer.scopeManager().activate(span)) {
			daoCliente.insert(cliente);
		} catch (Exception e) {
			span.log(e.getMessage());
			throw e;
		} finally {
			span.finish();
		}
	}
	
	public void actualizar(Cliente cliente) {
	    Cliente clientes = daoCliente.getClientePorCedula(cliente.getDni());
	    Span span = tracer.buildSpan("actualizar").start();
	    try (Scope scope = tracer.scopeManager().activate(span)) {
	        if (clientes != null) {
	            clientes.setNombre(cliente.getNombre());
	            clientes.setDireccion(cliente.getDireccion());
	            // Agregar cualquier otro campo que necesite ser actualizado aquí

	            daoCliente.update(clientes);
	        } else {
	            System.out.println("Cliente no encontrado");
	        }
	    } catch (Exception e) {
	        span.log(e.getMessage());
	        throw e;
	    } finally {
	        span.finish();
	    }
	}
	
	public void borrar(String dni) {
		Cliente clientes = daoCliente.getClientePorCedula(dni);
		Span span = tracer.buildSpan("eliminar").start();
		try {
			try (Scope scope = tracer.scopeManager().activate(span)) {
				if (clientes != null) {
					daoCliente.remove(clientes.getCodigo());
				} else {
					System.out.println("No existe");
				}
			} catch (Exception s) {
				s.printStackTrace();
			}
		} catch (Exception e) {
			span.log(e.getMessage());
			throw e;
		} finally {
			span.finish();
		}
	}
	
	public List<Cliente> getClientes() {
		Span span = tracer.buildSpan("listar").start();
		try {
			try (Scope scope = tracer.scopeManager().activate(span)) {
				return daoCliente.getAll();
			} catch (Exception ex) {
				span.log(ex.getMessage());
				throw ex;
			} finally {
				span.finish();
			}
		} catch (Exception e) {
			return null;
		}

	}
}



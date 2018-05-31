﻿ /*
FUNCTION eproductos.fn_SavePedido
Descripcion: Guarda o aactualiza un pedido
Parametros: necesarios para un pedido
Fecha:17052018 
Ejecucion: SELECT * from eproductos.fn_SaveComanda(-1,'CLIENTES VARIOS','PEN',26.50,'OCUPADO','ME1','ADMIN')
DROP: DROP FUNCTION eproductos.fn_SaveComanda(
pnumero int,
 pnombre_cliente varchar(12),
 pcod_moneda varchar(4),
 ptotal numeric(18,4),
 pusuario_registro varchar(50))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveComanda
(
 pnumero int,
 pnombre_cliente varchar(12),
 pcod_moneda varchar(4),
 ptotal numeric(18,4),
 pestado_pedido varchar(25),
 pcod_punto_venta varchar(10),
 pusuario_registro varchar(50)
)
RETURNS TABLE(
numero int,
pedido_id int
) AS
$$
DECLARE
ppedido_id int;
pcod_sucursal varchar(30);
BEGIN

IF( (select count(*) from ecaja.pedido where ecaja.pedido.numero=pnumero) = 0) THEN
pnumero=(select p.numero from ecaja.pedido p where p.cod_documento = 'COM' and p.nro_serie=1 order by p.numero desc limit 1)+1;
if(pnumero is null)then
pnumero=1;
end if;

pcod_sucursal = (select cod_sucursal from sucursal order by creado_en limit 1);  
INSERT INTO ecaja.pedido(
	cod_documento,
	nro_serie,
	cod_sucursal,
	numero,
	cod_persona,
	nombre_cliente,
	glosa,
	cod_moneda,
	total,
	estado_pedido,
	creado_en,
	usuario_creacion) 
VALUES(
	'COM',
	1,
	pcod_sucursal,
	pnumero,
	null,
	pnombre_cliente,
	'COMANDA',
	pcod_moneda,
	ptotal,
	'EN ATENCION',
	now(),
	pusuario_registro);
ppedido_id = (SELECT CURRVAL('ecaja.pedido_pedido_id_seq'));
ELSE
ppedido_id = (select p.pedido_id from ecaja.pedido p where p.cod_documento='COM' 
	and p.nro_serie=1 and p.numero=pnumero);
UPDATE ecaja.pedido SET
 nombre_cliente=pnombre_cliente,
 cod_moneda=pcod_moneda,
 total=ptotal,
 actualizado_en=now(),
 usuario_actualizo=pusuario_registro
WHERE ecaja.pedido.pedido_id=ppedido_id;
END IF;

UPDATE punto_venta SET
estado_accion=pestado_pedido,
usuario_accion=pusuario_registro
where cod_punto_venta=pcod_punto_venta;

 RETURN QUERY 
 SELECT pnumero "numero",ppedido_id "pedido_id";
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$
LANGUAGE plpgsql;
 /*
FUNCTION eproductos.fn_SaveComanda_Detalle
Descripcion: Guarda o aactualiza un pedido detalle
Parametros: necesarios para un pedido detalle
Fecha:17052018
Ejecucion: SELECT  eproductos.fn_SaveComanda_Detalle(4,81,8,0,'ALM1',1,'CREMOLADA DE UVA',1.5,'ME1','CONFIRMA','ADMIN')
DROP: DROP FUNCTION eproductos.fn_SaveComanda_Detalle(
pnumero int,
 pnombre_cliente varchar(12),
 pcod_moneda varchar(4),
 ptotal numeric(18,4),
 pusuario_registro varchar(50))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveComanda_Detalle
(
 ppedido_id int,
 pid_detalle varchar(20),
 pproducto_id integer,
 pid_referencia varchar(20),
 palmacen_cod varchar(50),
 pcantidad integer,
 pdescripcion_detalle varchar(256),
 pprecio numeric(18,4),
 pcod_punto_venta varchar(30),
 pestado_detalle varchar(25),
 pusuario_registro varchar(50)
)
RETURNS INTEGER AS
$$
BEGIN

DELETE FROM ecaja.pedido_detalle
WHERE pedido_id=ppedido_id and estado_detalle='PENDIENTE';

INSERT INTO ecaja.pedido_detalle(
	pedido_id,
	id_detalle,
	producto_id,
	id_referencia,
	almacen_cod,
	cantidad,
	descripcion_detalle,
	precio,
	cod_punto_venta,
	estado_detalle,
	creado_en,
	usuario_creacion) 
VALUES(
	ppedido_id,
	pid_detalle,
	pproducto_id,
	pid_referencia,
	palmacen_cod,
	pcantidad,
	pdescripcion_detalle,
	pprecio,
	pcod_punto_venta,
	pestado_detalle,
	now(),
	pusuario_registro);

 RETURN ppedido_id;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$
LANGUAGE plpgsql;


--(SELECT count(distinct d.pedido_id) from ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id where d.cod_punto_venta='ME1')
--(SELECT d.usuario_creacion from ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id where d.cod_punto_venta='ME1' limit 1)

 /*
FUNCTION eproductos.fn_GetPedidoByPunto
Descripcion: recupera pedido de una mesa
Parametros: necesarios para un pedido
Fecha:17052018
Ejecucion: SELECT * from eproductos.fn_GetPedidoByPunto('ME1')
DROP: DROP FUNCTION eproductos.fn_GetPedidoByPunto(
pcod_mesa varchar(10))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_GetPedidoByPunto
(
 pcod_mesa varchar(10)
)
RETURNS TABLE(
pedido_id int,
numero int,
id_detalle varchar(20),
producto_id int,
id_referencia varchar(20),
almacen_cod varchar(50),
cantidad int,
nombre varchar(256),
simbolo unknown,
valor_precio numeric(18,4),
cod_mesa varchar(30),
estado_detalle varchar(25),
imagen_url varchar(110)
) AS
$$
BEGIN


 RETURN QUERY
 SELECT d.pedido_id,p.numero,d.id_detalle,d.producto_id,d.id_referencia,
 d.almacen_cod,d.cantidad,d.descripcion_detalle "nombre",
 'S/.' "simbolo",d.precio "valor_precio",
 d.cod_punto_venta "cod_mesa",d.estado_detalle
 ,(select pro.imagen_url from eproductos.producto pro where pro.producto_id=d.producto_id) 
 FROM ecaja.pedido_detalle d 
 inner join ecaja.pedido p on d.pedido_id=p.pedido_id and p.estado_pedido='EN ATENCION'
 where d.cod_punto_venta=pcod_mesa;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$
LANGUAGE plpgsql;


/*
FUNCTION ecaja.fn_SaveComprobantePedido
Descripcion: Guarda o actualiza Comprobante de un pedido
Ejecucion: SELECT * from ecaja.fn_savecomprobantepedido('COM',1,1,'S001',2,'-1','CLIENTES VARIOS','NINGUNA','ninguna',12.0000,0.0000,'EMITIDO','jjjjjjj','12-12-2018','ADMIN')
 
*/

CREATE OR REPLACE FUNCTION ecaja.fn_savecomprobantepedido(
    pcod_documento character varying,
    pnro_serie integer,
    pnumero integer,
    pcod_sucursal character varying,
    ppedido_id integer,
    pcod_persona character varying,
    pnombre_cliente character varying,
    pdireccion_cliente character varying,
    pconcepto character varying,
    ptotal numeric,
    pimpuesto numeric,
    pestado character varying,
    pobs character varying,
    pfecha_emision timestamp without time zone,
    pusuario_registro character varying)
  RETURNS character varying AS
$BODY$
DECLARE
   nro_cuentas int;
   pcod_punto_venta varchar(30);
BEGIN

 
INSERT INTO ecaja.comprobante(
	comp_cod_documento,
	comp_nro_serie,
	comp_numero,
	comp_cod_sucursal,
	pedido_id,
	cod_persona,
	nombre_cliente,
	direccion_cliente,
	comp_concepto,
	comp_total,
	comp_impuesto,
	comp_estado,
	comp_obs,
	fecha_emision,
	estado,
	creado_en,
	usuario_creacion)
VALUES(
	 pcod_documento ,
	 pnro_serie,
	 pnumero,
	 pcod_sucursal,
	 ppedido_id,
	 pcod_persona,
	 pnombre_cliente,
	 pdireccion_cliente,
	 pconcepto,
	 ptotal,
	 pimpuesto,
	 pestado,
	 pobs,
	 pfecha_emision,
	 'ACTIVO',	
	 now(),
	 pusuario_registro);

UPDATE ecaja.pedido SET 
 estado_pedido = 'TERMINADO'
WHERE pedido_id=ppedido_id;

pcod_punto_venta = (SELECT DISTINCT (d.cod_punto_venta) FROM ecaja.pedido_detalle d WHERE d.pedido_id=ppedido_id);

nro_cuentas  = (SELECT count(distinct d.pedido_id) from ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id WHERE d.cod_punto_venta = pcod_punto_venta AND p.estado_pedido='EN ATENCION');
 
IF nro_cuentas = 0 THEN 

	UPDATE punto_venta	
	SET estado_accion='LIBRE',
	usuario_accion=null
	WHERE cod_punto_venta = pcod_punto_venta;
END IF;
RETURN 'El comprobante fue guardado correctamente';

 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION ecaja.fn_savecomprobantepedido(character varying, integer, integer, character varying, integer, character varying, character varying, character varying, character varying, numeric, numeric, character varying, character varying, timestamp without time zone, character varying)
  OWNER TO postgres;

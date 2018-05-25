﻿ /*
FUNCTION eproductos.fn_SavePedido
Descripcion: Guarda o aactualiza un pedido
Parametros: necesarios para un pedido
Fecha:17052018
Ejecucion: SELECT * from eproductos.fn_SaveComanda(4,'CLIENTES VARIOS','PEN',26.50,'OCUPADO','ME1','ADMIN')
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
 pid_detalle integer,
 pproducto_id integer,
 pid_referencia integer,
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
Ejecucion: SELECT * from eproductos.fn_GetPedidoByPunto('ME15')
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
id_detalle integer,
producto_id integer,
id_referencia integer,
almacen_cod varchar(50),
cantidad integer,
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
 'S/.',d.precio "valor_precio",
 d.cod_punto_venta "cod_mesa",d.estado_detalle
 ,(select pro.imagen_url from eproductos.producto pro where pro.producto_id=d.producto_id) 
 FROM ecaja.pedido_detalle d 
 inner join ecaja.pedido p on d.pedido_id=p.pedido_id 
 where d.cod_punto_venta=pcod_mesa;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$
LANGUAGE plpgsql;
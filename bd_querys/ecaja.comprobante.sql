/*
FUNCTION ecaja.fn_getRowsComprobantes
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT ecaja.fn_getRowsComprobantes('') AS Filas
DROP: DROP FUNCTION IF EXISTS ecaja.fn_getRowsComprobantes(varchar(50),integer)
*/
CREATE OR REPLACE FUNCTION ecaja.fn_getRowsComprobantes(comprobante_busqueda varchar(50)='', numero_serie_busqueda integer=-1)
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 IF (numero_serie_busqueda=-1) THEN
	RETURN (select count(*) from ecaja.comprobante c inner join sucursal s on c.comp_cod_sucursal = s.cod_sucursal WHERE c.comp_cod_documento like ('%' || comprobante_busqueda || '%') or c.nombre_cliente like ('%' || comprobante_busqueda || '%') or c.direccion_cliente like ('%' || comprobante_busqueda || '%') or c.comp_concepto like ('%' || comprobante_busqueda || '%') or s.nombre like ('%' || comprobante_busqueda || '%'));
 ELSE
	RETURN (select count(*) from ecaja.comprobante c inner join sucursal s on c.comp_cod_sucursal = s.cod_sucursal WHERE c.comp_cod_documento like ('%' || comprobante_busqueda || '%') or c.nombre_cliente like ('%' || comprobante_busqueda || '%') or c.direccion_cliente like ('%' || comprobante_busqueda || '%') or c.comp_concepto like ('%' || comprobante_busqueda || '%') or s.nombre like ('%' || comprobante_busqueda || '%') or c.comp_nro_serie = numero_serie_busqueda or c.comp_numero = numero_serie_busqueda );
 END IF;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

 
/*
FUNCTION ecaja.fn_GetComprobantes
Descripcion: Recupera todos los comprobantes
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * from ecaja.fn_GetComprobantes(5,1,'')
DROP FUNCTION ecaja.fn_getcomprobantes(integer,integer,character varying,integer)
*/

CREATE OR REPLACE FUNCTION ecaja.fn_GetComprobantes
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,comprobante_busqueda varchar(50)=''
 ,numero_serie_busqueda integer = -1
)
RETURNS TABLE 
(
 comp_cod_documento varchar(5),
 comp_nro_serie int,
 comp_numero int,
 comp_cod_sucursal varchar(30),
 nombre_sucursal varchar(100),
 pedido_id int,
 cod_persona varchar(12), 
 nombre_cliente varchar(200),
 direccion_cliente varchar(256),
 comp_concepto varchar(100),
 comp_total numeric(18,4),
 comp_impuesto numeric(18,4),
 comp_estado varchar(25),
 comp_obs varchar(256),
 fecha_emision date,
 estado      varchar(20),
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
) AS
$$
DECLARE PageNumber BIGINT;
 
BEGIN
 /* ***************************************************************
 Construct Custom paging parameter...
 **************************************************************** */
 IF (tamano_pagina IS NOT NULL AND numero_pagina IS NOT NULL) THEN
  PageNumber := (tamano_pagina * (numero_pagina-1)); 
 END IF; 
  
 /* ************************************************
 Custome paging SQL Query construction.......
 ************************************************ */
 
 IF (numero_serie_busqueda=-1) THEN
  RETURN QUERY 
  SELECT c.comp_cod_documento,
		c.comp_nro_serie,
		c.comp_numero,
		c.comp_cod_sucursal,
		(SELECT s.nombre FROM sucursal s WHERE s.cod_sucursal = c.comp_cod_sucursal LIMIT 1) AS nombre_sucursal,
		c.pedido_id,
		c.cod_persona, 
		c.nombre_cliente,
		c.direccion_cliente,
		c.comp_concepto,
		c.comp_total,
		c.comp_impuesto,
		c.comp_estado,
		c.comp_obs,
		date(c.fecha_emision),
		c.estado,
		c.creado_en,
		c.usuario_creacion,
		c.actualizado_en,
		c.usuario_actualizo
	 FROM ecaja.comprobante c
	 WHERE c.comp_cod_documento like ('%' || comprobante_busqueda || '%') or c.nombre_cliente like ('%' || comprobante_busqueda || '%') or c.direccion_cliente like ('%' || comprobante_busqueda || '%') or c.comp_concepto like ('%' || comprobante_busqueda || '%') or nombre_sucursal like ('%' || comprobante_busqueda || '%')
	 ORDER BY c.comp_cod_documento
	 LIMIT tamano_pagina
	 OFFSET PageNumber;
 ELSE

   RETURN QUERY	
   SELECT 	c.comp_cod_documento,
		c.comp_nro_serie,
		c.comp_numero,
		c.comp_cod_sucursal,
		(SELECT s.nombre FROM sucursal s WHERE s.cod_sucursal = c.comp_cod_sucursal LIMIT 1) AS nombre_sucursal,
		c.pedido_id,
		c.cod_persona, 
		c.nombre_cliente,
		c.direccion_cliente,
		c.comp_concepto,
		c.comp_total,
		c.comp_impuesto,
		c.comp_estado,
		c.comp_obs,
		date(c.fecha_emision),
		c.estado,
		c.creado_en,
		c.usuario_creacion,
		c.actualizado_en,
		c.usuario_actualizo
	 FROM ecaja.comprobante c
	 WHERE c.comp_cod_documento like ('%' || comprobante_busqueda || '%') or c.nombre_cliente like ('%' || comprobante_busqueda || '%') or c.direccion_cliente like ('%' || comprobante_busqueda || '%') or c.comp_concepto like ('%' || comprobante_busqueda || '%') or nombre_sucursal like ('%' || comprobante_busqueda || '%') or c.comp_nro_serie = numero_serie_busqueda or c.comp_numero = numero_serie_busqueda
	 ORDER BY c.comp_cod_documento
	 LIMIT tamano_pagina
	 OFFSET PageNumber;
	
 END IF;
  
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


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







/*
FUNCTION ecaja.fn_getRowsCaja
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT ecaja.fn_getRowsCaja('') AS Filas
DROP: DROP FUNCTION IF EXISTS ecaja.fn_getRowsCaja(varchar(50))
*/
CREATE OR REPLACE FUNCTION ecaja.fn_getRowsCaja(caja_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from ecaja.caja c WHERE c.nombre_caja like ('%' || caja_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



/*
FUNCTION ecaja.fn_GetCajas
Descripcion: Recupera todas las cajas 
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * from ecaja.fn_GetCajas(5,1,'')
*/

CREATE OR REPLACE FUNCTION ecaja.fn_GetCajas
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,caja_busqueda varchar(50)=''
)
RETURNS TABLE 
(
 cod_caja 	 varchar(10),
 cod_sucursal 	 varchar(30),
 nombre_sucursal varchar(100),
 nombre_caja 	 varchar(30),
 clave 		 varchar(128),
 observacion 	 varchar(150),
 nombre_ip 	 varchar(18),
 estado      	 varchar(20) ,
 creado_en 	 TIMESTAMP,
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
 RETURN QUERY
 SELECT c.cod_caja,
	c.cod_sucursal,
	(SELECT s.nombre FROM sucursal s WHERE s.cod_sucursal = c.cod_sucursal LIMIT 1) AS nombre_sucursal,
	c.nombre_caja,
	c.clave,
	c.observacion,
	c.nombre_ip,
	c.estado,
	c.creado_en,
	c.usuario_creacion,
	c.actualizado_en,
	c.usuario_actualizo
 FROM ecaja.caja c
 WHERE c.nombre_caja like ('%' || caja_busqueda  || '%')
 ORDER BY c.cod_caja
 LIMIT tamano_pagina
 OFFSET PageNumber; 
  EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



 /*
FUNCTION ecaja.fn_SaveCaja
Descripcion: Guarda o actualiza una caja
Parametros: necesarios para una caja
Ejecucion: SELECT * FROM  ecaja.fn_SaveCaja('C01','IIIII','PRUEBA DE CAJA','12313123123','NINGUNA','192.168.1.12','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION ecaja.fn_SaveCaja
(
 _cod_caja 		varchar(10),
 _cod_sucursal 		varchar(30) ,
 _nombre_caja 		varchar(30),
 _clave      		varchar(128),
 _observacion      	varchar(150),
 _nombre_ip      	varchar(18),
 _estado      		varchar(20),
 _usuario_registro 	varchar(50)
)
RETURNS TABLE 
( 
 cod_caja 		varchar(10),
 cod_sucursal 		varchar(30) ,
 nombre_caja 		varchar(30),
 clave      		varchar(128),
 observacion      	varchar(150),
 nombre_ip      	varchar(18),
 estado      		varchar(20),
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) FROM ecaja.caja c where c.cod_caja=_cod_caja) = 0) THEN
INSERT INTO ecaja.caja(
	cod_caja,
	cod_sucursal,
	nombre_caja,
	clave,
	observacion,
	nombre_ip,
	estado,
	creado_en,
	usuario_creacion,
	actualizado_en,
	usuario_actualizo) 
VALUES(
	_cod_caja,
	_cod_sucursal,
	_nombre_caja,
	_clave,
	_observacion,
	_nombre_ip,
	_estado,
	now(),
	_usuario_registro,
	null,
	null);
ELSE
UPDATE ecaja.caja SET
 cod_caja = _cod_caja,
 cod_sucursal = _cod_sucursal,
 nombre_caja = _nombre_caja,
 clave = _clave,
 observacion = _observacion,
 nombre_ip = _nombre_ip,
 estado = _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario_registro
WHERE ecaja.caja.cod_caja = _cod_caja;
END IF;

 RETURN QUERY
 SELECT *
 FROM ecaja.caja c
 WHERE c.cod_caja = _cod_caja;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION ecaja.fn_DeleteCaja
Descripcion: Eliminar caja
Parametros: cod_caja
Ejecucion: SELECT ecaja.fn_DeleteCaja('C01') "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS ecaja.fn_DeleteCaja(varchar(10))
*/
CREATE OR REPLACE FUNCTION ecaja.fn_DeleteCaja(varchar(10))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from ecaja.caja where ecaja.caja.cod_caja= $1) = 1) THEN
  delete from ecaja.caja
	where ecaja.caja.cod_caja = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la caja';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
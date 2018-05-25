/*
FUNCION
Nombre: fn_DeleteCombinacionDetalle
Descripcion: Eliminina un combinacion detalle
Parametros: 
Ejecucion: SELECT * FROM eproductos.fn_DeleteCombinacionDetalle(1)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_DeleteCombinacionDetalle(_detalle_id INTEGER)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eproductos.combinacion_detalle where detalle_id=_detalle_id) = 1) THEN
  delete from eproductos.combinacion_detalle
	where eproductos.combinacion_detalle.detalle_id=_detalle_id;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el producto';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
/*
FUNCION
Nombre: fn_DeleteCombinacion
Descripcion: Eliminina un combinacion con todos sus detalles
Parametros: 
Ejecucion: SELECT * FROM eproductos.fn_DeleteCombinacion(1)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_DeleteCombinacion(_combinacion_id INTEGER)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eproductos.combinacion where combinacion_id=_combinacion_id) = 1) THEN
  delete from eproductos.combinacion_detalle where eproductos.combinacion_detalle.combinacion_id=_combinacion_id;
  delete from eproductos.combinacion where eproductos.combinacion.combinacion_id=_combinacion_id;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el producto';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCION
Nombre: fn_SaveCombinacion
Descripcion: guarda una combinacion
Parametros: 
Ejecucion: SELECT * FROM eproductos.fn_SaveCombinacion(-1,'Elije sabores',1,0,'ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveCombinacion
(
 _combinacion_id INTEGER,
 _etiqueta_titulo VARCHAR(100),
 _cantidad_minima INTEGER,
 _cantidad_maxima INTEGER,
 _estado VARCHAR(20),
 _usuario_creacion VARCHAR(50)
)
RETURNS TABLE 
( 
    combinacion_id INTEGER
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eproductos.combinacion where eproductos.combinacion.combinacion_id=_combinacion_id) = 0 ) THEN
    RETURN QUERY
    INSERT INTO eproductos.combinacion(
	etiqueta_titulo,
    cantidad_minima,
    cantidad_maxima,
    estado,
    creado_en,
    usuario_creacion,
    actualizado_en,
    usuario_actualizo
    ) 
VALUES(
 _etiqueta_titulo,
    _cantidad_minima,
    _cantidad_maxima,
    _estado,
    now(),
    _usuario_creacion,
    null,
    null
    ) RETURNING eproductos.combinacion.combinacion_id;

ELSE
RETURN QUERY
UPDATE eproductos.combinacion SET
 etiqueta_titulo = _etiqueta_titulo,
 cantidad_minima = _cantidad_minima,
 cantidad_maxima = _cantidad_maxima,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_creacion
WHERE eproductos.combinacion.combinacion_id=_combinacion_id RETURNING eproductos.combinacion.combinacion_id;
END IF;

 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCION
Nombre: fn_SaveCombinacionDetalle
Descripcion: guarda una combinacion
Parametros: 
Ejecucion: SELECT * FROM eproductos.fn_SaveCombinacionDetalle(params)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveCombinacionDetalle
(
 _detalle_id INTEGER,
 _combinacion_id INTEGER,
 _producto_id INTEGER,
 _nombre_producto VARCHAR(200),
 _cod_moneda VARCHAR(10),
 _precio numeric(38,6),
 _estado VARCHAR(20),
 _usuario_creacion VARCHAR(50)
)
RETURNS TABLE 
( 
    detalle_id INTEGER,
    combinacion_id INTEGER,
    producto_id INTEGER,
    nombre_producto VARCHAR(200),
    cod_moneda VARCHAR(10),
    precio numeric(38,6),
    estado VARCHAR(20),
    creado_en timestamp,
    usuario_creacion VARCHAR(50),
    actualizado_en timestamp,
    usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eproductos.combinacion_detalle where eproductos.combinacion_detalle.detalle_id=_detalle_id) = 0 ) THEN
INSERT INTO eproductos.combinacion_detalle(
	combinacion_id,
    producto_id,
    nombre_producto,
    cod_moneda,
    precio,
    estado,
    creado_en,
    usuario_creacion,
    actualizado_en,
    usuario_actualizo
    ) 
VALUES(
	_combinacion_id,
    _producto_id,
    _nombre_producto,
    _cod_moneda,
    _precio,
    _estado,
    now(),
    _usuario_creacion,
    null,
    null
    );

ELSE
UPDATE eproductos.combinacion_detalle SET
 combinacion_id = _combinacion_id,
 producto_id = _producto_id,
 nombre_producto = _nombre_producto,
 cod_moneda =_cod_moneda,
 precio =_precio,
 estado =_estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario_creacion
WHERE eproductos.combinacion_detalle.detalle_id=_detalle_id;
END IF;

 RETURN QUERY
 SELECT *
 FROM eproductos.combinacion_detalle c
 WHERE c.detalle_id = _detalle_id
 ORDER BY c.nombre_producto;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';
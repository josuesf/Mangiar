/*
FUNCTION eproductos.fn_getRowsCategoria
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT eproductos.fn_getRowsCategoria('') AS Filas
DROP: DROP FUNCTION IF EXISTS eproductos.fn_getRowsCategoria(varchar(50))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_getRowsCategoria(categoria_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from eproductos.categoria c WHERE c.nombre_categoria like ('%' || categoria_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
/*
FUNCTION eproductos.fn_GetCategorias
Descripcion: Recupera todas las cuentas 
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * from eproductos.fn_GetCategorias(5,1,'')
*/
CREATE OR REPLACE FUNCTION eproductos.fn_GetCategorias
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,categoria_busqueda varchar(50)=''
)
RETURNS TABLE 
(
 cod_categoria varchar(50),
 nombre_categoria varchar(100),
 imagen_url varchar(110),
 estado      varchar(20) ,
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
 RETURN QUERY
 SELECT *
 FROM eproductos.categoria c
 WHERE c.nombre_categoria like ('%' || categoria_busqueda || '%')
 ORDER BY cod_categoria
 LIMIT tamano_pagina
 OFFSET PageNumber; 
  EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

 /*
FUNCTION eproductos.fn_SaveCategoria
Descripcion: Guarda o aactualiza una categoria
Parametros: necesarios para una categoria
Fecha:17052018
Ejecucion: SELECT * FROM  eproductos.fn_SaveCategoria('COM','COMIDAS','','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveCategoria
(
 _cod_categoria varchar(50),
 _nombre_categoria VARCHAR(100) ,
 _imagen_url varchar(110),
 _estado      varchar(20) ,
 _usuario_registro varchar(50)
)
RETURNS TABLE 
( 
 cod_categoria varchar(50),
 nombre_categoria varchar(100),
 imagen_url varchar(110),
 estado      varchar(20) ,
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) FROM eproductos.categoria c where c.cod_categoria=_cod_categoria) = 0) THEN
INSERT INTO eproductos.categoria(
	cod_categoria,
	nombre_categoria,
	imagen_url,
	estado,
	creado_en,
	usuario_creacion,
	actualizado_en,
	usuario_actualizo) 
VALUES(
	_cod_categoria,
	_nombre_categoria,
	_imagen_url,
	_estado,
	now(),
	_usuario_registro,
	null,
	null);
ELSE
IF( _imagen_url = '')then
  _imagen_url = (SELECT c.imagen_url from eproductos.categoria c where c.cod_categoria=_cod_categoria);
END IF;
UPDATE eproductos.categoria SET
 nombre_categoria = _nombre_categoria ,
 imagen_url = _imagen_url,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_registro
WHERE eproductos.categoria.cod_categoria = _cod_categoria;
END IF;

 RETURN QUERY
 SELECT *
 FROM eproductos.categoria c
 WHERE c.cod_categoria = _cod_categoria;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION eproductos.fn_DeleteCategoria
Descripcion: Eliminar categoria
Parametros: cod_categoria
Ejecucion: SELECT eproductos.fn_DeleteCategoria('CA001') "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS eproductos.fn_DeleteCategoria(varchar(50))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_DeleteCategoria(varchar(50))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eproductos.categoria where cod_categoria= $1) = 1) THEN
  delete from eproductos.categoria
	where eproductos.categoria.cod_categoria = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la categoria';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
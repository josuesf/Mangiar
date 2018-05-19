/*
FUNCION
Nombre: fn_GetRowsModulo
Descripcion: Recupera cuantos modulos
tenemos que listar incluso si estan con un 
filtro de busqueda
Parametros: modulo_busqueda VARCHAR(50)
Ejecucion: SELECT * FROM eseguridad.fn_GerRowsModulo('')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_getRowsModulo(modulo_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from eseguridad.modulo m WHERE m.nombre like ('%' || modulo_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
/*
FUNCION
Nombre: fn_GetModulos
Descripcion: Recupera todos los modulos
de cierto numero de pagina teniendo en cuenta
el numero de modulos por pagina
Parametros: tamano_pagina INTEGER, numero_pagina INTEGER,
            modulo_busqueda VARCHAR(50)
Ejecucion: SELECT * FROM eseguridad.fn_GerModulos(20,1,'')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_GetModulos
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,modulo_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_modulo VARCHAR(30),
 nombre VARCHAR(50),
 descripcion VARCHAR(70),
 nivel smallint,
 ruta_modulo VARCHAR(110),
 tipo_modulo VARCHAR(20),
 image_url VARCHAR(110),
 estado VARCHAR(20),
 creado_en TIMESTAMP,
 usuario_creacion VARCHAR(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo VARCHAR(50)
) AS
$BODY$
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
 FROM eseguridad.modulo m
 WHERE m.nombre like ('%' || modulo_busqueda || '%')
 ORDER BY nombre
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCION
Nombre: fn_SaveModulo
Descripcion: Guarda o actualiza un modulo
Parametros: tamano_pagina INTEGER, numero_pagina INTEGER,
            modulo_busqueda VARCHAR(50)
Ejecucion: SELECT * FROM eseguridad.fn_GerModulos(20,1,'')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_SaveModulo
(
 _cod_modulo VARCHAR(30),
 _nombre VARCHAR(50),
 _descripcion VARCHAR(50),
 _nivel smallint,
 _ruta_modulo VARCHAR(110),
 _tipo_modulo VARCHAR (20),
 _imagen_url VARCHAR(110),
 _estado VARCHAR(20),
 _usuario_registro VARCHAR(50)
)
RETURNS TABLE 
( 
 cod_modulo VARCHAR(30),
 nombre VARCHAR(50),
 descripcion VARCHAR(70),
 nivel smallint,
 ruta_modulo VARCHAR(110),
 tipo_modulo VARCHAR(20),
 imagen_url VARCHAR(110),
 estado VARCHAR(20),
 creado_en TIMESTAMP,
 usuario_creacion VARCHAR(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo VARCHAR(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eseguridad.modulo where eseguridad.modulo.cod_modulo=_cod_modulo) = 0 ) THEN
INSERT INTO eseguridad.modulo(
	cod_modulo,
    nombre,
    descripcion,
    nivel,
    ruta_modulo,
    tipo_modulo,
    imagen_url,
    estado,
    creado_en,
    usuario_creacion,
    actualizado_en,
    usuario_actualizo
    ) 
VALUES(
	_cod_modulo,
    _nombre,
    _descripcion,
    _nivel,
    _ruta_modulo,
    _tipo_modulo,
    _imagen_url,
    _estado,
    now(),
    _usuario_registro,
    null,
    null
    );

ELSE
UPDATE eseguridad.modulo SET
 nombre = _nombre,
 descripcion = _descripcion,
 nivel = _nivel,
 ruta_modulo = _ruta_modulo,
 tipo_modulo = _tipo_modulo,
 imagen_url = _imagen_url,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_registro
WHERE eseguridad.modulo.cod_modulo  = _cod_modulo;
END IF;

 RETURN QUERY
 SELECT *
 FROM eseguridad.modulo m
 WHERE m.cod_modulo = _cod_modulo
 ORDER BY m.nombre;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCION
Nombre: fn_DeleteModulo
Descripcion: Eliminina un modulo
Parametros: 
Ejecucion: SELECT * FROM eseguridad.fn_DeleteModulos('M001')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_DeleteModulo(_cod_modulo VARCHAR(30))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eseguridad.modulo where cod_modulo=_cod_modulo) = 1) THEN
  delete from eseguridad.modulo
	where eseguridad.modulo.cod_modulo=_cod_modulo;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el usuario';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
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
 image_url VARCHAR(110),
 estado VARCHAR(20),
 creado_en TIMESTAMP,
 usuario_creacion VARCHAR(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo VARCHAR(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eseguridad.modulo where cod_modulo = _cod_modulo) = 0 ) THEN
INSERT INTO eseguridad.modulo(
	cod_modulo,
    nombre,
    descripcion,
    nivel,
    ruta_modulo,
    tipo_modulo,
    image_url,
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
 image_url = _imagen_url,
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
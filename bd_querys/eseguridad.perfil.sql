/*
FUNCION
Nombre: fn_GetRowsPerfil
Descripcion: Recupera cuantos perfiles tenemos
tenemos que listar incluso si estan con un 
filtro de busqueda
Parametros: perfil_busqueda VARCHAR(50)
Ejecucion: SELECT * FROM eseguridad.fn_GerRowsModulo('')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_getRowsPerfil(perfil_busqueda varchar(30)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from eseguridad.perfil p WHERE p.nombre like ('%' || perfil_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCION
Nombre: fn_GetPerfiles
Descripcion: Recupera todos los perfiles
de cierto numero de pagina teniendo en cuenta
el numero de perfiles por pagina
Parametros: tamano_pagina INTEGER, numero_pagina INTEGER,
            perfil_busqueda VARCHAR(50)
Ejecucion: SELECT * FROM eseguridad.fn_GerPerfiles(20,1,'')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_GetPerfiles
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,perfil_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_perfil VARCHAR(30),
 nombre VARCHAR(30),
 descripcion VARCHAR(70),
 url_icono VARCHAR(70),
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
 FROM eseguridad.perfil p
 WHERE p.nombre like ('%' || perfil_busqueda || '%')
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
Nombre: fn_SavePerfil
Descripcion: Guarda o actualiza un perfil
Parametros: Campos...
Ejecucion: SELECT * FROM eseguridad.fn_SavePerfil(S1,S2,...)
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_SavePerfil
(
 _cod_perfil VARCHAR(30),
 _nombre VARCHAR(50),
 _descripcion VARCHAR(50),
 _url_icono VARCHAR(110),
 _estado VARCHAR(20),
 _usuario_creacion VARCHAR(50)
)
RETURNS TABLE 
( 
    cod_perfil varchar(30),
    nombre varchar(30),
    descripcion varchar(70),
    url_icono varchar(70),
    estado varchar(20),
    creado_en TIMESTAMP,
    usuario_creacion varchar(50),
    actualizado_en TIMESTAMP,
    usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eseguridad.perfil where eseguridad.perfil.cod_perfil=_cod_perfil) = 0 ) THEN
INSERT INTO eseguridad.perfil(
	cod_perfil,
    nombre,
    descripcion,
    url_icono,
    estado,
    creado_en,
    usuario_creacion,
    actualizado_en,
    usuario_actualizo
    ) 
VALUES(
	_cod_perfil,
    _nombre,
    _descripcion,
    _url_icono,
    _estado,
    now(),
    _usuario_creacion,
    null,
    null
    );

ELSE
UPDATE eseguridad.perfil SET
 nombre = _nombre,
 descripcion = _descripcion,
 url_icono = _url_icono,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_creacion
WHERE eseguridad.perfil.cod_perfil=_cod_perfil;
END IF;

 RETURN QUERY
 SELECT *
 FROM eseguridad.perfil p
 WHERE p.cod_perfil = _cod_perfil
 ORDER BY p.nombre;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCION
Nombre: fn_SavePerfilModulo
Descripcion: Guarda o actualiza un modulo_perfil
Parametros: Campos...
Ejecucion: SELECT * FROM eseguridad.fn_SavePerfilModulo(S1,S2,...)
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_SavePerfilModulo
(
    _cod_modulo VARCHAR(30),
    _cod_perfil VARCHAR(30),
    _nivel_acceso SMALLINT,
    _estado VARCHAR(20),
    _usuario_creacion VARCHAR(50)
)
RETURNS TABLE 
( 
    cod_modulo VARCHAR(30),
    cod_perfil varchar(30),
    nivel_acceso SMALLINT,
    estado varchar(20),
    creado_en TIMESTAMP,
    usuario_creacion varchar(50),
    actualizado_en TIMESTAMP,
    usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( (SELECT COUNT(*) from eseguridad.perfil_modulo where eseguridad.perfil_modulo.cod_perfil=_cod_perfil AND eseguridad.perfil_modulo.cod_modulo=_cod_modulo) = 0 ) THEN
INSERT INTO eseguridad.perfil_modulo(
    cod_modulo,
    cod_perfil,
    nivel_acceso,
    estado,
    creado_en,
    usuario_creacion,
    actualizado_en,
    usuario_actualizo
    ) 
VALUES(
    _cod_modulo,
	_cod_perfil,
    _nivel_acceso,
    _estado,
    now(),
    _usuario_creacion,
    null,
    null
    );

ELSE
UPDATE eseguridad.perfil_modulo SET
 nivel_acceso = _nivel_acceso,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_creacion
WHERE eseguridad.perfil_modulo.cod_perfil=_cod_perfil AND eseguridad.perfil_modulo.cod_modulo=_cod_modulo;
END IF;

 RETURN QUERY
 SELECT *
 FROM eseguridad.perfil_modulo p
 WHERE p.cod_perfil=_cod_perfil AND p.cod_modulo=_cod_modulo;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCION
Nombre: fn_DeletePerfil
Descripcion: Eliminina un perfil
Parametros: 
Ejecucion: SELECT * FROM eseguridad.fn_DeletePerfil('M001')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_DeletePerfil(_cod_perfil VARCHAR(30))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eseguridad.perfil where cod_perfil=_cod_perfil) = 1) THEN
  DELETE FROM eseguridad.perfil_modulo WHERE cod_perfil=_cod_perfil;
  DELETE FROM eseguridad.perfil WHERE cod_perfil=_cod_perfil;
  _respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el usuario';
END IF;
    
 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
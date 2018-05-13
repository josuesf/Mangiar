/*
FUNCTION fn_GetCuentas
Descripcion: Recupera todas las cuentas 
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetCuentas(20,1,'')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_GetCuentas
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,usuario_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 usuario_id int,
 usuario VARCHAR (50) ,
 contrasena VARCHAR (50) ,
 email VARCHAR (355) ,
 telefono varchar(20),
 foto_url VARCHAR (355),
 cod_perfil varchar(30),
 cod_sucursal varchar(30),
 estado      varchar(20) ,
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 ultimo_ingreso TIMESTAMP
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
 FROM eseguridad.cuenta c
 WHERE c.usuario like ('%' || usuario_busqueda || '%')
 ORDER BY usuario_id
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION eseguridad.fn_SaveCuenta
Descripcion: Guarda o aactualiza una cuenta
Parametros: necesarios para una cuenta
Ejecucion: SELECT * FROM  eseguridad.fn_SaveCuenta(11,'LITZ','"708f0ce9e8d98c9a0722d50287d6397c"','PRUEBA@HOTMAIL.COM',
	'984551995',NULL,NULL,NULL,'ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_SaveCuenta
(
 _usuario_id int,
 _usuario VARCHAR (50) ,
 _contrasena VARCHAR (50) ,
 _email VARCHAR (355) ,
 _telefono varchar(20),
 _foto_url VARCHAR (355),
 _cod_perfil varchar(30),
 _cod_sucursal varchar(30),
 _estado      varchar(20) ,
 _usuario_registro varchar(50)
)
RETURNS TABLE 
( 
 usuario_id int,
 usuario VARCHAR (50) ,
 contrasena VARCHAR (50) ,
 email VARCHAR (355) ,
 telefono varchar(20),
 foto_url VARCHAR (355),
 cod_perfil varchar(30),
 cod_sucursal varchar(30),
 estado      varchar(20) ,
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 ultimo_ingreso TIMESTAMP
) AS
$BODY$
BEGIN
IF( _usuario_id = -1) THEN
INSERT INTO eseguridad.cuenta(
	usuario,
	contrasena,
	email,
	telefono,
	foto_url,
	cod_perfil,
	cod_sucursal,
	estado,
	creado_en,
	usuario_creacion,
	actualizado_en,
	usuario_actualizo,
	ultimo_ingreso) 
VALUES(
	_usuario,
	_contrasena,
	_email,
	_telefono,
	_foto_url,
	cod_perfil,
	cod_sucursal,
	_estado,
	now(),
	_usuario_registro,
	null,
	null,
	null);

_usuario_id = (SELECT CURRVAL('eseguridad.cuenta_usuario_id_seq'));
ELSE
UPDATE eseguridad.cuenta SET
 usuario = _usuario ,
 contrasena = _contrasena,
 email =_email,
 telefono =_telefono,
 foto_url =_foto_url,
 cod_perfil =_cod_perfil,
 cod_sucursal =_cod_sucursal,
 estado =_estado ,
 actualizado_en = now(),
 usuario_actualizo = _usuario_registro
WHERE eseguridad.cuenta.usuario_id = _usuario_id;
END IF;

 RETURN QUERY
 SELECT *
 FROM eseguridad.cuenta c
 WHERE c.usuario_id = _usuario_id
 ORDER BY c.usuario_id;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION eseguridad.fn_DeleteCuenta
Descripcion: Eliminar cuenta
Parametros: usuario_id
Ejecucion: SELECT eseguridad.fn_DeleteCuenta(11) "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS eseguridad.fn_DeleteCuenta(int)
*/
CREATE OR REPLACE FUNCTION eseguridad.fn_DeleteCuenta(int)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eseguridad.cuenta where usuario_id = $1) = 1) THEN
  delete from eseguridad.cuenta
	where eseguridad.cuenta.usuario_id = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el usuario';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
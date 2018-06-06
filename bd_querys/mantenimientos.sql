/*
FUNCTION fn_GetSucursales
Descripcion: Recupera todas las sucursales
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetSucursales(20,1,'')
DROP: DROP FUNCTION fn_GetSucursales
(
 tamano_pagina INTEGER,numero_pagina INTEGER,sucursal_busqueda varchar(50)
)
*/

 
CREATE OR REPLACE FUNCTION fn_GetSucursales
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,sucursal_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_sucursal 			varchar(30),
 nombre       		  	varchar(100),
 direccion            	varchar(120),
 telefono             	varchar(12),
 fax                  	varchar(12),
 correo               	varchar(40),
 tipo_sistema         	varchar(10),
 fecha_inicio         	TIMESTAMP,
 latitud              	numeric(18,2),
 longitud             	numeric(18,2),
 n_departamento         varchar(14),
 n_provincia         	varchar(30),
 n_distrito           	varchar(30),
 departamento 		char(4),
 provincia 		char(4),
 distrito		char(4),
 estado      			varchar(20),
 creado_en 				TIMESTAMP,
 usuario_creacion 		varchar(50),
 actualizado_en 		TIMESTAMP,
 usuario_actualizo 		varchar(50)
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
 SELECT s.cod_sucursal,
 	s.nombre,
	s.direccion,
	s.telefono,
	s.fax,
	s.correo,
	s.tipo_sistema,
	s.fecha_inicio,
	s.latitud,
	s.longitud,
	(SELECT u.departamento FROM ubigeo u WHERE s.departamento = u.cod_departamento limit 1) as n_departamento,
	(SELECT u.provincia FROM ubigeo u WHERE s.provincia = u.cod_provincia limit 1) as n_provincia,
	(SELECT u.distrito FROM ubigeo u WHERE s.distrito = u.cod_distrito limit 1) as n_distrito,
	s.departamento,
	s.provincia,
	s.distrito,
	s.estado,
	s.creado_en,
	s.usuario_creacion,
	s.actualizado_en,
	s.usuario_actualizo
 FROM sucursal s
 WHERE s.nombre like ('%' || sucursal_busqueda || '%')
 ORDER BY s.cod_sucursal
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';



/*
FUNCTION fn_SaveSucursal
Descripcion: Guarda o actualiza una sucursal
Parametros: necesarios para una sucursal
Ejecucion: SELECT * FROM  fn_SaveSucursal('1222','PRUEBA','PRUEBA','1111111',
	'omar.muniz@gmail.com','ninguno',NULL,12222,122222,NULL,NULL,NULL,'ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveSucursal
(
 _cod_sucursal VARCHAR(30),
 _nombre VARCHAR (100) ,
 _direccion VARCHAR (120) ,
 _telefono VARCHAR (12) ,
 _correo varchar(40),
 _fax VARCHAR (12),
 _tipo_sistema varchar(10),
 _latitud numeric(18,2),
 _longitud  numeric(18,2),
 _departamento char(4),
 _provincia char(4),
 _distrito char(4),
 _estado varchar(50),
 _usuario varchar(50)
)
RETURNS TABLE 
( 
 cod_sucursal         	varchar(30),
 nombre               	varchar(100),
 direccion           	varchar(120),
 telefono             	varchar(12),
 fax                  	varchar(12),
 correo               	varchar(40),
 tipo_sistema         	varchar(10),
 fecha_inicio         	TIMESTAMP,
 latitud              	numeric(18,2),
 longitud             	numeric(18,2),
 departamento         	char(4),
 provincia         	char(4),
 distrito           	char(4),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from sucursal s where s.cod_sucursal = _cod_sucursal)) THEN
INSERT INTO sucursal(
	cod_sucursal,
	nombre,
	direccion,
	telefono,
	fax,
	correo,
	tipo_sistema,
	fecha_inicio,
	latitud,
	longitud,
	departamento,
	provincia,
	distrito,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_sucursal,
	_nombre,
	_direccion,
	_telefono,
	_fax,
	_correo,
	_tipo_sistema,
	now(),
	_latitud,
	_longitud,
	_departamento,
	_provincia,
	_distrito,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE sucursal SET
 cod_sucursal =_cod_sucursal,
 nombre =_nombre,
 direccion =_direccion,
 telefono = _telefono,
 fax = _fax,
 correo = _correo,
 tipo_sistema = _tipo_sistema,
 latitud = _latitud,
 longitud = _longitud,
 departamento = _departamento,
 provincia = _provincia,
 distrito = _distrito,
 estado = _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE sucursal.cod_sucursal = _cod_sucursal;
END IF;

 RETURN QUERY
 SELECT *
 FROM sucursal s
 WHERE s.cod_sucursal = _cod_sucursal
 ORDER BY s.cod_sucursal;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_GetUbigeos
Descripcion: Recupera todas los ubigeos
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetUbigeos(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetUbigeos
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,ubigeo_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_departamento       char(2),
 cod_provincia      char(2),
 cod_distrito        char(2),
 departamento varchar(14),
 provincia          varchar(30),
 distrito            varchar(30)
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
 FROM ubigeo u
 WHERE u.departamento like ('%' || ubigeo_busqueda || '%') or u.provincia like ('%' || ubigeo_busqueda || '%') or u.distrito like ('%' || ubigeo_busqueda || '%')
 ORDER BY u.cod_departamento,cod_provincia,cod_distrito
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';




/*
FUNCTION fn_SaveUbigeo
Descripcion: Guarda o actualiza un ubigeo
Parametros: necesarios para un ubigeo
Ejecucion: SELECT * FROM  fn_SaveUbigeo('12','12','12','departamento','provincia','distrito')
*/
CREATE OR REPLACE FUNCTION fn_SaveUbigeo
(
 _cod_departamento      char(2),
 _cod_provincia      	char(2),
 _cod_distrito        	char(2),
 _departamento 		varchar(14),
 _provincia          	varchar(30),
 _distrito            	varchar(30)
)
RETURNS TABLE 
( 
 cod_departamento   	char(2),
 cod_provincia      	char(2),
 cod_distrito        	char(2),
 departamento 		varchar(14),
 provincia          	varchar(30),
 distrito            	varchar(30) 
) AS
$BODY$
BEGIN
IF( not exists (select 1 from ubigeo u where u.cod_departamento = _cod_departamento and u.cod_provincia=_cod_provincia and u.cod_distrito=_cod_distrito)) THEN
INSERT INTO ubigeo(
	cod_departamento,
	cod_provincia,
	cod_distrito,
	departamento,
	provincia,
	distrito) 
	
VALUES(
	_cod_departamento,
	_cod_provincia,
	_cod_distrito,
	_departamento,
	_provincia,
	_distrito);

ELSE
UPDATE ubigeo SET
 departamento = _departamento,
 provincia = _provincia,
 distrito = _distrito

WHERE ubigeo.cod_departamento = _cod_departamento and ubigeo.cod_provincia = _cod_provincia and ubigeo.cod_distrito = _cod_distrito;
END IF;

 RETURN QUERY
 SELECT *
 FROM ubigeo u
 WHERE u.cod_departamento = _cod_departamento and u.cod_provincia = _cod_provincia and u.cod_distrito = _cod_distrito
 ORDER BY u.cod_departamento,u.cod_provincia,u.cod_distrito;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


 /*
FUNCTION fn_GetPuntosVentas
Descripcion: Recupera todas los puntos de ventas
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetPuntosVentas(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetPuntosVentas
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,punto_venta_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_punto_venta 	varchar(30),
 nombre_punto     	varchar(50),
 cod_sucursal     	varchar(12),
 estado_accion    	varchar(20),
 usuario_accion   	varchar(50),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
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
 FROM punto_venta p
 WHERE p.nombre_punto like ('%' || punto_venta_busqueda || '%')
 ORDER BY p.cod_punto_venta
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_SavePuntoVenta
Descripcion: Guarda o actualiza un punto de venta
Parametros: necesarios para un punto de venta
Ejecucion: SELECT * FROM  fn_SavePuntoVenta('12ksdjfjd','punto de venta','1222','ACTIVO','NINGUNA','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SavePuntoVenta
(
 _cod_punto_venta 	varchar(30),
 _nombre_punto 		varchar(50),
 _cod_sucursal 		varchar(12),
 _estado_accion 	varchar(20),
 _usuario_accion 	varchar(50),
 _estado      		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_punto_venta 	varchar(30),
 nombre_punto 		varchar(50),
 cod_sucursal 		varchar(12),
 estado_accion 		varchar(20),
 usuario_accion 	varchar(50),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from punto_venta p where p.cod_punto_venta= _cod_punto_venta))THEN
INSERT INTO punto_venta(
	cod_punto_venta,
	nombre_punto,
	cod_sucursal,
	estado_accion,
	usuario_accion,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_punto_venta,
	_nombre_punto,
	_cod_sucursal,
	_estado_accion,
	_usuario_accion,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE punto_venta SET
 cod_punto_venta =_cod_punto_venta,
 nombre_punto = _nombre_punto,
 cod_sucursal = _cod_sucursal,
 estado_accion = _estado_accion,
 usuario_accion = _usuario_accion,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE punto_venta.cod_punto_venta= _cod_punto_venta;
END IF;

 RETURN QUERY
 SELECT *
 FROM punto_venta p
 WHERE p.cod_punto_venta = _cod_punto_venta
 ORDER BY p.cod_punto_venta;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';



 /*
FUNCTION fn_GetDocumentos
Descripcion: Recupera todos los documentos
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetDocumentos(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetDocumentos
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,documento_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_documento        	varchar(5),
 descripcion_doc 	varchar(50),
 tipo_doc       	varchar(10),
 formato_doc    	varchar(75),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
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
 FROM documento d
 WHERE d.descripcion_doc like ('%' || documento_busqueda || '%') or d.cod_documento like ('%' || documento_busqueda || '%')
 ORDER BY d.cod_documento
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_SaveDocumento
Descripcion: Guarda o actualiza un documento
Parametros: necesarios para un documento
Ejecucion: SELECT * FROM  fn_SaveDocumento('12345','documento de prueba','boleta','ninguna','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveDocumento
(
 _cod_documento        	varchar(5),
 _descripcion_doc 	varchar(50),
 _tipo_doc       	varchar(10),
 _formato_doc    	varchar(75),
 _estado      		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_documento        	varchar(5),
 descripcion_doc 	varchar(50),
 tipo_doc       	varchar(10),
 formato_doc    	varchar(75),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from documento d where d.cod_documento= _cod_documento))THEN
INSERT INTO documento(
	cod_documento,
	descripcion_doc,
	tipo_doc,
	formato_doc,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_documento,
	_descripcion_doc,
	_tipo_doc,
	_formato_doc,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE documento SET
 descripcion_doc = _descripcion_doc,
 tipo_doc = _tipo_doc,
 formato_doc = _formato_doc,
 estado = _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE documento.cod_documento= _cod_documento;
END IF;

 RETURN QUERY
 SELECT *
 FROM documento d
 WHERE d.cod_documento = _cod_documento
 ORDER BY d.cod_documento;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';




 /*
FUNCTION fn_GetAlmacenes
Descripcion: Recupera todos los almacenes
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetAlmacenes(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetAlmacenes
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,almacen_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 almacen_id 		INT,
 almacen_cod 		VARCHAR (50),
 descripcion 		VARCHAR (200),
 tipo 			VARCHAR (100),
 estado      		VARCHAR(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	VARCHAR(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	VARCHAR(50)
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
 FROM almacen a
 WHERE a.descripcion like ('%' || almacen_busqueda || '%') or a.almacen_cod like ('%' || almacen_busqueda || '%')
 ORDER BY a.almacen_id
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';



/*
FUNCTION fn_SaveAlmacen
Descripcion: Guarda o actualiza un almacen
Parametros: necesarios para un almacen
Ejecucion: SELECT * FROM  fn_SaveAlmacen(-1,'A000002','NINGUNA','NINGUNA','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveAlmacen
(
 _almacen_id 		INT,
 _almacen_cod 		VARCHAR (50),
 _descripcion 		VARCHAR (200),
 _tipo 			VARCHAR (100),
 _estado      		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 almacen_id 		INT,
 almacen_cod 		VARCHAR (50),
 descripcion 		VARCHAR (200),
 tipo 			VARCHAR (100),
 estado      		VARCHAR(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	VARCHAR(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	VARCHAR(50)
) AS
$BODY$
BEGIN
IF(_almacen_id = -1)THEN
INSERT INTO almacen(
	almacen_cod,
	descripcion,
	tipo,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_almacen_cod,
	_descripcion,
	_tipo,
	_estado,
	now(),
	_usuario);
_almacen_id = (SELECT CURRVAL('almacen_almacen_id_seq'));
ELSE
UPDATE almacen SET
 almacen_cod = _almacen_cod,
 descripcion = _descripcion,
 tipo =  _tipo,
 estado = _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario
WHERE almacen.almacen_id= _almacen_id;

END IF;

 RETURN QUERY
 SELECT *
 FROM almacen a
 WHERE a.almacen_id = _almacen_id
 ORDER BY a.almacen_id;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';



 /*
FUNCTION fn_GetPersonas
Descripcion: Recupera todas las personas
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetPersonas(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetPersonas
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,persona_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_persona          		varchar(12),
 tipo_persona         		varchar(8),
 razon_social         		varchar(120),
 nombres              		varchar(40),
 a_paterno             		varchar(30),
 a_materno             		varchar(30),
 tipo_doc_ident       		varchar(11),
 doc_ident            		varchar(15),
 fecha_nacimiento     		timestamp,
 sexo                 		char(1),
 direccion            		varchar(70),
 tel_fijo             		varchar(10),
 telf_movil            		varchar(10),
 correo               		varchar(38),
 estado      			varchar(20),
 creado_en 			TIMESTAMP,
 usuario_creacion 		varchar(50),
 actualizado_en 		TIMESTAMP,
 usuario_actualizo 		varchar(50)
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
 FROM persona p
 WHERE p.nombres like ('%' || persona_busqueda || '%') or p.a_paterno like ('%' || persona_busqueda || '%') or p.a_materno like ('%' || persona_busqueda || '%') or (p.nombres || p.a_paterno || p.a_materno) like ('%' || persona_busqueda || '%')
 ORDER BY p.cod_persona
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';




/*
FUNCTION fn_SavePersona
Descripcion: Guarda o actualiza una persona
Parametros: necesarios para una persona
Ejecucion: SELECT * FROM  fn_SavePersona('P0001','NATURAL','','OMAR','MUÑIZ','HUAMAN','DNI','29384934','12-12-2018','1','NINGUA',
	'984551995','984551995','omar.muniz@gmail.com','ACTIVO','ADMIN')
*/ 


CREATE OR REPLACE FUNCTION fn_SavePersona
(
 _cod_persona          	varchar(12),
 _tipo_persona         	varchar(8),
 _razon_social         	varchar(120),
 _nombres              	varchar(40),
 _a_paterno             varchar(30),
 _a_materno             varchar(30),
 _tipo_doc_ident       	varchar(11),
 _doc_ident            	varchar(15),
 _fecha_nacimiento     	timestamp,
 _sexo                 	char(1),
 _direccion            	varchar(70),
 _tel_fijo             	varchar(10),
 _telf_movil            varchar(10),
 _correo               	varchar(38),
 _estado      		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_persona          	varchar(12),
 tipo_persona         	varchar(8),
 razon_social         	varchar(120),
 nombres              	varchar(40),
 a_paterno             	varchar(30),
 a_materno             	varchar(30),
 tipo_doc_ident       	varchar(11),
 doc_ident            	varchar(15),
 fecha_nacimiento     	timestamp,
 sexo                 	char(1),
 direccion            	varchar(70),
 tel_fijo             	varchar(10),
 telf_movil            	varchar(10),
 correo               	varchar(38),
 estado      		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from persona p where p.cod_persona = _cod_persona))THEN
INSERT INTO persona(
	cod_persona,
	tipo_persona,
	razon_social,
	nombres,
	a_paterno,
	a_materno,
	tipo_doc_ident,
	doc_ident,
	fecha_nacimiento,
	sexo,
	direccion,
	tel_fijo,
	telf_movil,
	correo,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_persona,
	_tipo_persona,
	_razon_social,
	_nombres,
	_a_paterno,
	_a_materno,
	_tipo_doc_ident,
	_doc_ident,
	_fecha_nacimiento,
	_sexo,
	_direccion,
	_tel_fijo,
	_telf_movil,
	_correo,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE persona SET
 tipo_persona =_tipo_persona,
 razon_social = _razon_social,
 nombres = _nombres,
 a_paterno = _a_paterno,
 a_materno = _a_materno,
 tipo_doc_ident = _tipo_doc_ident,
 doc_ident = _doc_ident,
 fecha_nacimiento = _fecha_nacimiento,
 sexo = _sexo,
 direccion = _direccion,
 tel_fijo = _tel_fijo,
 telf_movil = _telf_movil,
 correo = _correo,
 estado = _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE persona.cod_persona= _cod_persona;
END IF;
 RETURN QUERY
 SELECT *
 FROM persona p
 WHERE p.cod_persona = _cod_persona
 ORDER BY p.cod_persona;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION fn_getRowsUbigeo
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsUbigeo('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsUbigeo(ubigeo_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from ubigeo u WHERE u.departamento like ('%' || ubigeo_busqueda || '%') or u.provincia like ('%' || ubigeo_busqueda || '%') or u.distrito like ('%' || ubigeo_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCTION fn_getRowsAlmacenes
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsAlmacenes('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsAlmacenes(almacen_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from almacen a WHERE a.descripcion like ('%' || almacen_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCTION fn_getRowsDocumentos
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsDocumentos('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsDocumentos(documento_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from documento d WHERE d.descripcion_doc like ('%' || documento_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_getRowsPersonas
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsPersonas('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsPersonas(persona_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from persona p WHERE p.nombres like ('%' || persona_busqueda || '%') or  p.a_paterno like ('%' || persona_busqueda || '%') or p.a_materno like ('%' || persona_busqueda || '%') or (p.nombres || p.a_paterno || p.a_materno) like ('%' || persona_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_getRowsPuntosVentas
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsPuntosVentas('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsPuntosVentas(punto_venta_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from punto_venta p WHERE p.nombre_punto like ('%' || punto_venta_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCTION fn_getRowsSucursales
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsSucursales('') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsSucursales(sucursal_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from sucursal s WHERE s.nombre like ('%' || sucursal_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

/*
FUNCTION fn_DeleteUbigeo
Descripcion: Eliminar ubigeo
Parametros: cod_departamento, cod_provincia_cod_distrito
Ejecucion: SELECT fn_DeleteUbigeo() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteUbigeo(int)
*/
CREATE OR REPLACE FUNCTION fn_DeleteUbigeo(char(2),char(2),char(2))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from ubigeo where cod_departamento = $1 and cod_provincia=$2 and cod_distrito=$3) = 1) THEN
  delete from ubigeo
	where ubigeo.cod_departamento = $1 and ubigeo.cod_provincia = $2 and ubigeo.cod_distrito = $3;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el ubigeo';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeleteSucursal
Descripcion: Eliminar sucursal
Parametros: cod_sucursal
Ejecucion: SELECT fn_DeleteSucursal() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteSucursal(varchar(30))
*/
CREATE OR REPLACE FUNCTION fn_DeleteSucursal(varchar(30))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from sucursal where cod_sucursal = $1) = 1) THEN
  delete from sucursal
	where sucursal.cod_sucursal = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la sucursal';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeletePuntoVenta
Descripcion: Eliminar punto de venta
Parametros: cod_punto_venta
Ejecucion: SELECT fn_DeletePuntoVenta() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeletePuntoVenta(varchar(30))
*/
CREATE OR REPLACE FUNCTION fn_DeletePuntoVenta(varchar(30))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from punto_venta where cod_punto_venta = $1) = 1) THEN
  delete from punto_venta
	where punto_venta.cod_punto_venta = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el punto de venta';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeletePersona
Descripcion: Eliminar persona
Parametros: cod_persona
Ejecucion: SELECT fn_DeletePersona() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeletePersona(varchar(12))
*/
CREATE OR REPLACE FUNCTION fn_DeletePersona(varchar(12))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from persona where cod_persona = $1) = 1) THEN
  delete from persona
	where persona.cod_persona = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el persona';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeleteAlmacen
Descripcion: Eliminar almacen
Parametros: almacen_id
Ejecucion: SELECT fn_DeleteAlmacen(11) "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteAlmacen(int)
*/
CREATE OR REPLACE FUNCTION fn_DeleteAlmacen(int)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from almacen where almacen_id = $1) = 1) THEN
  delete from almacen
	where almacen.almacen_id = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el almacen';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



/*
FUNCTION fn_DeleteDocumento
Descripcion: Eliminar documento
Parametros: cod_documento
Ejecucion: SELECT fn_DeleteDocumento() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteDocumento(varchar(5))
*/
CREATE OR REPLACE FUNCTION fn_DeleteDocumento(varchar(5))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from documento where cod_documento = $1) = 1) THEN
  delete from documento
	where documento.cod_documento = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el documento';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeleteDocumentoSerie
Descripcion: Eliminar documento serie
Parametros: cod_documento, nro_serie, nro_inicio
Ejecucion: SELECT fn_DeleteDocumentoSerie() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteDocumentoSerie(varchar(5),int,int)
*/
CREATE OR REPLACE FUNCTION fn_DeleteDocumentoSerie(varchar(5),int,int)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from documento_serie where cod_documento = $1 and nro_serie = $2 and nro_inicio = $3) = 1) THEN
  delete from documento_serie
	where documento_serie.cod_documento = $1 and nro_serie = $2 and nro_inicio = $3;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la serie del documento';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



 /*
FUNCTION fn_GetSeries
Descripcion: Recupera todos las series de un documento
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetSeries(20,2,-1,'')
*/
 
CREATE OR REPLACE FUNCTION fn_GetSeries
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,serie_busqueda INTEGER = NULL
 ,cod_documento_cod varchar(5) = ''
)
RETURNS TABLE 
( 
 cod_documento        	varchar(5),
 nro_serie 		int,
 nro_inicio       	int,
 cod_sucursal    	varchar(30),
 esta_afecto      	bit(1),
 estado			varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
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
 IF (serie_busqueda IS NOT NULL) THEN 
	 RETURN QUERY
	 SELECT *
	 FROM documento_serie d
	 WHERE d.cod_documento = cod_documento_cod AND  d.nro_serie = serie_busqueda
	 ORDER BY d.cod_documento
	 LIMIT tamano_pagina
	 OFFSET PageNumber;
 ELSE
	RETURN QUERY
	 SELECT *
	 FROM documento_serie d
	 WHERE d.cod_documento = cod_documento_cod
	 ORDER BY d.cod_documento
	 LIMIT tamano_pagina
	 OFFSET PageNumber; 
 END IF; 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION fn_getRowsSeries
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsSeries(NULL,'d0001') AS Filas
*/
CREATE OR REPLACE FUNCTION fn_getRowsSeries(serie_busqueda int =NULL,cod_documento_cod varchar(5)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from documento_serie u WHERE u.cod_documento=cod_documento_cod);
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
 


/*
FUNCTION fn_SaveSerie
Descripcion: Guarda o actualiza una serie
Parametros: necesarios para una serie
Ejecucion: SELECT * FROM  fn_SaveSerie('BV',1,2,'S00001','0','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveSerie
(
 _cod_documento        	varchar(5),
 _nro_serie 		int,
 _nro_inicio       	int,
 _cod_sucursal    	varchar(30),
 _esta_afecto      	bit(1),
 _estado 		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_documento        	varchar(5),
 nro_serie 		int,
 nro_inicio       	int,
 cod_sucursal    	varchar(30),
 esta_afecto      	bit(1),
 estado 		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from documento_serie d where d.cod_documento= _cod_documento and d.nro_serie=_nro_serie and d.cod_sucursal=_cod_sucursal))THEN
INSERT INTO documento_serie(
	cod_documento,
	nro_serie,
	nro_inicio,
	cod_sucursal,
	esta_afecto,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_documento,
	_nro_serie,
	_nro_inicio,
	_cod_sucursal,
	_esta_afecto,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE documento_serie SET
 cod_documento=_cod_documento,
 nro_inicio = _nro_inicio,
 esta_afecto=_esta_afecto,
 estado=_estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE documento_serie.cod_documento= _cod_documento  and documento_serie.nro_serie=_nro_serie and documento_serie.cod_sucursal=_cod_sucursal;
END IF;

 RETURN QUERY
 SELECT *
 FROM documento_serie d
 WHERE d.cod_documento = _cod_documento and d.nro_serie=_nro_serie and d.cod_sucursal=_cod_sucursal
 ORDER BY d.cod_documento;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';




/*
FUNCTION fn_SaveSerie
Descripcion: Guarda o actualiza una serie
Parametros: necesarios para una serie
Ejecucion: SELECT * FROM  fn_SaveSerie('D0001',1,1,'IIIII','0','ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveSerie
(
 _cod_documento        	varchar(5),
 _nro_serie 		int,
 _nro_inicio       	int,
 _cod_sucursal    	varchar(30),
 _esta_afecto      	bit(1),
 _estado 		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_documento        	varchar(5),
 nro_serie 		int,
 nro_inicio       	int,
 cod_sucursal    	varchar(30),
 esta_afecto      	bit(1),
 estado 		varchar(20),
 creado_en 		TIMESTAMP,
 usuario_creacion 	varchar(50),
 actualizado_en 	TIMESTAMP,
 usuario_actualizo 	varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from documento_serie d where d.cod_documento= _cod_documento and d.nro_serie=_nro_serie and d.nro_inicio=_nro_inicio and d.cod_sucursal=_cod_sucursal))THEN
INSERT INTO documento_serie(
	cod_documento,
	nro_serie,
	nro_inicio,
	cod_sucursal,
	esta_afecto,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_documento,
	_nro_serie,
	_nro_inicio,
	_cod_sucursal,
	_esta_afecto,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE documento_serie SET
 cod_documento=_cod_documento,
 nro_serie=_nro_serie,
 nro_inicio=_nro_inicio,
 cod_sucursal=_cod_sucursal,
 esta_afecto=_esta_afecto,
 estado=_estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE documento_serie.cod_documento= _cod_documento;
END IF;

 RETURN QUERY
 SELECT *
 FROM documento_serie d
 WHERE d.cod_documento = _cod_documento
 ORDER BY d.cod_documento;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';

/*
FUNCTION fn_DeleteSerie
Descripcion: Eliminar serie
Ejecucion: SELECT fn_DeleteSerie() "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteSerie('D0001',1,1,'IIIII')
*/
CREATE OR REPLACE FUNCTION fn_DeleteSerie(varchar(5),int,int,varchar(30))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from documento_serie where cod_documento = $1 and nro_serie=$2 and nro_inicio=$3 and cod_sucursal=$4) = 1) THEN
  delete from documento_serie
	where cod_documento = $1 and nro_serie=$2 and nro_inicio=$3 and cod_sucursal=$4;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la serie';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



 
/*
FUNCTION fn_SaveEmpresa
Descripcion: Guarda o actualiza una empresa
Parametros: necesarios para una empresa
Ejecucion: SELECT * FROM  fn_SaveEmpresa('E001','SL','EMPRESA DE TODOS S.A.C','NINGUNA','NINGUNA',NULL,NULL,NULL,NULL,NULL,NULL,'ACTIVO','ADMIN')
*/
CREATE OR REPLACE FUNCTION fn_SaveEmpresa
(
 _cod_empresa     	varchar(30),
 _nombre_corto    	varchar(100),
 _razon_social	   	varchar(256),
 _descripcion 		varchar(256),
 _direccion 		varchar(120),
 _telefono1 		varchar(12),
 _telefono2 		varchar(12),
 _correo 		varchar(100),
 _pagina_web 		varchar(100),
 _url_imagen 		varchar(355),
 _url_imagen_impresion 	varchar(355),
 _estado      		varchar(20),
 _usuario 		varchar(50)
)
RETURNS TABLE 
( 
 cod_empresa     varchar(30),
 nombre_corto    varchar(100),
 razon_social	varchar(256),
 descripcion varchar(256),
 direccion varchar(120),
 telefono1 varchar(12),
 telefono2 varchar(12),
 correo varchar(100),
 pagina_web varchar(100),
 url_imagen varchar(355),
 url_imagen_impresion varchar(355),
 estado      varchar(20),
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
) AS
$BODY$
BEGIN
IF( not exists (select 1 from empresa e where e.cod_empresa= _cod_empresa))THEN
INSERT INTO empresa(
	cod_empresa,
	nombre_corto,
	razon_social,
	descripcion,
	direccion,
	telefono1,
	telefono2,
	correo,
	pagina_web,
	url_imagen,
	url_imagen_impresion,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_cod_empresa,
	_nombre_corto,
	_razon_social,
	_descripcion,
	_direccion,
	_telefono1,
	_telefono2,
	_correo,
	_pagina_web,
	_url_imagen,
	_url_imagen_impresion,
	_estado,
	now(),
	_usuario);

ELSE
UPDATE empresa SET 
 nombre_corto = _nombre_corto,
 razon_social = _razon_social,
 descripcion = _descripcion,
 direccion = _direccion,
 telefono1 = _telefono1,
 telefono2 = _telefono2,
 correo	= _correo,
 pagina_web = _pagina_web,
 url_imagen = _url_imagen,
 url_imagen_impresion = _url_imagen_impresion,
 estado	= _estado,
 actualizado_en = now(),
 usuario_actualizo = _usuario

WHERE empresa.cod_empresa= _cod_empresa;
END IF;

 RETURN QUERY
 SELECT *
 FROM empresa e
 WHERE e.cod_empresa= _cod_empresa
 ORDER BY e.cod_empresa;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_GetEmpresas
Descripcion: Recupera todas las empresas
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetEmpresas(20,1,'')
DROP: DROP FUNCTION fn_GetEmpresas
(
 tamano_pagina INTEGER,numero_pagina INTEGER,empresa_busqueda varchar(50)
)
*/

 
CREATE OR REPLACE FUNCTION fn_GetEmpresas
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,empresa_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
 cod_empresa     varchar(30),
 nombre_corto    varchar(100),
 razon_social	varchar(256),
 descripcion varchar(256),
 direccion varchar(120),
 telefono1 varchar(12),
 telefono2 varchar(12),
 correo varchar(100),
 pagina_web varchar(100),
 url_imagen varchar(355),
 url_imagen_impresion varchar(355),
 estado      varchar(20),
 creado_en TIMESTAMP,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
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
 SELECT  e.cod_empresa,
	 e.nombre_corto,
	 e.razon_social,
	 e.descripcion,
	 e.direccion,
	 e.telefono1,
	 e.telefono2,
	 e.correo,
	 e.pagina_web,
	 e.url_imagen,
	 e.url_imagen_impresion,
	 e.estado,
	 e.creado_en,
	 e.usuario_creacion,
	 e.actualizado_en,
	 e.usuario_actualizo
 FROM empresa e
 WHERE e.nombre_corto like ('%' || empresa_busqueda || '%') or e.razon_social like ('%' || empresa_busqueda || '%')
 ORDER BY e.cod_empresa
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_getRowsEmpresa
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsEmpresa('') AS Filas
DROP: DROP FUNCTION IF EXISTS fn_getRowsEmpresa(varchar(50))
*/
CREATE OR REPLACE FUNCTION fn_getRowsEmpresa(empresa_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from empresa e WHERE e.nombre_corto like ('%' || empresa_busqueda || '%') or e.razon_social like ('%' || empresa_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;


/*
FUNCTION fn_DeleteEmpresa
Descripcion: Eliminar empresa
Parametros: cod_empresa
Ejecucion: SELECT fn_DeleteEmpresa('E001') "RESPUESTA"
DROP: DROP FUNCTION IF EXISTS fn_DeleteEmpresa(varchar(10))
*/
CREATE OR REPLACE FUNCTION fn_DeleteEmpresa(varchar(10))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from empresa where empresa.cod_empresa= $1) = 1) THEN
  delete from empresa
	where empresa.cod_empresa= $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe la empresa';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;






/*
FUNCTION fn_GetSucursales
Descripcion: Recupera todas las sucursales de una empresa
Parametros: - tamano_pagina integer,numero_pagina integer, cod_empresa varchar(30),sucursal_busqueda varchar(50)
Ejecucion: SELECT * FROM  fn_GetSucursales(20,1,'','')
Use DROP FUNCTION fn_getsucursales(integer,integer,character varying,character varying)
*/

CREATE OR REPLACE FUNCTION fn_GetSucursales
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,_cod_empresa varchar(30) = ''
 ,sucursal_busqueda varchar(50)=''
)
RETURNS TABLE 
( 
	cod_sucursal         varchar(30),
	nombre               varchar(100),
	direccion            varchar(120),
	telefono             varchar(12),
	fax                  varchar(12),
	correo               varchar(40),
	tipo_sistema         varchar(10),
	fecha_inicio         TIMESTAMP,
	latitud              numeric(18,2),
	longitud             numeric(18,2),
	departamento         char(4),
	provincia            char(4),
	distrito             char(4),
	estado               varchar(20),
	creado_en 	     TIMESTAMP,
	usuario_creacion     varchar(50),
	actualizado_en       TIMESTAMP,
	usuario_actualizo    varchar(50),
	flagEmpresaSucursal  int
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
 /*RETURN QUERY
 SELECT s.*
 FROM empresa e left join empresasucursal es on e.cod_empresa = es.cod_empresa and es.estado='ACTIVO' left join sucursal s on es.cod_sucursal = s.cod_sucursal 
 WHERE s.nombre like ('%' || sucursal_busqueda || '%') or s.cod_sucursal like ('%' || sucursal_busqueda || '%')
 ORDER BY s.cod_sucursal
 LIMIT tamano_pagina
 OFFSET PageNumber; */

 RETURN QUERY
 SELECT s.*, CASE WHEN es.cod_sucursal IS NULL OR es.estado!='ACTIVO' THEN -1 ELSE 0 END AS flagEmpresaSucursal
 FROM sucursal s left join empresasucursal es on s.cod_sucursal = es.cod_sucursal and es.estado='ACTIVO' left join empresa e on e.cod_empresa = es.cod_empresa 
 WHERE s.nombre like ('%' || sucursal_busqueda || '%') or s.cod_sucursal like ('%' || sucursal_busqueda || '%')
 ORDER BY s.cod_sucursal
 LIMIT tamano_pagina
 OFFSET PageNumber;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$BODY$
LANGUAGE 'plpgsql';


/*
FUNCTION fn_getRowsSucursalesByEmpresa
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT fn_getRowsSucursalesByEmpresa('','') AS Filas
DROP: DROP FUNCTION IF EXISTS fn_getRowsSucursalesByEmpresa(varchar(30),varchar(50))
*/
CREATE OR REPLACE FUNCTION fn_getRowsSucursalesByEmpresa(_cod_empresa varchar(30)='',sucursal_busqueda varchar(50)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from empresa e inner join empresasucursal es on e.cod_empresa = es.cod_empresa and es.estado='ACTIVO' inner join sucursal s on es.cod_sucursal = s.cod_sucursal 
 WHERE s.nombre like ('%' || sucursal_busqueda || '%') or s.cod_sucursal like ('%' || sucursal_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;



/*
FUNCTION fn_SaveEmpresaSucursal
Descripcion: Guarda la relacion empresa sucursal
Parametros: cod_empresa, cod_sucursal
Ejecucion: SELECT fn_SaveEmpresaSucursal('E001','LAST1','ACTIVO','ADMIN') "RESPUESTA"
*/
CREATE OR REPLACE FUNCTION fn_SaveEmpresaSucursal(varchar(30),varchar(30),varchar(20),varchar(50))
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from empresasucursal where empresasucursal.cod_empresa= $1 and empresasucursal.cod_sucursal = $2) = 1) THEN
  INSERT INTO empresasucursal(cod_empresa,cod_sucursal,estado,creado_en,usuario_creacion)
			     VALUES($1,$2,$3,now(),$4);		    
ELSE
  UPDATE empresasucursal SET estado=$3 WHERE empresasucursal.cod_empresa= $1 and empresasucursal.cod_sucursal = $2;
END IF;
 _respuesta='Se relaciono correctamente la sucursal con la empresa';

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;

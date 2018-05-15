/*
FUNCTION fn_GetSucursales
Descripcion: Recupera todas las sucursales
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetSucursales(20,1,'')
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
 departamento         	char(4),
 provincia         		char(4),
 distrito           	char(4),
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
 SELECT *
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
FUNCTION fn_uSucursal
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
Ejecucion: SELECT * FROM  fn_SaveAlmacen(1,'A000001','NINGUNA','NINGUNA','ACTIVO','ADMIN')
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
IF(almacen_id = -1)THEN
INSERT INTO documento(
	almacen_id,
	almacen_cod,
	descripcion,
	tipo,
	estado,
	creado_en,
	usuario_creacion) 
	
VALUES(
	_almacen_id,
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
 WHERE p.nombres like ('%' || persona_busqueda || '%') or p.a_paterno like ('%' || persona_busqueda || '%') or p.a_materno like ('%' || persona_busqueda || '%')
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
 
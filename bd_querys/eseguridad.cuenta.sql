/*
FUNCTION fn_GetCuentas
Descripcion: Recupera todas las cuentas 
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * FROM  fn_GetCuentas(20,1,'')
*/
CREATE OR REPLACE FUNCTION fn_GetCuentas
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
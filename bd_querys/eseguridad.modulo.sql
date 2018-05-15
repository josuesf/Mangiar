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
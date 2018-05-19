/*
FUNCTION eproductos.fn_getRowsProducto
Descripcion: Cantidad de filas que existen en la tabla
Parametros:
Ejecucion: SELECT eproductos.fn_getRowsProducto('') AS Filas
DROP: DROP FUNCTION IF EXISTS eproductos.fn_getRowsProducto(varchar(200))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_getRowsProducto(nombre_busqueda varchar(200)='')
RETURNS bigint AS $$
DECLARE _respuesta bigint;
BEGIN
 RETURN (select count(*) from eproductos.producto p WHERE p.nombre like ('%' || nombre_busqueda || '%'));
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
/*
FUNCTION eproductos.fn_GetProductos
Descripcion: Recupera todos los productos 
Parametros: - tamano_pagina integer,numero_pagina integer
Ejecucion: SELECT * from eproductos.fn_GetProductos(5,1,'')
*/
CREATE OR REPLACE FUNCTION eproductos.fn_GetProductos
(
 tamano_pagina INTEGER = NULL
 ,numero_pagina INTEGER = NULL
 ,nombre_busqueda varchar(50)=''
)
RETURNS TABLE 
(
 producto_id int,
 cod_producto varchar(30),
 cod_categoria varchar(50),
 nombre_categoria  varchar(100),
 cod_marca varchar(120),
 nombre varchar(200),
 alias varchar(100),
 imagen_url varchar(110),
 estado      varchar(20)
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
 SELECT p.producto_id,p.cod_producto,p.cod_categoria,c.nombre_categoria,
	p.cod_marca,p.nombre,p.alias,p.imagen_url,p.estado
 FROM eproductos.producto p inner join eproductos.categoria c on p.cod_categoria = c.cod_categoria
 WHERE p.nombre like ('%' || nombre_busqueda || '%')
 ORDER BY cod_categoria
 LIMIT tamano_pagina
 OFFSET PageNumber; 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
 /*
FUNCTION eproductos.fn_SaveProducto
Descripcion: Guarda o aactualiza un producto
Parametros: necesarios para un producto
Fecha:17052018
Ejecucion: SELECT * FROM  eproductos.fn_SaveProducto(-1,'PR001','COM','','COMIDA 1','COM','','ACTIVO','ADMIN')
DROP: DROP FUNCTION eproductos.fn_SaveProducto(int,varchar(30),varchar(50),varchar(120),varchar(200),varchar(100),varchar(110),varchar(20),varchar(50))
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveProducto
(
 pproducto_id int,
 pcod_producto varchar(30),
 pcod_categoria varchar(50),
 pcod_marca varchar(120),
 pnombre varchar(200),
 palias varchar(100),
 pimagen_url varchar(110),
 pestado      varchar(20),
 pusuario_registro varchar(50)
)
RETURNS TABLE 
( 
 _producto_id int,
 _cod_producto varchar(30),
 _cod_categoria varchar(50),
 _cod_marca varchar(120),
 _nombre varchar(200),
 _alias varchar(100),
 _imagen_url varchar(110),
 _estado      varchar(20)
) AS
$$
BEGIN
IF( pproducto_id = -1) THEN
INSERT INTO eproductos.producto(
	cod_producto,
	cod_categoria,
	cod_marca,
	nombre,
	alias,
	imagen_url,
	estado,
	creado_en,
	usuario_creacion,
	actualizado_en,
	usuario_actualizo) 
VALUES(
	pcod_producto,
	pcod_categoria,
	pcod_marca,
	pnombre,
	palias,
	pimagen_url,
	pestado,
	now(),
	pusuario_registro,
	null,
	null);

pproducto_id = (SELECT CURRVAL('eproductos.producto_producto_id_seq'));
ELSE
UPDATE eproductos.producto as p SET
 p.cod_producto = pcod_producto,
 p.cod_categoria = pcod_categoria,
 p.cod_marca = pcod_marca,
 p.nombre = pnombre,
 p.alias = palias,
 p.imagen_url = pimagen_url,
 estado = pestado ,
 actualizado_en = now(),
 usuario_actualizo = pusuario_registro
WHERE p.producto_id = pproducto_id;
END IF;

 RETURN QUERY
 SELECT p.producto_id,p.cod_producto,p.cod_categoria,
	p.cod_marca,p.nombre,p.alias,p.imagen_url,p.estado
 FROM eproductos.producto p
 WHERE p.producto_id = pproducto_id;
 
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$
LANGUAGE 'plpgsql';

/*
FUNCTION eproductos.fn_DeleteProducto
Descripcion: Eliminar producto
Parametros: producto_id
Ejecucion: SELECT eproductos.fn_DeleteProducto(1) "respuesta"
DROP: DROP FUNCTION IF EXISTS eproductos.fn_DeleteProducto(int)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_DeleteProducto(int)
RETURNS varchar(100) AS $$
DECLARE _respuesta varchar(100);
BEGIN
IF((select count(*) from eproductos.producto where producto_id= $1) = 1) THEN
  delete from eproductos.producto
	where eproductos.producto.producto_id = $1;
	_respuesta='Se elimino correctamente';
ELSE
  _respuesta='No existe el producto';
END IF;

 RETURN _respuesta;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
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
DROP: DROP FUNCTION eproductos.fn_GetProductos
(
 tamano_pagina INTEGER
 ,numero_pagina INTEGER
 ,nombre_busqueda varchar(50)
)
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
 descripcion varchar(1024),
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
	p.cod_marca,p.nombre,p.alias,p.descripcion,p.imagen_url,p.estado
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
Ejecucion: SELECT * FROM  eproductos.fn_SaveProducto(2,'PR001','COM','','COMIDA 1','COM','','ACTIVO','ADMIN')
DROP: DROP FUNCTION eproductos.fn_SaveProducto
(
 pproducto_id int,
 pcod_producto varchar(30),
 pcod_categoria varchar(50),
 pcod_marca varchar(120),
 palmacen_cod varchar(50),
 pnombre varchar(200),
 palias varchar(100),
 pdescripcion varchar(1024),
 pimagen_url varchar(110),
 pestado      varchar(20),
 pusuario_registro varchar(50)
)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SaveProducto
(
 pproducto_id int,
 pcod_producto varchar(30),
 pcod_categoria varchar(50),
 pcod_marca varchar(120),
 palmacen_cod varchar(50),
 pnombre varchar(200),
 palias varchar(100),
 pdescripcion varchar(1024),
 pimagen_url varchar(110),
 pestado      varchar(20),
 pusuario_registro varchar(50)
)
RETURNS TABLE 
( 
 producto_id int,
 cod_producto varchar(30),
 cod_categoria varchar(50),
 cod_marca varchar(120),
 nombre varchar(200),
 alias varchar(100),
 imagen_url varchar(110),
 estado      varchar(20)
) AS
$$
BEGIN
IF( pproducto_id = -1) THEN
INSERT INTO eproductos.producto(
	cod_producto,
	cod_categoria,
	cod_marca,
	almacen_cod,
	nombre,
	alias,
	descripcion,
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
	palmacen_cod,
	pnombre,
	palias,
	pdescripcion,
	pimagen_url,
	pestado,
	now(),
	pusuario_registro,
	null,
	null);

pproducto_id = (SELECT CURRVAL('eproductos.producto_producto_id_seq'));
ELSE
UPDATE eproductos.producto SET
 cod_producto=pcod_producto,
 cod_categoria=pcod_categoria,
 cod_marca=pcod_marca,
 almacen_cod=palmacen_cod,
 nombre=pnombre,
 alias=palias,
 descripcion=pdescripcion,
 imagen_url=pimagen_url,
 estado=pestado ,
 actualizado_en=now(),
 usuario_actualizo=pusuario_registro
WHERE eproductos.producto.producto_id=pproducto_id;
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
Ejecucion: SELECT eproductos.fn_DeleteProducto(2) "respuesta"
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
/*
FUNCTION eproductos.fn_SavePrecioProducto
Descripcion: Guardar precio producto
Parametros: producto_id,cod_unidad,cod_precio,nombre_precio,cod_moneda,valor_precio,usuario
Ejecucion: SELECT eproductos.fn_SavePrecioProducto(2,'NIU','NORMAL','NORMAL','PEN',20,'ADMIN') "respuesta"
DROP: DROP FUNCTION IF EXISTS eproductos.fn_SavePrecioProducto(int)
*/
CREATE OR REPLACE FUNCTION eproductos.fn_SavePrecioProducto(
pproducto_id int,
pcod_unidad varchar(10),
pcod_precio varchar(30),
pnombre_precio varchar(100),
pcod_moneda varchar(10),
pvalor_precio numeric(38,6),
pusuario_registro varchar(50)
)
RETURNS smallint AS $$
BEGIN
IF((select count(*) from eproductos.precios_producto where producto_id= pproducto_id and cod_precio=pcod_precio) = 1) THEN
  update eproductos.precios_producto SET
  nombre_precio=pnombre_precio,
  cod_moneda=pcod_moneda,
  valor_precio=pvalor_precio,
  actualizado_en = now(),
  usuario_actualizo = pusuario_registro
  where producto_id= pproducto_id and cod_precio=pcod_precio;
ELSE
  insert into eproductos.precios_producto(
	producto_id,
	cod_unidad,
	cod_precio,
	nombre_precio,
	cod_moneda,
	valor_precio,
	creado_en,
	usuario_creacion)
	values(
	pproducto_id,
	pcod_unidad,
	pcod_precio,
	pnombre_precio,
	pcod_moneda,
	pvalor_precio,
	now(),
	pusuario_registro
	);
END IF;

 RETURN 1;
 EXCEPTION WHEN OTHERS THEN 
 RAISE;
END;
$$ LANGUAGE plpgsql;
CREATE SCHEMA eproductos;
CREATE TABLE eproductos.producto --Josue
( 
 producto_id serial NOT NULL,
 cod_producto varchar(30) UNIQUE NULL,
 cod_categoria varchar(50) NOT NULL ,
 cod_marca varchar(120)  NULL ,
 nombre varchar(200) NOT NULL ,
 alias varchar(100)  NULL,
 imagen_url varchar(110)  NULL ,
 porcentaje_utilidad numeric(5,2) NULL,
 cuenta_contable varchar(20),
 contra_cuenta varchar(20),
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY(producto_id)
);
CREATE TABLE eproductos.partes_producto --Josue
( 
producto_id INT NOT NULL,
cod_unidad varchar(10) NULL,
nombre_unidad varchar(100) NULL,
cantidad_uni numeric(6,2) NULL,
costo_cantidad numeric(6,2) NULL,
url_icono            varchar(70)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
PRIMARY KEY(producto_id,cod_unidad),
FOREIGN KEY(producto_id) REFERENCES eproductos.producto(producto_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE eproductos.precios_producto --Josue
( 
producto_id INT NOT NULL,
cod_unidad varchar(10),
cod_precio varchar(30),
nombre_precio varchar(100),
cod_moneda varchar(10),
valor_precio numeric(38,6),
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
PRIMARY KEY (producto_id,cod_unidad,cod_precio),
FOREIGN KEY(producto_id) REFERENCES eproductos.producto(producto_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE eproductos.stock_producto( --Josue
producto_id INT NOT NULL,
cod_unidad varchar(10),
cod_almacen varchar(30),
cod_moneda varchar(10),
stock_min numeric(38,6),
stock_max numeric(38,6),
stock numeric(38,6),
cod_unidad_min varchar(10),
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
PRIMARY KEY (producto_id,cod_unidad,cod_almacen),
FOREIGN KEY(producto_id) REFERENCES eproductos.producto(producto_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE eproductos.combinacion
( --Josue
 combinacion_id serial,
 etiqueta_titulo varchar(100),
 cantidad_minima int,
 cantidad_maxima int,
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY (combinacion_id)
);
CREATE TABLE eproductos.combinacion_detalle( --Josue
 combinacion_id int not null,
 producto_id int NULL,
 nombre_producto varchar(200),
 cod_moneda varchar(10),
 precio numeric(38,6),
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY (producto_id,combinacion_id),
 FOREIGN KEY(combinacion_id) REFERENCES eproductos.combinacion(combinacion_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE eproductos.combinaciones_producto
( --Josue
 combinacion_id int not null,
 producto_id int NULL,
 etiqueta_titulo varchar(100),
 cantidad_minima int,
 cantidad_maxima int,
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY (combinacion_id,producto_id),
 FOREIGN KEY(combinacion_id) REFERENCES eproductos.combinacion(combinacion_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION,
 FOREIGN KEY(producto_id) REFERENCES eproductos.producto(producto_id)
	ON UPDATE NO ACTION ON DELETE NO ACTION
);
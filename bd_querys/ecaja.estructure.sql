--Esquema de Cajas
CREATE SCHEMA ecaja;
CREATE TABLE ecaja.caja --Josue
( 
cod_caja             varchar(10)  NOT NULL ,
cod_sucursal          varchar(30)  NOT NULL ,
nombre_caja          varchar(30)  NULL ,
clave                varchar(128)  NULL ,
observacion          varchar(150)  NULL ,
nombre_ip            varchar(18)  NULL ,
estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY (cod_caja ,cod_sucursal ),
 FOREIGN KEY (cod_sucursal) REFERENCES sucursal(cod_sucursal)
);
CREATE TABLE ecaja.moneda --Josue
( 
cod_moneda           varchar(4)  NOT NULL ,
nombre_moneda        varchar(80)  NULL ,
nro_codigo           char(3)  NULL ,
paises               text  NULL ,
pips                 numeric(18,4) ,
und                  varchar(12)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_moneda)
);
CREATE TABLE ecaja.moneda_denominacion --Josue
( 
cod_moneda           varchar(4)  NOT NULL ,
id_denominacion      integer  NOT NULL ,
denominacion         varchar(25)  NULL ,
valor_moneda        numeric(9,4) ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_moneda,id_denominacion),
 FOREIGN KEY (cod_moneda) REFERENCES ecaja.moneda(cod_moneda)
);

--Creacion de tablas para proceso de ventas
CREATE TABLE ecaja.pedido --Josue
( 
pedido_id serial PRIMARY KEY not null,
cod_documento varchar(5) not null, --EJEM: COM de comanda
nro_serie int not null,
cod_sucursal varchar(30),
numero int not null,-- este se obtiene mediante un select count(*) +1 where cod_documento,nro_serie
cod_persona varchar(12) null,
nombre_cliente varchar(200) null,
glosa varchar(100) null,-- EJEM: COMANDA, BOLETA DE VENTa..
metodo_pago varchar(50) default 'EFECTIVO',
metodo_entrega varchar(50) default 'PRESENCIAL',
cod_moneda varchar(4) default 'PEN',
tipo_cambio numeric(9,4) default 1,
total numeric(18,4),
descuento numeric(18,4) null,
estado_pedido varchar(25), -- 'PENDIENTE','REALIZADO','ANULADO'
esta_impreso boolean,
observacion_pedido varchar(256),--'Observacions con el pedido...'
observacion_estado varchar(256),--'Observaciones si el pedido fue anulado'
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 FOREIGN KEY (cod_documento,cod_sucursal,nro_serie) REFERENCES documento_serie(cod_documento,cod_sucursal,nro_serie)
);
CREATE TABLE ecaja.pedido_detalle
(
pedido_id int,
id_detalle int,
producto_id int,
id_referencia int,
almacen_cod varchar(50), --cod_almacen al que pertenece el producto
cantidad int,
cod_unidad varchar(10),
descripcion_detalle varchar(256),
cod_punto_venta varchar(30), --EJEM: Mesa1
aplica_impuesto boolean default false,
observacion_detalle varchar(256) null,
estado_detalle      varchar(25), --'PENDIENTE','CONFIRMADO','LISTO'
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
PRIMARY KEY(pedido_id,id_detalle),
FOREIGN KEY(pedido_id) REFERENCES ecaja.pedido(pedido_id)
);
CREATE TABLE ecaja.comprobante
(
comp_cod_documento varchar(5) not null, --EJEm BV,FV,..
comp_nro_serie int not null,--Serie 2
comp_numero int not null,-- select count(*) +1 where cod_documento,nro_serie
comp_cod_sucursal varchar(30),
pedido_id int not null,-- pedido_id de los pedidos
cod_persona varchar(12), 
nombre_cliente varchar(200),
direccion_cliente varchar(256),
comp_concepto varchar(100),
comp_total numeric(18,4),
comp_impuesto numeric(18,4),
comp_estado varchar(25),--'EMITIDO','ANULADO'
comp_obs varchar(256),
fecha_emision TIMESTAMP,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
primary key(comp_cod_documento,comp_nro_serie,comp_numero,comp_cod_sucursal),
foreign key(comp_cod_documento,comp_nro_serie,comp_cod_sucursal) references documento_serie(cod_documento,nro_serie,cod_sucursal),
foreign key(pedido_id) references ecaja.pedido(pedido_id),
foreign key(cod_persona) references persona(cod_persona)
)
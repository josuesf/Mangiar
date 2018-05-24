-- Esquema Publico
CREATE TABLE conf_sistema(
nombre_variable varchar(40) NOT NULL,
valor_variable varchar(30) NULL,
obs_variable varchar(140) NULL
);
CREATE TABLE sucursal--Omar
( 
cod_sucursal         varchar(30)  NOT NULL ,
nombre               varchar(100)  NULL ,
direccion            varchar(120)  NULL ,
telefono             varchar(12)  NULL ,
fax                  varchar(12)  NULL ,
correo               varchar(40)  NULL ,
tipo_sistema         varchar(10)  NULL ,
fecha_inicio         TIMESTAMP  NULL ,
latitud              numeric(18,2)  NULL ,
longitud             numeric(18,2)  NULL ,
departamento         char(4)  NULL ,
provincia         char(4)  NULL ,
distrito           char(4)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_sucursal)
);
CREATE TABLE persona --Omar
( 
cod_persona          varchar(12)  NOT NULL ,
tipo_persona         varchar(8)  NULL ,
razon_social         varchar(120)  NULL ,
nombres              varchar(40)  NULL ,
a_paterno             varchar(30)  NULL ,
a_materno             varchar(30)  NULL ,
tipo_doc_ident       varchar(11)  NULL ,
doc_ident            varchar(15)  NULL ,
fecha_nacimiento     timestamp  NULL ,
sexo                 char(1)  NULL ,
direccion            varchar(70)  NULL ,
tel_fijo             varchar(10)  NULL ,
telf_movil            varchar(10)  NULL ,
correo               varchar(38)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_persona)
);
CREATE TABLE almacen( --Omar
 almacen_id serial PRIMARY KEY,
 almacen_cod VARCHAR (50) UNIQUE NOT NULL,
 descripcion VARCHAR (200) NOT NULL,
 tipo VARCHAR (100) NOT NULL,
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)
);
CREATE TABLE documento --Omar
( 
cod_documento        varchar(5)  NOT NULL ,
descripcion_doc varchar(50)  NULL ,
tipo_doc       varchar(10)  NULL ,
formato_doc    varchar(75)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_documento)
);
CREATE TABLE documento_serie --Omar
( 
cod_documento        varchar(5)  NOT NULL ,
nro_serie            int  NOT NULL ,
nro_inicio           int  NULL ,
cod_sucursal          varchar(30)  NULL ,
esta_afecto          bit  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
 PRIMARY KEY (cod_documento,cod_sucursal,Nro_Serie),
 FOREIGN KEY (cod_documento) REFERENCES documento(cod_documento),
FOREIGN KEY (cod_sucursal) REFERENCES sucursal(cod_sucursal)
);
CREATE TABLE punto_venta
( --Omar
cod_punto_venta varchar(10) primary key,
nombre_punto varchar(50),
cod_sucursal varchar(12),
estado_accion varchar(20),
usuario_accion varchar(50) NULL,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50),
FOREIGN KEY (cod_sucursal) REFERENCES sucursal(cod_sucursal)
);
CREATE TABLE ubigeo --Omar
( 
cod_departamento       char(4)  NOT NULL ,
cod_provincia      char(4)  NOT NULL ,
cod_distrito        char(4)  NOT NULL ,
departamento varchar(14)  NULL ,
provincia          varchar(30)  NULL ,
distrito            varchar(30)  NULL ,
 PRIMARY KEY (cod_departamento,cod_provincia,cod_distrito)
);
-- Esquema de Seguridad
CREATE SCHEMA eseguridad;
CREATE TABLE eseguridad.modulo --Josue
( 
 cod_modulo          varchar(30)  NOT NULL PRIMARY KEY,
 nombre               varchar(50) not NULL ,
 descripcion          varchar(70)  NULL ,
 nivel                smallint  NULL ,
 ruta_modulo          varchar(110)  NULL ,
 tipo_modulo          varchar(20)  NULL ,
 imagen_url           varchar(110)  NULL ,
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50)	
);
CREATE TABLE eseguridad.perfil --Josue
( 
cod_perfil           varchar(30)  NOT NULL PRIMARY KEY ,
nombre               varchar(30)  NULL ,
descripcion          varchar(70)  NULL ,
url_icono            varchar(70)  NULL ,
estado      varchar(20) default 'ACTIVO',
creado_en TIMESTAMP NOT NULL,
usuario_creacion varchar(50),
actualizado_en TIMESTAMP,
usuario_actualizo varchar(50)
);
CREATE TABLE eseguridad.perfil_modulo --Josue
( 
cod_modulo  varchar(30)  NOT NULL ,
cod_perfil  varchar(30)  NOT NULL ,
nivel_acceso         smallint  NULL ,
estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 PRIMARY KEY (cod_modulo,cod_perfil),
 FOREIGN KEY (cod_modulo) REFERENCES eseguridad.modulo(cod_modulo)
	ON UPDATE NO ACTION ON DELETE NO ACTION,
 FOREIGN KEY (cod_perfil) REFERENCES eseguridad.perfil(cod_perfil)
	ON DELETE NO ACTION
);
CREATE TABLE eseguridad.cuenta( --Josue
 usuario_id serial PRIMARY KEY,
 usuario VARCHAR (50) UNIQUE NOT NULL,
 contrasena VARCHAR (50) NOT NULL,
 email VARCHAR (355) UNIQUE NOT NULL,
 telefono varchar(20),
 foto_url VARCHAR (355),
 cod_perfil varchar(30),
 cod_sucursal varchar(30),
 estado      varchar(20) default 'ACTIVO',
 creado_en TIMESTAMP NOT NULL,
 usuario_creacion varchar(50),
 actualizado_en TIMESTAMP,
 usuario_actualizo varchar(50),
 ultimo_ingreso TIMESTAMP,
 FOREIGN KEY (cod_perfil) REFERENCES eseguridad.perfil(cod_perfil)
	ON DELETE NO ACTION
);
--Insercion de account default
INSERT INTO eseguridad.cuenta(
usuario,contrasena,email,telefono,
foto_url,cod_perfil,cod_sucursal,estado,
creado_en,usuario_creacion,actualizado_en,usuario_actualizo,ultimo_ingreso) 
values('ADMIN','708f0ce9e8d98c9a0722d50287d6397c','josuesf94@gmail.com','962215459',null,null,null,'ACTIVO',now(),null,null,null,null);

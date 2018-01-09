-- Create table
create table TUSER
(
  pkid               NUMBER(10) not null,
  user_id            VARCHAR2(20),
  user_name          VARCHAR2(20),
  password           VARCHAR2(50),
  realm_id           VARCHAR2(50),
  status             NUMBER(10) default 10,
  valid_start        DATE,
  valid_end          DATE,
  valid              CHAR(1) default 'T',
  added_by           NUMBER(10),
  added_name         VARCHAR2(50),
  added_time         TIMESTAMP(6),
  last_modified_by   NUMBER(10),
  last_modified_name VARCHAR2(50),
  last_modified_time TIMESTAMP(6),
  last_modified_ip   VARCHAR2(20)
);
-- Add comments to the table 
comment on table TUSER
  is '用户表';
-- Add comments to the columns 
comment on column TUSER.pkid
  is 'pkid';
comment on column TUSER.user_id
  is '用户id';
comment on column TUSER.user_name
  is '用户名称';
comment on column TUSER.password
  is '密码';
comment on column TUSER.realm_id
  is '域名id';
comment on column TUSER.status
  is '状态(10:启用;20停用)';
comment on column TUSER.valid_start
  is '有效期起';
comment on column TUSER.valid_end
  is '有效期止';
comment on column TUSER.valid
  is '是否有效';
comment on column TUSER.added_by
  is '新增者';
comment on column TUSER.added_name
  is '新增者名称';
comment on column TUSER.added_time
  is '新增时间';
comment on column TUSER.last_modified_by
  is '最后修改者';
comment on column TUSER.last_modified_name
  is '最后修改者名称';
comment on column TUSER.last_modified_time
  is '最后修改时间';
comment on column TUSER.last_modified_ip
  is '最后修改IP';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TUSER
  add constraint PK_TUSER primary key (PKID)
 ;

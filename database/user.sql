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
  is '�û���';
-- Add comments to the columns 
comment on column TUSER.pkid
  is 'pkid';
comment on column TUSER.user_id
  is '�û�id';
comment on column TUSER.user_name
  is '�û�����';
comment on column TUSER.password
  is '����';
comment on column TUSER.realm_id
  is '����id';
comment on column TUSER.status
  is '״̬(10:����;20ͣ��)';
comment on column TUSER.valid_start
  is '��Ч����';
comment on column TUSER.valid_end
  is '��Ч��ֹ';
comment on column TUSER.valid
  is '�Ƿ���Ч';
comment on column TUSER.added_by
  is '������';
comment on column TUSER.added_name
  is '����������';
comment on column TUSER.added_time
  is '����ʱ��';
comment on column TUSER.last_modified_by
  is '����޸���';
comment on column TUSER.last_modified_name
  is '����޸�������';
comment on column TUSER.last_modified_time
  is '����޸�ʱ��';
comment on column TUSER.last_modified_ip
  is '����޸�IP';
-- Create/Recreate primary, unique and foreign key constraints 
alter table TUSER
  add constraint PK_TUSER primary key (PKID)
 ;

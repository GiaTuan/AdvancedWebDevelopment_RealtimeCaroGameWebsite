PGDMP         6                x            WebDB    12.0    12.0                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    123156    WebDB    DATABASE     �   CREATE DATABASE "WebDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "WebDB";
                postgres    false            �            1259    123159    Accounts    TABLE     �   CREATE TABLE public."Accounts" (
    id integer NOT NULL,
    username text,
    password text,
    email text,
    name text,
    phone text,
    isadmin boolean
);
    DROP TABLE public."Accounts";
       public         heap    postgres    false            �            1259    123157    Account_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Account_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Account_id_seq";
       public          postgres    false    203            	           0    0    Account_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public."Account_id_seq" OWNED BY public."Accounts".id;
          public          postgres    false    202            �
           2604    123162    Accounts id    DEFAULT     m   ALTER TABLE ONLY public."Accounts" ALTER COLUMN id SET DEFAULT nextval('public."Account_id_seq"'::regclass);
 <   ALTER TABLE public."Accounts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203                      0    123159    Accounts 
   TABLE DATA           Y   COPY public."Accounts" (id, username, password, email, name, phone, isadmin) FROM stdin;
    public          postgres    false    203   �
       
           0    0    Account_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Account_id_seq"', 4, true);
          public          postgres    false    202            �
           2606    123167    Accounts Account_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Accounts"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);
 C   ALTER TABLE ONLY public."Accounts" DROP CONSTRAINT "Account_pkey";
       public            postgres    false    203               �   x�=��r�0 @�u�����e�A�-2݀Ey����u�ػ�˃ #���d4F8����*�`e�K�>}c�6�1��O���z���zk�_:P�
�ܷo�*����U(k���(Hy�赮хȘn��3$*�	;�y	CX}�*x{ۏ�_mbAs~i���ώ��c����4O�A�7��9����c�\��τ��#���̈��4#+�N�p#n6�+�١c�1+�Eu��f�����dx!�PQ�_�0U�     
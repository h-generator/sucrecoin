###################################################################

Cripto ________ Boliviana

Descripción

- No será un fork de otra que estan en mercado
- Mantener el proyecto con alguna comunidad de desarrolladores de aca en bolivia
- No se hará una venta inicial
- La infraestructura será compuesta de una network, exchange y miners.
La relación de una network y los exchange sera de uno a muchos, la relación de un exchange y los mineros sera uno a muchos
- La maxima cantidad de exchange sera de 240 el resto sera considerado como slaves, mantener una network mas grande sera contraproducente
- Las network es una entidad intangible que permitirá conectarse entre los exchanges pasando información entre ellas su función es la orquestación de la generación de bloques, la propagación y validación de las transacciones
- los exchanges tiene la función de mantener el blockchain y el manejo de las nuevas transacciones y la orquestación de los miners
- La comunicación entre exchanges que seria la network sera usando un protocolo de (IOT) internet de las cosas, en cambio en la comunicación del exchange y los miner sera usando el protocolo TCP
- cada exchanges deberia mostrar las transacciones que esta realizando y los miembros de la network

- La generacion de bloques sera de al menos 5 minutos
- Cada transacción de un nuevo bloque sera validado por el resto de los exchanges después de recibirlo
- No se podra usar las transacciones de al menos los últimos 6 bloques
- En caso de empate los bloques tendrán que competir en la network
- Un usuario debería poder elegir al exchanges de preferencia
- Las comisiones de transacción sera menor al 1%
- El valor de las comisiones podrán ser de 0 por si alguna institución, o persona quiera tener un exchange propio para sus empleados o amigos.
- Una transacción tendra 3 estados teoricos, 1 cuando se registre en su exchange, 2 cuando sera parte de un bloque valido, 3 cuando el blockchain tenga al menos 6 nuevos bloques a partir de este.

- La billetera se publicara como una github page por la facilidad de distribución y el extra de seguridad que proporciona con el certificado
- La billetera puede escojer que exchange para usar
- Los exchanges en ningún momento deberan pedir una clave privada de una billetera
- Todos los datos del usuario se mantendra en el equipo desde donde se realize una transacción
- Las transacciones aparte de la información del emisor y receptor podrán guardar un mensage 10 caracteres para una posible integración con otros sistemas o solo se usado como una descripción

###################################################################
1
###################################################################

Se implementó un servidor tcp para que los nodos de minería no afecte al proceso principal de generación de los bloques añadí una capa de seguridad ahí y toda comunicación entre los nodos y el server será encriptada.

Para el UI quería usar VUE el proyecto quiero que sea lo mas sencillo posible, el hecho de tener una building machine para poder generar el build hace que se pierda transparencia pero creo que react funcionara mejor en seguridad.

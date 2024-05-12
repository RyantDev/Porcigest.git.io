<%-- 
    Document   : ModificarLote
    Created on : 10/10/2023, 6:37:15 p. m.
    Author     : Usuario
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <jsp:useBean id="objetoRegistrar" class="Modelo.Registro_lote" />
        <jsp:setProperty name="objetoRegistrar" property="*" /> 

        <%
            boolean Estado = objetoRegistrar.ValidarInicio();
            if (Estado) {
                objetoRegistrar.UpdateLote();
                response.sendRedirect("../Listados/Tabla_Lote.jsp");
            }

        %>

        <link rel="stylesheet" href="../Listados/Tabla_usuario.jsp"/>
    </body>
    <script src="../javascript/FiltradoListados.js" type="text/javascript"></script>
</html>

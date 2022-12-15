import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function ApiDoc() {
  return <SwaggerUI url="/swagger.json" />;
}

export default ApiDoc;

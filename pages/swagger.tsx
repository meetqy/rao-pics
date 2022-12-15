import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function ApiDoc() {
  return <SwaggerUI url="/api/swagger" />;
}

export default ApiDoc;

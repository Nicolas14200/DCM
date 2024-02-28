import { Application } from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import * as swaggerUi from 'swagger-ui-express';

export function configureDocumentation(app: Application) {
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });
  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    {
      routePrefix: ''
    },
    {
      routePrefix: '',
      components: { schemas } as any,
      info: {
        title: 'DCM Api documentation',
        version: '1.0.0',
      },
    },
  );
  
  app.use('/DCM/docs', swaggerUi.serve);
  app.get('/DCM/docs', swaggerUi.setup(spec));
}

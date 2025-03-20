import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import { Application } from "express";
import path from "path";

// Function to load YAML files safely
const loadYamlFile = (filePath: string) => {
  const absolutePath = path.resolve(__dirname, "..", "swagger", filePath);
  console.log("📄 Loading YAML file:", absolutePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`🚨 YAML file not found: ${absolutePath}`);
  }

  const fileContent = yaml.load(fs.readFileSync(absolutePath, "utf8"));
  if (typeof fileContent !== "object" || fileContent === null) {
    throw new Error(`❌ Invalid YAML content in file: ${filePath}`);
  }
  return fileContent;
};

// Manually combine YAML files
const swaggerDocument = {
  openapi: "3.0.0",
  info: (loadYamlFile("swagger.yml") as { info: any }).info,
  servers: (loadYamlFile("swagger.yml") as { servers: any }).servers,
  tags: (loadYamlFile("tags.yml") as { tags: any }).tags,
  paths: {
    ...(loadYamlFile("paths/romannumeral.yml") as any),
    ...(loadYamlFile("paths/health.yml") as any),
  },
  components: (loadYamlFile("components/schemas.yml") as { components: any })
    .components,
};

export const setupSwagger = (app: Application): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

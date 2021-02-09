#!/usr/bin/env bash
# FORMATTED WITH SHFMT (https://github.com/mvdan/sh) UTIL

PROJECT_PATH=${PWD}
SRC_PATH="${PROJECT_PATH}/src"
SCHEMA_PATH="${SRC_PATH}/schema/openapi.json"
TEMP_DIR_PATH="$PROJECT_PATH/.openapi-generator-temp"
GENERATED_DIR_PATH="${SRC_PATH}/types/generated"
MODEL_DIR_NAME="model"
GENERATOR_NAME="typescript-axios"

echo "👷 ‍Generating types"

echo "⚙️ Settings:"
echo "\tSCHEMA_PATH: ${SCHEMA_PATH}"
echo "\tTEMP_DIR_PATH: ${TEMP_DIR_PATH}"
echo "\tGENERATED_DIR_PATH: ${GENERATED_DIR_PATH}"
echo "\tMODEL_DIR_NAME: ${MODEL_DIR_NAME}"

npx @openapitools/openapi-generator-cli generate --skip-validate-spec \
  -t "${PROJECT_PATH}/.openapi-generator/templates/${GENERATOR_NAME}" \
  -i "${SCHEMA_PATH}" \
  -o "${TEMP_DIR_PATH}" \
  -g "${GENERATOR_NAME}" \
  -c "${PROJECT_PATH}/openapi-generator.json"

rm -rf "${GENERATED_DIR_PATH:?}/*"

cp -r "${TEMP_DIR_PATH}/${MODEL_DIR_NAME}/" $GENERATED_DIR_PATH

npx prettier "${GENERATED_DIR_PATH}/*" --write

rm -rf $TEMP_DIR_PATH

echo "🎉 Types were generated successfully"

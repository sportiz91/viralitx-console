import { isObject, isStream, isNull, isUndefined } from "@/utils/booleans";
import FormData from "form-data";

type BinaryData = Buffer | NodeJS.ReadableStream;
type FormDataValue = string | number | boolean | BinaryData;
type FormDataEntry = [string, unknown];

/**
 * Recursively search an object for a Buffer or Stream.
 *
 * @param {*} value - The object to search.
 * @return {Boolean} Found any binary data
 */
const containsBinaryData = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(containsBinaryData);
  }

  if (isObject(value) && !(isStream(value) || Buffer.isBuffer(value))) {
    return Object.keys(value as Record<string, unknown>).some((key) =>
      containsBinaryData((value as Record<string, unknown>)[key])
    );
  }

  return Buffer.isBuffer(value) || isStream(value);
};

/**
 * Recursively convert a value to form data. Usually used as a reducer.
 *
 * @param {FormData} form - The form to append data to
 * @param {Array[String, *]} entry - The key and value for each entry to convert
 * @return {FormData} The final form object.
 */
const asFormData = (form: FormData, [key, value]: FormDataEntry): FormData => {
  if (Buffer.isBuffer(value) || isStream(value)) {
    form.append(key, value);
    return form;
  }

  if (Array.isArray(value)) {
    Object.entries(value)
      .map((entry): FormDataEntry => [`${key}[]`, entry[1]])
      .reduce(asFormData, form);

    return form;
  }

  if (isObject(value)) {
    Object.entries(value)
      .map((entry): FormDataEntry => [`${key}[${entry[0]}]`, entry[1]])
      .reduce(asFormData, form);
    return form;
  }

  if (!isNull(value) && !isUndefined(value)) {
    form.append(key, value as FormDataValue);
  }

  return form;
};

/**
 * Transform an axios request to multipart/form-data or JSON based on the
 * request body.
 *
 * @param {Object} data - Object to transform
 * @param {Object} headers - The headers for the request
 * @return {FormData|String} The serialized response body
 */
const serializeRequest = (
  data: Record<string, unknown>,
  headers: Record<string, string>
): FormData | string => {
  const isBinaryData: boolean = containsBinaryData(data);

  if (!isBinaryData) {
    headers["Content-Type"] = "application/json;charset=utf-8";
    return JSON.stringify(data);
  }

  const form: FormData = Object.entries(data).reduce(
    asFormData,
    new FormData()
  );

  Object.assign(headers, form.getHeaders());

  return form;
};

export { asFormData, containsBinaryData, serializeRequest };

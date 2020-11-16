export default function responseTemplate(result, errorResponse) {
  return {
    success: !errorResponse,
    result,
    errorResponse,
  };
}

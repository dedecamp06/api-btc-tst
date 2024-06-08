export const successResponse = (Param?: any) => {
  return {
    status: 200,
    message: "Server completed the request as expected!",
    object: Param,
  };
};

export const badRequestResponse = (Error: any) => {
  return {
    status: 400,
    message: Error,
  };
};

export const createdResponse = (Created?: any) => {
  return {
    status: 201,
    message: `Server created in request!`,
    Created,
  };
};

export const acceptedResponse = () => {
  return {
    status: 202,
    message: "The request was received, but it has no authorization!",
  };
};

export const noCotentResponse = () => {
  return {
    status: 204,
    message: "Request received but no body!",
  };
};

export const errorResponse = (Error?: any) => {
  return {
    status: 500,
    message: "Server Error!",
    Error,
  };
};

export const forbiddenResponse = (Error: any) => {
  return {
    status: 403,
    message: Error,
  };
};

export const unauthorizedResponse = {
  status: 401,
  message: "Authentication credentials not valid.",
};

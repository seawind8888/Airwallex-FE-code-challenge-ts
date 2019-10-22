
/**
 * Set request headers
 * @return object
 */
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
};

export const submitInvitation = async <T>(
  params: any
): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    const response:any = await fetch(
      'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(params)
      }
    );
    resolve(response)
  })

};

export default function (axiosErr) {
  if (typeof axiosErr == 'string') return axiosErr
  return axiosErr.response.data.errors ? axiosErr.response.data.errors.reduce((a, d) => (`${a} ${d.message}`), '') : axiosErr.response.data
}

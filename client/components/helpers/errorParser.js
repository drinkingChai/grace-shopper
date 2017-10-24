export default function (axiosErr) {
  return axiosErr.response.data.errors ? axiosErr.response.data.errors.reduce((a, d) => (`${a} ${d.message}`), '') : axiosErr.response.data
}
